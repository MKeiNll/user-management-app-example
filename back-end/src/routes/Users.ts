import { UserDao } from "@daos";
import {
  emailTakenError,
  emailValidationError,
  JwtService,
  logger,
  paramMissingError,
  passwordValidationError,
  pwdSaltRounds,
  unauthorizedError,
} from "@shared";
import bcrypt from "bcrypt";
import validator from "email-validator";
import { Request, Response, Router } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import {
  BAD_REQUEST,
  CONFLICT,
  CREATED,
  OK,
  UNAUTHORIZED,
} from "http-status-codes";

const router = Router();
const userDao = new UserDao();
const jwtService = new JwtService();

const isJwtOk = async (req: Request) => {
  const jwt = req.signedCookies.JwtCookieKey;
  if (jwt) {
    const clientData = await jwtService.decodeJwt(jwt);
    if (clientData.email) {
      return true;
    }
  }
  return false;
};

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
    if (!(await isJwtOk(req))) {
      return res.status(UNAUTHORIZED).json({
        error: unauthorizedError,
      });
    }

    const users = await userDao.getAll();
    return res.status(OK).json({ users });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                      Get user login times - "GET /api/users/logins/:id"
 ******************************************************************************/

router.get("/logins/:id", async (req: Request, res: Response) => {
  try {
    if (!(await isJwtOk(req))) {
      return res.status(UNAUTHORIZED).json({
        error: unauthorizedError,
      });
    }

    const { id } = req.params as ParamsDictionary;
    const loginTimes = await userDao.getLoginTimes(Number(id));
    return res.status(OK).json(loginTimes);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

const createUser = async (req: Request, res: Response) => {
  // Check req body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  } else if (await userDao.getOne(email)) {
    return res.status(CONFLICT).json({
      error: emailTakenError,
    });
  } else if (!validator.validate(String(email).toLowerCase())) {
    return res.status(BAD_REQUEST).json({
      error: emailValidationError,
    });
  } else if (password.length < +process.env.MIN_PWD_LENGTH!) {
    return res.status(BAD_REQUEST).json({
      error: passwordValidationError,
    });
  }
  // Save user
  const user = {
    active: false,
    email,
    logins: [],
    pwdHash: await bcrypt.hash(password, pwdSaltRounds),
  };
  await userDao.add(user);
  return res.status(CREATED).end();
};

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  try {
    if (!(await isJwtOk(req))) {
      return res.status(UNAUTHORIZED).json({
        error: unauthorizedError,
      });
    }
    return createUser(req, res);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                       Register - "POST /api/users/register"
 ******************************************************************************/

router.post("/register", async (req: Request, res: Response) => {
  try {
    return createUser(req, res);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                    Delete - "DELETE /api/users/delete/:id"
 ******************************************************************************/

router.delete("/delete/:id", async (req: Request, res: Response) => {
  try {
    if (!(await isJwtOk(req))) {
      return res.status(UNAUTHORIZED).json({
        error: unauthorizedError,
      });
    }

    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message,
    });
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;

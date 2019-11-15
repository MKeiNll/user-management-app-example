import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import {
  BAD_REQUEST,
  CREATED,
  OK,
  CONFLICT,
  UNAUTHORIZED
} from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";
import { UserDao } from "@daos";
import {
  paramMissingError,
  logger,
  pwdSaltRounds,
  emailValidationError,
  passwordValidationError,
  emailTakenError,
  unauthorizedError,
  JwtService
} from "@shared";

const router = Router();
const userDao = new UserDao();
const jwtService = new JwtService();

const isJwtOk = async (req: Request) => {
  let jwt = req.signedCookies["JwtCookieKey"];
  if (jwt) {
    let clientData = await jwtService.decodeJwt(jwt);
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
        error: unauthorizedError
      });
    }

    const users = await userDao.getAll();
    return res.status(OK).json({ users });
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
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
        error: unauthorizedError
      });
    }

    const { id } = req.params as ParamsDictionary;
    const loginTimes = await userDao.getLoginTimes(Number(id));
    return res.status(OK).json(loginTimes);
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                       Add One - "POST /api/users/add"
 ******************************************************************************/

router.post("/add", async (req: Request, res: Response) => {
  try {
    if (!(await isJwtOk(req))) {
      return res.status(UNAUTHORIZED).json({
        error: unauthorizedError
      });
    }

    // Check req body
    const { email, password } = req.body;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email || !password) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    } else if (await userDao.getOne(email)) {
      return res.status(CONFLICT).json({
        error: emailTakenError
      });
    } else if (!emailRegex.test(String(email).toLowerCase())) {
      return res.status(BAD_REQUEST).json({
        error: emailValidationError
      });
    } else if (password.length < 8) {
      return res.status(BAD_REQUEST).json({
        error: passwordValidationError
      });
    }
    // Save user
    let user = {
      email: email,
      pwdHash: await bcrypt.hash(password, pwdSaltRounds),
      logins: [],
      active: false
    };
    await userDao.add(user);
    return res.status(CREATED).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
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
        error: unauthorizedError
      });
    }

    const { id } = req.params as ParamsDictionary;
    await userDao.delete(Number(id));
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                                     Export
 ******************************************************************************/

export default router;

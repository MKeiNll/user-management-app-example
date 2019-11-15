import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import { BAD_REQUEST, CREATED, OK, CONFLICT } from "http-status-codes";
import { ParamsDictionary } from "express-serve-static-core";
import { UserDao } from "@daos";
import {
  paramMissingError,
  logger,
  pwdSaltRounds,
  emailValidationError,
  passwordValidationError,
  emailTakenError
} from "@shared";

const router = Router();
const userDao = new UserDao();

/******************************************************************************
 *                      Get All Users - "GET /api/users/all"
 ******************************************************************************/

router.get("/all", async (req: Request, res: Response) => {
  try {
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

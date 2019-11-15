import bcrypt from "bcrypt";
import { Request, Response, Router } from "express";
import {
  BAD_REQUEST,
  OK,
  UNAUTHORIZED,
  CONFLICT,
  FORBIDDEN
} from "http-status-codes";
import { UserDao } from "@daos";

import {
  paramMissingError,
  logger,
  jwtCookieProps,
  JwtService,
  loginWrongEmailError,
  loginWrongPasswordError,
  emailTakenError,
  recoverPasswordWrongEmailError,
  loginEmailNotVerifiedError
} from "@shared";

const router = Router();
const userDao = new UserDao();
const jwtService = new JwtService();

/******************************************************************************
 *                      Login User - "POST /api/auth/login"
 ******************************************************************************/

router.post("/login", async (req: Request, res: Response) => {
  try {
    // Check email and password present
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }
    // Fetch user
    const user = await userDao.getOne(email);
    if (!user) {
      return res.status(UNAUTHORIZED).json({
        error: loginWrongEmailError
      });
    }
    // Check email is verified
    if (!user.active) {
      return res.status(UNAUTHORIZED).json({
        error: loginEmailNotVerifiedError
      });
    }
    // Check password
    const pwdPassed = await bcrypt.compare(password, user.pwdHash);
    if (!pwdPassed) {
      return res.status(UNAUTHORIZED).json({
        error: loginWrongPasswordError
      });
    }
    // Setup Admin Cookie
    const jwt = await jwtService.getJwt({
      role: user.role
    });
    const { key, options } = jwtCookieProps;
    res.cookie(key, jwt, options);
    // Set login time
    userDao.addLoginTime(email, new Date());
    // Return
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                      Recover password - "POST /api/auth/recover"
 ******************************************************************************/

router.post("/recover", async (req: Request, res: Response) => {
  try {
    // Check email present
    const { email } = req.body;
    if (!email) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    } else if (!(await userDao.getOne(email))) {
      return res.status(CONFLICT).json({
        error: recoverPasswordWrongEmailError
      });
    }

    // TODO

    // Return
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                      Validate email - "POST /api/auth/validate"
 ******************************************************************************/

router.post("/validate", async (req: Request, res: Response) => {
  try {
    // Check hash present
    const { hash } = req.body;
    if (!hash) {
      return res.status(BAD_REQUEST).json({
        error: paramMissingError
      });
    }

    if (await userDao.validateEmail(hash)) {
      return res.status(OK).end();
    }
    return res.status(FORBIDDEN).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                      Logout - "GET /api/auth/logout"
 ******************************************************************************/

router.get("/logout", async (req: Request, res: Response) => {
  try {
    const { key, options } = jwtCookieProps;
    res.clearCookie(key);
    return res.status(OK).end();
  } catch (err) {
    logger.error(err.message, err);
    return res.status(BAD_REQUEST).json({
      error: err.message
    });
  }
});

/******************************************************************************
 *                                 Export Router
 ******************************************************************************/

export default router;

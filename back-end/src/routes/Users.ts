import { UserDao } from "@daos";
import {
  emailTakenError,
  emailValidationError,
  JwtService,
  logger,
  paramMissingError,
  passwordValidationError,
  pwdSaltRounds,
  unauthorizedError
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
  INTERNAL_SERVER_ERROR
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

/**
 *
 * GET /api/users/all : Returns an all users.
 * 
 * @cookie JwtTokenKey  JWT with an email payload
 * 
 *
 * on success                 @return HTTP 200 & body of format:
 *   {
 *     "users": [
 *       {
 *         "email": "sample@mail.org",
 *         "pwdHash": "$2b$12$6/o0boiFnSBji/y1lv4uZOYs1KVTOXXhtDM5EjafkGmkavEDz633.",
 *        "logins": [
 *          "2019-11-14T19:37:18.128Z"
 *        ],
 *         "active": true
 *       }
 *     ]
 *   }
 * 
 * on missing/invalid cookie  @return HTTP 401 & body of format:
 *   {
 *     "error": "message"
 *   }
 *         
 * on server failure          @return HTTP 500 & body of format:
 *   {
 *     "error": "message"
 *   }
 *
 */
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

    return res.status(INTERNAL_SERVER_ERROR).json({
      error: err.message
    });
  }
});

/**
 *
 * GET /api/users/logins/:id : Returns all login times for a user with given id.
 * 
 * @cookie      JwtTokenKey   JWT with an email payload
 * @routeParam  id            User id
 * 
 *
 * on success                 @return HTTP 200 & body of format:
 *   {
 *     "logins": [
 *       "2019-11-14T19:37:18.128Z"
 *     ]
 *   }
 * 
 * on missing/invalid cookie  @return HTTP 401 & body of format:
 *   {
 *     "error": "message"
 *   }
 *         
 * on server failure          @return HTTP 500 & body of format:
 *   {
 *     "error": "message"
 *   }
 *
 */
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

    return res.status(INTERNAL_SERVER_ERROR).json({
      error: err.message
    });
  }
});

// Common method used in /add & /register routes
const createUser = async (req: Request, res: Response) => {
  // Check req body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError
    });
  } else if (await userDao.getOne(email)) {
    return res.status(CONFLICT).json({
      error: emailTakenError
    });
  } else if (!validator.validate(String(email).toLowerCase())) {
    return res.status(BAD_REQUEST).json({
      error: emailValidationError
    });
  } else if (password.length < +process.env.MIN_PWD_LENGTH!) {
    return res.status(BAD_REQUEST).json({
      error: passwordValidationError
    });
  }
  // Save user
  const user = {
    active: false,
    email,
    logins: [],
    pwdHash: await bcrypt.hash(password, pwdSaltRounds)
  };
  await userDao.add(user);

  return res.status(CREATED).end();
};

/**
 *
 * POST /api/users/add : Creates a new user. Also generates a unique hash
 *                         which is need to verify user's email.
 * 
 * @cookie      JwtTokenKey   JWT with an email payload
 * @body        of format: { email: string, password: string }
 *              where: 
 *                email should be a valid email
 *                password should be at least 8 digits long
 * 
 *
 * on success                     @return HTTP 201
 * 
 * on missing/invalid cookie      @return HTTP 401 & body of format:
 *   {
 *     "error": "message"
 *   }
 * 
 * on missing email or password   @return HTTP 400 & body of format:
 * on email being not valid
 * on password being shorter 
 *  than 8 digits
 *   {
 *     "error": "message"
 *   }
 * 
 * on email already being taken   @return HTTP 409 & body of format:
 *   {
 *     "error": "message"
 *   }
 *         
 * on server failure              @return HTTP 500 & body of format:
 *   {
 *     "error": "message"
 *   }
 *
 */
router.post("/add", async (req: Request, res: Response) => {
  try {
    if (!(await isJwtOk(req))) {
      return res.status(UNAUTHORIZED).json({
        error: unauthorizedError
      });
    }

    return createUser(req, res);
  } catch (err) {
    logger.error(err.message, err);

    return res.status(INTERNAL_SERVER_ERROR).json({
      error: err.message
    });
  }
});

/**
 *
 * POST /api/users/register : Creates a new user. 
 *                            Identical to /api/users/add except it 
 *                              doesn't require a @cookie
 * 
 * @body        of format: { email: string, password: string }
 *              where: 
 *                email should be a valid email
 *                password should be at least 8 digits long
 * 
 *
 * on success                     @return HTTP 201
 * 
 * on missing cookie              @return HTTP 401 & body of format:
 *   {
 *     "error": "message"
 *   }
 * 
 * on missing email or password   @return HTTP 400 & body of format:
 * on email being not valid
 * on password being shorter 
 *  than 8 digits
 *   {
 *     "error": "message"
 *   }
 * 
 * on email already being taken   @return HTTP 409 & body of format:
 *   {
 *     "error": "message"
 *   }
 *         
 * on server failure              @return HTTP 500 & body of format:
 *   {
 *     "error": "message"
 *   }
 *
 */
router.post("/register", async (req: Request, res: Response) => {
  try {
    return createUser(req, res);
  } catch (err) {
    logger.error(err.message, err);

    return res.status(INTERNAL_SERVER_ERROR).json({
      error: err.message
    });
  }
});

/**
 *
 * DELETE /api/users/delete/:id : Deletes a user.
 *                            
 * 
 * @routeParam  id            User id
 * @cookie      JwtTokenKey   JWT with an email payload
 * 
 * 
 * on success                     @return HTTP 200
 * 
 * on missing/invalid cookie      @return HTTP 401 & body of format:
 *   {
 *     "error": "message"
 *   }
 *         
 * on server failure              @return HTTP 500 & body of format:
 *   {
 *     "error": "message"
 *   }
 *
 */
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

    return res.status(INTERNAL_SERVER_ERROR).json({
      error: err.message
    });
  }
});

export default router;
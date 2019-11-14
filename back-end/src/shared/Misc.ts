import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { logger } from './Logger';
import { jwtCookieProps } from './cookies';
import { JwtService } from './JwtService';



// Init shared
const jwtService = new JwtService();

// Errors
export const paramMissingError = '"One or more of the required parameters was missing."';
export const loginFailedError = 'Login failed';
export const emailTakenError = 'Email taken';
export const emailValidationError = {
    message: "Email is not valid",
    code: "9001"
}
export const passwordValidationError = {
  message: "Password is not valid",
  code: "9002"
};

// Numbers
export const pwdSaltRounds = 12;



/* Functions */

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};

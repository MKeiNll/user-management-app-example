import { Request, Response, NextFunction } from 'express';
import { UNAUTHORIZED } from 'http-status-codes';
import { logger } from './Logger';
import { jwtCookieProps } from './cookies';
import { JwtService } from './JwtService';



// Init shared
const jwtService = new JwtService();

// Strings
export const paramMissingError = 'One or more of the required parameters was missing.';
export const loginFailedErr = 'Login failed';

// Numbers
export const pwdSaltRounds = 12;



/* Functions */

export const pErr = (err: Error) => {
    if (err) {
        logger.error(err);
    }
};


export const getRandomInt = () => {
    return Math.floor(Math.random() * 1_000_000_000_000);
};

import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "http-status-codes";
import { logger } from "./Logger";
import { jwtCookieProps } from "./cookies";
import { JwtService } from "./JwtService";

// Errors
export const paramMissingError =
  '"One or more of the required parameters was missing."';
export const loginWrongEmailError = {
  message: "Wrong email",
  code: "9003"
};
export const loginWrongPasswordError = {
  message: "Wrong password",
  code: "9004"
};
export const loginEmailNotVerifiedError = {
  message: "Email not verified",
  code: "9005"
};
export const recoverPasswordWrongEmailError = "Wrong email";
export const emailTakenError = "Email taken";
export const userNotFoundError = "Email taken";
export const emailValidationError = {
  message: "Email is not valid",
  code: "9001"
};
export const passwordValidationError = {
  message: "Password is not valid",
  code: "9002"
};
export const unauthorizedError = "Unauthorized request"

// Numbers
export const pwdSaltRounds = 12;

/* Functions */

export const pErr = (err: Error) => {
  if (err) {
    logger.error(err);
  }
};

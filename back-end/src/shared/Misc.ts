import { logger } from "./Logger";

// Errors
export const paramMissingError =
  "One or more of the required parameters was missing.";
export const loginWrongEmailError = {
  code: "9003",
  message: "Wrong email",
};
export const loginWrongPasswordError = {
  code: "9004",
  message: "Wrong password",
};
export const loginEmailNotVerifiedError = {
  code: "9005",
  message: "Email not verified",
};
export const recoverPasswordWrongEmailError = "Wrong email";
export const emailTakenError = "Email taken";
export const userNotFoundError = "User not found";
export const emailValidationError = {
  code: "9001",
  message: "Email is not valid",
};
export const passwordValidationError = {
  code: "9002",
  message: "Password is not valid",
};
export const unauthorizedError = "Unauthorized request";

// Numbers
export const pwdSaltRounds = +process.env.PWD_SALT_ROUNDS!;

// Functions
export const pErr = (err: Error) => {
  if (err) {
    logger.error(err);
  }
};

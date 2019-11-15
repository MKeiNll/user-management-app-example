import app from "@server";
import bcrypt from "bcrypt";
import supertest from "supertest";

import { UserDao } from "@daos";
import {
  jwtCookieProps,
  loginWrongEmailError,
  loginWrongPasswordError,
  pErr,
  pwdSaltRounds,
} from "@shared";
import { INTERNAL_SERVER_ERROR, OK, UNAUTHORIZED } from "http-status-codes";
import { SuperTest, Test } from "supertest";

describe("AuthRouter", () => {
  const authPath = "/api/auth";
  const loginPath = `${authPath}/login`;
  const logoutPath = `${authPath}/logout`;

  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  describe(`"POST:${loginPath}"`, () => {
    const callApi = (reqBody: object) => {
      return agent
        .post(loginPath)
        .type("form")
        .send(reqBody);
    };

    it(`should return a response with a status of ${OK} and a cookie with a jwt if the login
            was successful.`, (done) => {
      // Setup Dummy Data
      const user = {
        active: true,
        email: "jsmith@gmail.com",
        logins: [],
        pwdHash: hashPwd("Password@1"),
      };

      spyOn(UserDao.prototype, "getOne").and.returnValue(Promise.resolve(user));
      // Call API
      callApi({
        email: "jsmith@gmail.com",
        password: "Password@1",
      }).end((err: Error, res: any) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.headers["set-cookie"][0]).toContain(jwtCookieProps.key);
        done();
      });
    });

    it(`should return a response with a status of ${UNAUTHORIZED} and a json with the error
            "${loginWrongEmailError}" if the email was not found.`, (done) => {
      spyOn(UserDao.prototype, "getOne").and.returnValue(Promise.resolve(null));
      // Call API
      callApi({
        email: "jsmith@gmail.com",
        password: "Password@1",
      }).end((err: Error, res: any) => {
        pErr(err);
        expect(res.status).toBe(UNAUTHORIZED);
        expect(res.body.error).toEqual(loginWrongEmailError);
        done();
      });
    });

    it(`should return a response with a status of ${UNAUTHORIZED} and a json with the error
            "${loginWrongPasswordError}" if the password failed.`, (done) => {
      // Setup Dummy Data
      const user = {
        active: true,
        email: "jsmith@gmail.com",
        logins: [],
        pwdHash: hashPwd("Password@1"),
      };

      spyOn(UserDao.prototype, "getOne").and.returnValue(Promise.resolve(user));
      // Call API
      callApi({
        email: "jsmith@gmail.com",
        password: "wrong",
      }).end((err: Error, res: any) => {
        pErr(err);
        expect(res.status).toBe(UNAUTHORIZED);
        expect(res.body.error).toEqual(loginWrongPasswordError);
        done();
      });
    });

    it(`should return a response with a status of ${INTERNAL_SERVER_ERROR} and a json with an error
            for all other bad responses.`, (done) => {
      // Setup Dummy Data
      const creds = {
        email: "jsmith@gmail.com",
        password: "someBadPassword",
      };
      spyOn(UserDao.prototype, "getOne").and.throwError(
        "Database query failed.",
      );
      // Call API
      callApi(creds).end((err: Error, res: any) => {
        pErr(err);
        expect(res.status).toBe(INTERNAL_SERVER_ERROR);
        expect(res.body.error).toBeTruthy();
        done();
      });
    });
  });

  describe(`"GET:${logoutPath}"`, () => {
    it(`should return a response with a status of ${OK}.`, (done) => {
      agent.get(logoutPath).end((err: Error, res: any) => {
        pErr(err);
        expect(res.status).toBe(OK);
        done();
      });
    });
  });

  function hashPwd(pwd: string) {
    return bcrypt.hashSync(pwd, pwdSaltRounds);
  }
});

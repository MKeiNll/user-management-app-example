import app from "@server";
import supertest from "supertest";

import { UserDao } from "@daos";
import { paramMissingError, pErr } from "@shared";
import { BAD_REQUEST, CONFLICT, CREATED, OK } from "http-status-codes";
import { Response, SuperTest, Test } from "supertest";
import { login } from "./support/LoginAgent";

describe("UserRouter", () => {
  const usersPath = "/api/users";
  const getUsersPath = `${usersPath}/all`;
  const addUsersPath = `${usersPath}/add`;
  const updateUserPath = `${usersPath}/update`;
  const deleteUserPath = `${usersPath}/delete/:id`;

  let agent: SuperTest<Test>;
  let jwtCookie: string;

  beforeAll((done) => {
    agent = supertest.agent(app);
    login(agent, (cookie: string) => {
      jwtCookie = cookie;
      done();
    });
  });

  describe(`"GET:${getUsersPath}"`, () => {
    const callApi = () => {
      return agent.get(getUsersPath).set("Cookie", jwtCookie);
    };

    it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, (done) => {
      // Setup Dummy Data
      const users = [
        {
          active: true,
          email: "sean.maxwell@gmail.com'",
          logins: [],
        },
        {
          active: true,
          email: "john.smith@gmail.com",
          logins: [],
        },
        {
          active: true,
          email: "gordan.freeman@gmail.com",
          logins: [],
        },
      ];
      spyOn(UserDao.prototype, "getAll").and.returnValue(
        Promise.resolve(users),
      );
      // Call API
      callApi().end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.users).toEqual(users);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
      // Setup Dummy Data
      const errMsg = "Could not fetch users.";
      spyOn(UserDao.prototype, "getAll").and.throwError(errMsg);
      // Call API
      callApi().end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(errMsg);
        done();
      });
    });
  });

  describe(`"POST:${addUsersPath}"`, () => {
    const callApi = (reqBody: object) => {
      return agent
        .post(addUsersPath)
        .set("Cookie", jwtCookie)
        .type("form")
        .send(reqBody);
    };

    const userData = {
      email: "sean.maxwell@gmail.com",
      password: "12345678",
    };

    it(`should return a JSON object with an error message of "${paramMissingError}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
      callApi({}).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(paramMissingError);
        done();
      });
    });

    it(`should return a JSON object with an error message and a status code of "${CONFLICT}"
            if the request was unsuccessful.`, (done) => {
      // Setup Dummy Response
      const errMsg = "Email taken";
      spyOn(UserDao.prototype, "add").and.throwError(errMsg);
      // Call API
      callApi(userData).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(CONFLICT);
        expect(res.body.error).toBe(errMsg);
        done();
      });
    });
  });

  describe(`"DELETE:${deleteUserPath}"`, () => {
    const callApi = (id: number) => {
      const path = deleteUserPath.replace(":id", id.toString());

      return agent.delete(path).set("Cookie", jwtCookie);
    };

    it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
      spyOn(UserDao.prototype, "delete").and.returnValue(Promise.resolve());
      callApi(5).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(OK);
        expect(res.body.error).toBeUndefined();
        done();
      });
    });

    it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
      // Setup Dummy Response
      const deleteErrMsg = "Could not delete user.";
      spyOn(UserDao.prototype, "delete").and.throwError(deleteErrMsg);
      // Call API
      callApi(1).end((err: Error, res: Response) => {
        pErr(err);
        expect(res.status).toBe(BAD_REQUEST);
        expect(res.body.error).toBe(deleteErrMsg);
        done();
      });
    });
  });
});

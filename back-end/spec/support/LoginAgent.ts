import { UserDao } from "@daos";
import { pwdSaltRounds } from "@shared";
import bcrypt from "bcrypt";
import { SuperTest, Test } from "supertest";

const creds = {
  email: "jsmith@gmail.com",
  password: "Password@1",
};

export const login = (beforeAgent: SuperTest<Test>, done: any) => {
  // Setup dummy data
  const loginUser = {
    email: "jsmith@gmail.com",
    pwdHash: bcrypt.hashSync(creds.password, pwdSaltRounds),
    logins: [],
    active: true,
  };
  spyOn(UserDao.prototype, "getOne").and.returnValue(
    Promise.resolve(loginUser),
  );
  // Call Login API
  beforeAgent
    .post("/api/auth/login")
    .type("form")
    .send(creds)
    .end((err: Error, res: any) => {
      if (err) {
        throw err;
      }
      done(res.headers["set-cookie"]);
    });
};

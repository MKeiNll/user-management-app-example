import { IUser } from "@entities";
import { pwdSaltRounds } from "@shared";
import bcrypt from "bcrypt";
import jsonfile, { Path } from "jsonfile";
import { IVerificationHash } from "src/entities/IVerificationHash";
import {
  sendDeletedEmail,
  sendNewPasswordEmail,
  sendNewUserEmail,
} from "src/shared/EmailService";

const crypto = require("crypto");

interface IUserDao {
  getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
  addLoginTime: (email: string, time: Date) => Promise<void>;
  getLoginTimes: (id: number) => Promise<Date[]>;
  validateEmail: (hash: string) => Promise<void>;
  createNewPassword: (email: string) => Promise<string | null>;
}

const uuidv1 = require("uuid/v1");

class UserDb {
  private readonly dbFilePath = process.env.DB_FILE_PATH;

  protected openDb(): Promise<any> {
    return jsonfile.readFile(this.dbFilePath as Path);
  }

  protected saveDb(db: any): Promise<any> {
    return jsonfile.writeFile(this.dbFilePath as Path, db);
  }
}

export class UserDao extends UserDb implements IUserDao {
  public async getOne(email: string): Promise<IUser | null> {
    try {
      const db = await super.openDb();
      for (const user of db.users) {
        if (user.email === email) {
          return user;
        }
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  public async getAll(): Promise<IUser[]> {
    try {
      const db = await super.openDb();
      const users = db.users.slice();
      for (let i = 0, len = users.length; i < len; i++) {
        delete users[i].pwdHash;
      }
      return users;
    } catch (err) {
      throw err;
    }
  }

  public async add(user: IUser): Promise<void> {
    try {
      const db = await super.openDb();
      db.users.push(user);

      const hash = uuidv1();
      const verificationHash: IVerificationHash = {
        email: user.email,
        hash,
      };
      db.verificationHashes.push(verificationHash);

      await super.saveDb(db);
      sendNewUserEmail(user.email, hash);
    } catch (err) {
      throw err;
    }
  }

  public async addLoginTime(email: string, time: Date): Promise<void> {
    try {
      const db = await super.openDb();
      for (const user of db.users) {
        if (user.email === email) {
          user.logins.push(time);
        }
      }
      await super.saveDb(db);
    } catch (err) {
      throw err;
    }
  }

  public async getLoginTimes(id: number): Promise<Date[]> {
    try {
      const db = await super.openDb();
      if (id >= db.users.length) { throw new Error("User not found"); }
      return db.users[id].logins;
    } catch (err) {
      throw err;
    }
  }

  public async validateEmail(hash: string): Promise<void> {
    try {
      const db = await super.openDb();
      const verificationHash = db.verificationHashes.filter((obj: any) => {
        return obj.hash === hash;
      });

      if (verificationHash) {
        for (const user of db.users) {
          if (user.email === verificationHash[0].email) {
            user.active = true;
            db.verificationHashes.splice(
              db.verificationHashes.indexOf(verificationHash),
              1,
            );
            await super.saveDb(db);
          }
        }
      }
    } catch (err) {
      throw err;
    }
  }

  public async createNewPassword(email: string): Promise<string | null> {
    try {
      const db = await super.openDb();
      for (const user of db.users) {
        if (user.email === email) {
          const newPassword = crypto.randomBytes(6).toString("hex");
          user.pwdHash = await bcrypt.hash(newPassword, pwdSaltRounds);
          await super.saveDb(db);
          sendNewPasswordEmail(email, newPassword);
          return newPassword;
        }
      }
      return null;
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const db = await super.openDb();
      if (id >= db.users.length) { throw new Error("User not found"); }
      const userEmail = db.users[id].email;
      // Delete verification hashes if they exist
      for (let i = db.verificationHashes.length - 1; i >= 0; i--) {
        if (db.verificationHashes[i].email === userEmail) {
          db.verificationHashes.splice(i, 1);
        }
      }
      // Delete user
      db.users.splice(id, 1);
      await super.saveDb(db);
      sendDeletedEmail(userEmail);
      return;
    } catch (err) {
      throw err;
    }
  }
}

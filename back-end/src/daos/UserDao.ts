import { IUser } from "@entities";
import jsonfile from "jsonfile";
import { IVerificationHash } from "src/entities/IVerificationHash";
import { sendNewUserEmail } from "src/shared/EmailService";

interface IUserDao {
  getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
  addLoginTime: (email: string, time: Date) => Promise<void>;
  getLoginTimes: (id: number) => Promise<Date[]>;
  validateEmail: (hash: string) => Promise<boolean>;
}

const uuidv1 = require("uuid/v1");

class UserDb {
  private readonly dbFilePath = "src/daos/UserDb.json";

  protected openDb(): Promise<any> {
    return jsonfile.readFile(this.dbFilePath);
  }

  protected saveDb(db: any): Promise<any> {
    return jsonfile.writeFile(this.dbFilePath, db);
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
      let users = db.users.slice();
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

      let hash = uuidv1();
      const verificationHash: IVerificationHash = {
        email: user.email,
        hash: hash
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
      if (id >= db.users.length) throw new Error("User not found");
      return db.users[id].logins;
    } catch (err) {
      throw err;
    }
  }

  public async validateEmail(hash: string): Promise<boolean> {
    try {
      const db = await super.openDb();
      let verificationHash = db.verificationHashes.filter((obj: any) => {
        return obj.hash === hash;
      });

      if (verificationHash) {
        for (const user of db.users) {
          if (user.email === verificationHash[0].email) {
            user.active = true;
            db.verificationHashes.splice(
              db.verificationHashes.indexOf(verificationHash),
              1
            );
            await super.saveDb(db);
            return true;
          }
        }
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const db = await super.openDb();
      if (id >= db.users.length) throw new Error("User not found");
      let userEmail = db.users[id].email;

      // Delete verification hashes if they exist
      for (var i = db.verificationHashes.length - 1; i >= 0; i--) {
        if (db.verificationHashes[i].email === userEmail) {
          db.verificationHashes.splice(i, 1);
        }
      }

      // Delete user
      db.users.splice(id, 1);

      await super.saveDb(db);
      return;
    } catch (err) {
      throw err;
    }
  }
}

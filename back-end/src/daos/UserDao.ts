import { IUser } from "@entities";
import jsonfile from "jsonfile";

interface IUserDao {
  getOne: (email: string) => Promise<IUser | null>;
  getAll: () => Promise<IUser[]>;
  add: (user: IUser) => Promise<void>;
  delete: (id: number) => Promise<void>;
}

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
      await super.saveDb(db);
    } catch (err) {
      throw err;
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const db = await super.openDb();
      if (id >= db.users.length) throw new Error("User not found");
      db.users.splice(id, 1);
      await super.saveDb(db);
      return;
    } catch (err) {
      throw err;
    }
  }
}

import jsonfile, { Path } from "jsonfile";

export class UserDb {
  private readonly dbFilePath = process.env.DB_FILE_PATH;

  protected openDb(): Promise<any> {
    return jsonfile.readFile(this.dbFilePath as Path);
  }

  protected saveDb(db: any): Promise<any> {
    return jsonfile.writeFile(this.dbFilePath as Path, db);
  }
}

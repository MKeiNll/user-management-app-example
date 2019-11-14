export interface IUser {
    id?: number;
    name: string;
    email: string;
    pwdHash: string;
}


export class User implements IUser {

    public id?: number;
    public name: string;
    public email: string;
    public pwdHash: string;


    constructor(
        nameOrUser?: string | IUser,
        email?: string,
        pwdHash?: string,
    ) {
        if (typeof nameOrUser === 'string' || typeof nameOrUser === 'undefined') {
            this.name = nameOrUser || '';
            this.email = email || '';
            this.pwdHash = pwdHash || '';
        } else {
            this.name = nameOrUser.name;
            this.email = nameOrUser.email;
            this.pwdHash = nameOrUser.pwdHash;
        }
    }
}

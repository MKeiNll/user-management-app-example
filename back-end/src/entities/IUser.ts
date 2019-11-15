export interface IUser {
    email: string;
    pwdHash: string;
    logins: Date[];
    active: boolean;
}
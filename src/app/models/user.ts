export class User {
    token: string;
    tokenExp: number;
    userRoles: Array<string>;
    userId: string;
    currentTwoFactorToken: string;
}
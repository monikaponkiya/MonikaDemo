import { UserParams } from '../interface/user';


export class User {
    public id!: number;
    public email!: string;
    public name!: string;
    public password!: string;
    public type!: string;
    public gender!: string;
    public birthday!: Date;
    public profilePhoto!: string;

    constructor(params: UserParams  = {}) {
        Object.assign(this, params);
      }
}
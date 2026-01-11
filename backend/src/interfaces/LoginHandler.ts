import { IUser } from '../models/User';

export interface LoginHandler {
    login(user: IUser, password: string): Promise<{ token: string; user: any }>;
}
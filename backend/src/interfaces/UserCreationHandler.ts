import { IUser } from '../models/User';

export interface UserCreationHandler {
    create(data: { name: string; email: string; password: string }): Promise<IUser>;
}
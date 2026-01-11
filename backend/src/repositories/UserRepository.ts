import User, { IUser } from '../models/User';

export class UserRepository {
    static async create(data: { name: string; email: string; password: string }): Promise<IUser> {
        const user = new User(data);
        return await user.save();
    }
}
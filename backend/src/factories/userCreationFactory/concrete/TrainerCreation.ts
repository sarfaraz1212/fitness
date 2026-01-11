import { UserCreationHandler } from '../../../interfaces/UserCreationHandler';
import User from '../../../models/User';
import { IUser } from '../../../models/User';

export class TrainerCreation implements UserCreationHandler {
    async create(data: { name: string; email: string; password: string }): Promise<IUser> {
        const user = new User({ ...data, role: 'TRAINER' });
        return await user.save();
    }
}
import { LoginHandler } from '../../../interfaces/LoginHandler';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';
import { IUser } from '../../../models/User';

export class ClientLogin implements LoginHandler {
    async login(user: IUser, password: string): Promise<{ token: string; user: any }> {
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, env.JWT_SECRET, { expiresIn: '7d' });

        return { token, user };
    }
}
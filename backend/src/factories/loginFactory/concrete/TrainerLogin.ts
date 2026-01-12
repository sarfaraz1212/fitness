import { LoginHandler } from '../../../interfaces/LoginHandler';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';
import { IUser } from '../../../models/User';

export class TrainerLogin implements LoginHandler {

    async login(user: IUser, password: string): Promise<{ token: string; user: any }> {

        try {
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }

            const token = jwt.sign({ userId: user._id, role: user.role }, env.JWT_SECRET, { expiresIn: '1h' });


            return { token, user };
        } catch (error) {

            throw error;
        }

    }
}
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUserDocument } from '../models/User';
import { env } from '../config/env';

export interface AuthContext {
    currentUser: IUserDocument | null;
}

export const authContext = async ({ req }: { req: Request }): Promise<AuthContext> => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return { currentUser: null };
    }

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as { userId: string };
        const currentUser = await User.findById(payload.userId);
        if (!currentUser) {
            console.warn('User not found for token:', payload.userId);
            return { currentUser: null };
        }

        return { currentUser };
    } catch (err) {
        console.warn('Authentication failed:', err);
        return { currentUser: null };
    }
};

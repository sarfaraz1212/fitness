import User from '../../models/User';
import { AdminLogin } from './concrete/AdminLogin';
import { TrainerLogin } from './concrete/TrainerLogin';
import { ClientLogin } from './concrete/ClientLogin';
import { LoginHandler } from '../../interfaces/LoginHandler';

export class LoginFactory {
    static async login(email: string, password: string): Promise<{ token: string; user: any }> {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('User not found');
        }

        let handler: LoginHandler;
        switch (user.role) {
            case 'ADMIN':
                handler = new AdminLogin();
                break;
            case 'TRAINER':
                handler = new TrainerLogin();
                break;
            case 'CLIENT':
                handler = new ClientLogin();
                break;
            default:
                throw new Error('Invalid role');
        }

        return await handler.login(user, password);
    }
}
import { TrainerCreation } from './concrete/TrainerCreation';
import { ClientCreation } from './concrete/ClientCreation';
import { UserCreationHandler } from '../../interfaces/UserCreationHandler';
import { IUser } from '../../models/User';

export class UserCreationFactory {
    static createUser(data: { name: string; email: string; password: string; role: string }): Promise<IUser> {
        const { role } = data;
        if (role === 'ADMIN') {
            throw new Error('Cannot create admin user');
        }

        let handler: UserCreationHandler;
        switch (role) {
            case 'TRAINER':
                handler = new TrainerCreation();
                break;
            case 'CLIENT':
                handler = new ClientCreation();
                break;
            default:
                throw new Error('Invalid role');
        }

        return handler.create(data);
    }
}
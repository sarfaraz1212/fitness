"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreationFactory = void 0;
const TrainerCreation_1 = require("./concrete/TrainerCreation");
const ClientCreation_1 = require("./concrete/ClientCreation");
class UserCreationFactory {
    static createUser(data) {
        const { role } = data;
        if (role === 'ADMIN') {
            throw new Error('Cannot create admin user');
        }
        let handler;
        switch (role) {
            case 'TRAINER':
                handler = new TrainerCreation_1.TrainerCreation();
                break;
            case 'CLIENT':
                handler = new ClientCreation_1.ClientCreation();
                break;
            default:
                throw new Error('Invalid role');
        }
        return handler.create(data);
    }
}
exports.UserCreationFactory = UserCreationFactory;

import { IUser } from '../models/User';

export default interface ActionInterface {
   execute(payload: object): Promise<any>;
}

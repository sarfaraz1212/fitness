import CreateUserAction from '../../actions/user/CreateUserAction';
import LoginAction from '../../actions/user/LoginAction';
import User, { IUser } from '../../models/User';


export const userResolvers = {
  Query: {
    users: async (): Promise<IUser[]> => {
      return await User.find();
    },
    user: async (_: any, { id }: { id: string }): Promise<IUser | null> => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createClient: async (_: any, { input }: { input: any }): Promise<IUser> => {
        const action = new CreateUserAction();
        return await action.execute(input);
    },
    createUser: async (_: any, { input }: { input: any }): Promise<IUser> => {
        const action = new CreateUserAction();
        return await action.execute(input);
    },
    updateUser: async (_: any, { id, input }: { id: string; input: any }): Promise<IUser | null> => {
      const { name, email, role } = input;
      if (role === 'ADMIN') {
        throw new Error('Cannot set role to ADMIN');
      }
      return await User.findByIdAndUpdate(id, { name, email, role }, { new: true });
    },
    deleteUser: async (_: any, { id }: { id: string }): Promise<boolean> => {
      const result = await User.findByIdAndDelete(id);
      return !!result;
    },
    login: async (_: any, { input }: { input: any }): Promise<any> => {
      const action = new LoginAction();
      return await action.execute(input);
    },
  },
};
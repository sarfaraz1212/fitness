import User, { IUser } from '../models/User';

export class UserRepository {
    static async create(data: { name: string; email: string; password: string }): Promise<IUser> {
        const user = new User(data);
        return await user.save();
    }

    static async get(condition: any): Promise<IUser[]> {
        return await User.find(condition).populate('onboarding');
    }

    static async getPaginated(
        condition: any,
        page: number = 1,
        limit: number = 8,
        search?: string,
        status?: string
    ): Promise<{ clients: IUser[], total: number, totalPages: number, currentPage: number }> {
        const query: any = { ...condition };

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        if (status && status !== 'all') {
            query.is_onboarded = status === 'active';
        }

        const skip = (page - 1) * limit;

        const [clients, total] = await Promise.all([
            User.find(query)
                .populate('onboarding')
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 }),
            User.countDocuments(query)
        ]);

        return {
            clients,
            total,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        };
    }
}
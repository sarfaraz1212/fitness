import { DailyWeightIn } from '../models/DailyWeightIn';

export default class DailyWeightInRepository {
    static async hasWeightInForDate(userId: string, date: Date): Promise<boolean> {
        
        const record = await DailyWeightInRepository.getWeightForDate(userId, date);
        return !!record;
    }

    static async getWeightForDate(userId: string, date: Date): Promise<any> {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        return await DailyWeightIn.findOne({
            user_id: userId,
            date: { $gte: startOfDay, $lt: endOfDay }
        });
    }

    static async createWeightIn(userId: string, weight: number, unit: string, date: Date): Promise<any> {
        const record = await DailyWeightIn.create({
            user_id: userId,
            weight: weight,
            unit: unit,
            date: date,
        });
        return record;
    }

    static async upsertWeightIn(userId: string, weight: number, date: Date): Promise<void> {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        await DailyWeightIn.findOneAndUpdate(
            {
                user_id: userId,
                date: { $gte: startOfDay, $lt: endOfDay }
            },
            {
                weight: weight,
                date: startOfDay,
            },
            { upsert: true, new: true }
        );
    }

    static async updateWeightIn(userId: string, date: Date, weight: number, unit: string): Promise<any> {
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        return await DailyWeightIn.findOneAndUpdate(
            {
                user_id: userId,
                date: { $gte: startOfDay, $lt: endOfDay }
            },
            {
                weight: weight,
                unit: unit,
            },
            { new: true }
        );
    }
}
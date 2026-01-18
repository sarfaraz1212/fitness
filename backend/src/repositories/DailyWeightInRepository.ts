import { DailyWeightIn } from '../models/DailyWeightIn';

export default class DailyWeightInRepository {
    static async hasWeightInForDate(userId: string, date: Date): Promise<boolean> {
        
        const record = await DailyWeightIn.findOne({
            user_id: userId,
            date: date,
        });

        return record;
    }
}
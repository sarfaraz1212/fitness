import ActionInterface from "../../interfaces/ActionInterface";
import DailyWeightInRepository from "../../repositories/DailyWeightInRepository";

interface UpdateDailyWeightInPayload {
    userId: string;
    date: Date;
    weight: number;
    unit: string;
}

export class UpdateDailyWeightInAction implements ActionInterface {
    async execute(payload: UpdateDailyWeightInPayload): Promise<any> {
        try {
            const { userId, date, weight, unit } = payload;

            const record = await DailyWeightInRepository.updateWeightIn(userId, date, weight, unit);

            if (!record) {
                throw new Error("No weight record found for the given date");
            }

            return record;
        } catch (error) {
            console.error("UpdateDailyWeightInAction error:", error);
            throw error;
        }
    }
}
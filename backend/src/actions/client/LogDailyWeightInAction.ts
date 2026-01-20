import ActionInterface from "../../interfaces/ActionInterface";
import DailyWeightInRepository from "../../repositories/DailyWeightInRepository";
import { WeightMetric } from "../../enums/WeightMetric";

export class LogDailyWeightInAction implements ActionInterface {

    async execute(payload: LogDailyWeightInPayload): Promise<any> {
        try {
            const { userId, weight, unit } = payload;
            const today = new Date();

            const record = await DailyWeightInRepository.createWeightIn(
                userId,
                weight,
                unit,
                today
            );

            return record;
        } catch (error) {
            console.error("LogDailyWeightInAction error:", error);
            throw error; 
        }
    }
}

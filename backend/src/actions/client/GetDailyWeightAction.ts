import ActionInterface from "../../interfaces/ActionInterface";
import DailyWeightInRepository from "../../repositories/DailyWeightInRepository";

interface GetDailyWeightPayload {
    userId: string;
}

export class GetDailyWeightAction implements ActionInterface {

    async execute(payload: GetDailyWeightPayload): Promise<any> {
        const { userId } = payload;
        const today = new Date();
        
        return await DailyWeightInRepository.getWeightForDate(userId, today);

    }
}
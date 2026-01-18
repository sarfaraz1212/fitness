import ActionInterface from "../../interfaces/ActionInterface";
import DailyWeightInRepository from "../../repositories/DailyWeightInRepository";

interface GetDailyWeightInStatusPayload {
    userId: string;
}

export class GetDailyWeightInStatusAction implements ActionInterface {

    async execute(payload: GetDailyWeightInStatusPayload): Promise<any> {

        const { userId } = payload;
        const today = new Date();
        
        const record = await DailyWeightInRepository.hasWeightInForDate(userId, today);

        return record ? true : false;
    }
}
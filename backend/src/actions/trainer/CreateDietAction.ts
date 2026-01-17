import ActionInterface from "../../interfaces/ActionInterface";
import { DietRepository } from "../../repositories/DietRepository";

interface CreateDietPayload {
    name: string;
    description?: string;
    addedBy: string
}

export class CreateDietAction implements ActionInterface {
    async execute(payload: CreateDietPayload): Promise<any> {
        try {
           
            const createdDiet = DietRepository.create(payload);

            return createdDiet;
        } catch (error) {
            throw error;
        }
    }
}
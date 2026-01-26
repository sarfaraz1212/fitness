import ActionInterface from "../../interfaces/ActionInterface";
import { GoogleGenAI } from "@google/genai";

export class GetMarcosAction implements ActionInterface {
    async execute({ name }: { name: string }): Promise<any> {
        try {
            const ai = new GoogleGenAI({
                apiKey: process.env.GEMINI_API_KEY!,
            });

            const prompt = `
                You are a nutrition assistant. 
                Given the food and portion size below, return ONLY valid JSON (no extra text) with the following structure:

                {
                "calories": number,
                "protein": number,
                "carbs": number,
                "fats": number,
                "vitamins": [
                    {"name": string, "amount": string}
                ],
                "minerals": [
                    {"name": string, "amount": string}
                ]
                }

                Include the most relevant vitamins and minerals with their typical amounts per the given portion. 

                Food: ${name}
                `;

            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
            });

            console.log(response.text); 

            try {
                const json = JSON.parse(response.text);

                return {
                    name,
                    calories: json.calories,
                    protein: json.protein,
                    carbs: json.carbs,
                    fats: json.fats,
                    vitamins: json.vitamins,
                    minerals: json.minerals,
                };
            } catch (err) {
                console.error("Failed to parse JSON from Gemini:", response.text);
                throw err;
            }
        } catch (error: any) {
            console.error("Error in GetMarcosAction:", error);
            // If quota exceeded, return static values
            if (
                error?.message &&
                error.message.includes('quota') ||
                error.message.includes('RESOURCE_EXHAUSTED') ||
                error.message.includes('429')
            ) {
                return {
                    name,
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fats: 0,
                    vitamins: [],
                    minerals: [],
                };
            }
            throw error;
        }
    }
}

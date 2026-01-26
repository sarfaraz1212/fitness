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
                            Given the food and portion size below, return ONLY valid JSON (no extra text) with these keys:
                            {
                            "calories": number,
                            "protein": number,
                            "carbs": number,
                            "fats": number
                            }

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
                };
            } catch (err) {
                console.error("Failed to parse JSON from Gemini:", response.text);
                throw err;
            }
        } catch (error) {
            console.error("Error in GetMarcosAction:", error);
            throw error;
        }
    }
}

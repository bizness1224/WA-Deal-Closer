import { GoogleGenAI, Type } from "@google/genai";
import { FollowUpInputs, GeneratedMessage } from "../types";

export const generateWebinarFollowUps = async (inputs: FollowUpInputs): Promise<GeneratedMessage[]> => {
  // Always use the latest instance for the request
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Role: Expert WhatsApp Sales Assistant for Indian Business.
    Business Type: ${inputs.productCategory}
    User Situation: ${inputs.problem}
    Target Audience: ${inputs.customerType}
    Tone: ${inputs.tone}
    Language: ${inputs.language}

    Task: Write 3 short WhatsApp messages (2-3 lines each) to help the user resolve the situation professionally.
    
    Guidelines:
    1. Gender Neutral: Use neutral Hindi/English (Hinglish). Avoid "raha/rahi". Use "Team", "Aapka", etc.
    2. Professional & Helpful: No aggressive sales tactics.
    3. Call to Action: Every message should end with a very soft, polite question.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [{ parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            messages: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.STRING, description: "e.g. Follow-up 1" },
                  text: { type: Type.STRING, description: "The WhatsApp message content" }
                },
                required: ["step", "text"]
              }
            }
          },
          required: ["messages"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    const data = JSON.parse(text);
    
    return data.messages.map((m: any, i: number) => ({
      id: `msg-${Date.now()}-${i}`,
      stepName: m.step || `Step ${i + 1}`,
      text: m.text
    }));
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
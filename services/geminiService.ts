
import { GoogleGenAI, Type } from "@google/genai";
import { FollowUpInputs, GeneratedMessage } from "../types";

export const generateWebinarFollowUps = async (inputs: FollowUpInputs): Promise<GeneratedMessage[]> => {
  // Use the API key directly from the environment variable as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    You are a world-class WhatsApp Sales Closing Expert for Indian businesses. 
    Category: ${inputs.productCategory}
    
    TASK: Generate exactly 3 high-impact follow-up messages for this specific problem: ${inputs.problem}.
    
    TARGET AUDIENCE: ${inputs.customerType}
    TONE: ${inputs.tone}
    LANGUAGE: ${inputs.language}

    STRICT RULES:
    1. GENDER NEUTRALITY: The sender's gender MUST NOT be visible. Avoid gendered verbs in Hindi/Hinglish (e.g., use "Team se update hai" instead of "Main kar raha hoon"). Do not use "raha" or "rahi". Use professional, neutral phrasing.
    2. SOLIDITY: Messages must be authoritative and professional. No desperation.
    3. QUANTITY: Generate exactly 3 messages as a sequence.
    4. LENGTH: 2-4 lines per message.
    5. CALL TO ACTION: End each message with a polite, low-friction question.

    STRATEGY:
    - Message 1: Professional check-in addressing the specific problem.
    - Message 2: Value-add or handling the logical objection behind the problem.
    - Message 3: Final gentle nudge/FOMO regarding the opportunity.

    FORMAT: Return only a raw JSON object. Do not include markdown formatting.
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
                  stepName: { type: Type.STRING },
                  text: { type: Type.STRING },
                },
                required: ["stepName", "text"]
              },
            },
          },
          required: ["messages"],
        },
      },
    });

    const responseText = response.text || '';
    
    // Safety check: Strip markdown code blocks if the model accidentally includes them
    const cleanJson = responseText
      .replace(/^```json\n?/, '')
      .replace(/\n?```$/, '')
      .trim();

    const data = JSON.parse(cleanJson);
    
    if (!data.messages || !Array.isArray(data.messages)) {
      throw new Error("Invalid response format from AI");
    }

    return data.messages.map((m: any, i: number) => ({
      id: `msg-${Date.now()}-${i}`,
      stepName: m.stepName || `Step ${i + 1}`,
      text: m.text
    }));
  } catch (error) {
    console.error("Gemini Service Error:", error);
    throw error;
  }
};

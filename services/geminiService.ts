
import { GoogleGenAI, Type } from "@google/genai";
import { FollowUpInputs, GeneratedMessage } from "../types";

export const generateWebinarFollowUps = async (inputs: FollowUpInputs): Promise<GeneratedMessage[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const prompt = `
    You are a world-class WhatsApp Sales Closing Expert for Indian businesses. 
    Business Category: ${inputs.productCategory}
    
    TASK: Generate exactly 3 high-impact follow-up messages that help the user close the deal for the following problem.
    
    PROBLEM: ${inputs.problem}
    TARGET AUDIENCE: ${inputs.customerType}
    TONE: ${inputs.tone}
    LANGUAGE: ${inputs.language}

    CRITICAL RULE: 
    - The messages MUST be completely GENDER-NEUTRAL. 
    - It should NOT be clear whether the sender is male or female. 
    - In Hindi/Hinglish, avoid verbs that are gender-specific (e.g., instead of "Main kar raha/rahi hoon", use neutral phrasing like "Team ki taraf se update hai" or use verbs that don't reveal gender if possible).
    - Use "aap" for respect and professional neutrality.

    STRATEGY FOR THESE 3 MESSAGES:
    1. Message 1 (The Hook): A very professional and solid opening that addresses the problem directly but politely.
    2. Message 2 (The Value/Logic): A follow-up that reinforces the "why" and handles the hidden objection.
    3. Message 3 (The Soft Closer): A final gentle nudge that makes it easy for the lead to say 'Yes' or take the next step.

    CONSTRAINTS:
    - Generate EXACTLY 3 messages.
    - Each message should be 2-4 lines long.
    - Messages must be "solid" - meaning they should command respect and sound authoritative yet helpful.
    - If language is Hinglish, use Roman script for Hindi words.
    - Use emojis only where they add a human touch.
    - End every message with a soft call-to-action (CTA).
    - No false promises or aggressive spamming.

    OUTPUT FORMAT: JSON object with a 'messages' array containing objects with 'stepName' (e.g. "Message 1") and 'text'.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          messages: {
            type: Type.ARRAY,
            minItems: 3,
            maxItems: 3,
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

  try {
    const data = JSON.parse(response.text);
    return (data.messages || []).map((m: any, i: number) => ({
      id: `msg-${i}`,
      ...m
    }));
  } catch (error) {
    console.error("Failed to parse Gemini response", error);
    return [];
  }
};

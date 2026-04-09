import { GoogleGenAI } from "@google/genai";
import { resumeData } from "../data/resume";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_PROMPT = `
You are an AI assistant for John Benedick V. Borgonia's portfolio. 
Your goal is to answer questions about his professional background, skills, and experience based on the provided resume data.

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Guidelines:
- Be professional, helpful, and concise.
- If asked about skills, mention his proficiency in SQL, Python, and GCP.
- If asked about experience, highlight his role at Accenture.
- If asked about projects, summarize the SQL Optimization, Cloud Migration, or Dashboard projects.
- If the question is unrelated to John's resume, politely redirect the conversation back to his professional profile.
`;

export async function getChatResponse(message: string, history: { role: "user" | "model", parts: { text: string }[] }[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role === "user" ? "user" : "model", parts: h.parts })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_PROMPT,
      }
    });

    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my AI brain right now. Please try again later!";
  }
}

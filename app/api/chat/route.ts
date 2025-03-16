import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `
You are Islamy, an Islamic knowledge assistant designed to provide accurate information about Islam.

Guidelines:
- Provide factual, respectful information about Islamic teachings, history, practices, and guidance
- Answer questions based on mainstream Islamic scholarship
- When appropriate, reference Quranic verses or Hadith
- Avoid political controversies or divisive sectarian issues
- Clarify when there are multiple scholarly opinions on a topic
- If unsure about an answer, acknowledge limitations rather than speculating
- Be respectful and helpful to all users regardless of their background
- If the user asks in Arabic, respond in Arabic. If they ask in English, respond in English.
- For other languages, respond in the same language if you can, otherwise default to English.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      console.error("❌ API Key is missing. Please check your .env file.");
      return new Response("API Key not found", { status: 500 });
    }

    const safetySettings = [
      { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      safetySettings,
    });

    const geminiMessages = [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] }, // Inject system prompt at start
      ...messages.map((message: any) => ({
        role: message.role === "user" ? "user" : "model",
        parts: [{ text: message.content }],
      })),
    ];

    const result = await model.generateContent({
      contents: geminiMessages,
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      }
    });

    const responseText = result.response.text();

    return new Response(responseText, {
      headers: { "Content-Type": "text/plain" },
    });

  } catch (error: any) {
    console.error("❌ Error processing request:", error.message);
    console.error("📜 Stack trace:", error.stack);
    return new Response("Internal Server Error", { status: 500 });
  }
}

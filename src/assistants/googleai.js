import { GoogleGenAI } from "@google/genai";
const apiKey = import.meta.env.VITE_GOOGLE_AI_API_KEY;

// Initialize Gemini client using the API key
const googleai = new GoogleGenAI({
  apiKey,
});

export class Assistant {zzzzz
  async chat(content) {
    try {
      const result = await googleai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: content,
      });
      return result.text;
    } catch (error) {
      throw error;
    }
  }

  async *chatstream(content) {
    try {
      const result = await googleai.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: content,
      });

      for await (const chunk of result) {
        console.log("🔹 Streamed chunk:", chunk.text); // Log each chunk
        yield chunk.text;
      }
    } catch (error) {
      console.error("🔥 chatstream error:", error); // <== log actual error
      throw error;
    }
  }
}

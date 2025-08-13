import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export class Assistant {
  #client
  #model;
  constructor(model = "gpt-3.5-turbo",client = openai) {
    thia.#client= client
    this.#model = model;
  }

  async chat(content, history) {
    try {
      const result = await this.#client.chat.completions.create({
        model: this.#model,
        messages: [...history, { role: "user", content }],
      });

      return result.choices[0].message.content;
    } catch (error) {
      console.error("OpenAI Chat Error:", error);
      throw error;
    }
  }

  async *chatstream(content) {
    try {
      const stream = await this.#client.chat.responses.create({
        model: "gpt-3.5-turbo",
        input: [
          {
            role: "user",
            content: content,
          },
        ],
        stream: true,
      });

      for await (const event of stream) {
        yield event.choices[0].message.content;
      }
    } catch (error) {
      throw error;
    }
  }
}

import { Configuration, OpenAIApi } from "openai";

class AIModel {
    async sendMessage(prompt) {
        throw new Error("Method 'sendMessage()' must be implemented.");
    }
}

class GeminiAI extends AIModel {
    constructor(apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        super();
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    async sendMessage(prompt) {
        console.log("Using Gemini AI Model");
        try {
            const chatSession = this.model.startChat();
            const response = await chatSession.sendMessage(prompt);
            return response.text;
        } catch (error) {
            console.error("Gemini AI error:", error);
            throw new Error("Gemini AI failed");
        }
    }
}

class ChatGPT extends AIModel {
    constructor(apiKey = process.env.OPENAI_API_KEY) {
        super();
        const configuration = new Configuration({ apiKey });
        this.openai = new OpenAIApi(configuration);
    }

    async sendMessage(prompt) {
        console.log("Using ChatGPT Model");
        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-4", // Switch to "gpt-3.5-turbo" for a cheaper option
                messages: [
                    { role: "system", content: "You are an AI that generates interview questions and answers in JSON format." },
                    { role: "user", content: prompt },
                ],
                max_tokens: 300,
            });
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error("ChatGPT error:", error);
            throw new Error("ChatGPT failed");
        }
    }
}

class AIModelFactory {
    static createAIModel(type, apiKey) {
        if (type === "gemini") return new GeminiAI(apiKey);
        if (type === "chatgpt") return new ChatGPT(apiKey);
        throw new Error("Unknown AI model type");
    }
}

export { AIModelFactory, GeminiAI, ChatGPT };

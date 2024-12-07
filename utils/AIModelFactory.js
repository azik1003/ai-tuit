// models/AIModelFactory.js

import ChatGPT from "./ChatGPT";
import GeminiAI from "./GeminiAI";

class AIModelFactory {
    static createAIModel(type, apiKey) {
        if (type === "gemini") return new GeminiAI(apiKey);
        if (type === "chatgpt") return new ChatGPT(apiKey);
        throw new Error("Unknown AI model type");
    }
}

export default AIModelFactory;

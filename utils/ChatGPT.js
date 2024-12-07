// models/ChatGPT.js


import { Configuration, OpenAIApi } from "openai";

class ChatGPT extends AIModel {
    constructor(apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
        super(apiKey);  // Call the superclass constructor.
        const configuration = new Configuration({ apiKey });
        this.openai = new OpenAIApi(configuration);
    }

    // Overriding the sendMessage method with specific logic for ChatGPT.
    async sendMessage(prompt) {
        console.log("Using ChatGPT Model");
        try {
            const response = await this.openai.createChatCompletion({
                model: "gpt-4",  // You can also use "gpt-3.5-turbo" for a cheaper option
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

export default ChatGPT;

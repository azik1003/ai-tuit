class AIModel {
    async sendMessage(prompt) {
        throw new Error("Method 'sendMessage()' must be implemented.");
    }
}

// Gemini AI class implementation
class GeminiAI extends AIModel {
    constructor(apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
        super();
        // Initialize Gemini API with the provided API key


        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
        });


        
        this.generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };
      
    }

    async sendMessage(prompt) {
        console.log("Using Gemini AI Model");

        try {
            // Start the chat session with the provided prompt and configuration
            const chatSession = this.model.startChat({
                generationConfig: this.generationConfig,
                safetySettings: this.safetySettings,
            });

            // Send the prompt to the model and get the response
            const response = await chatSession.sendMessage(prompt);

            // Return the generated response
            return response.text || "No response generated";
        } catch (error) {
            console.error("Error in Gemini AI:", error);
            throw new Error("Failed to get response from Gemini AI");
        }
    }
}

// ChatGPT class implementation (mock implementation for now)
class ChatGPT extends AIModel {
    async sendMessage(prompt) {
        console.log("Using ChatGPT Model");
        // Simulate ChatGPT API response
        return `ChatGPT Response: Processed prompt -> "${prompt}"`;
    }
}

// Factory class to create the appropriate AI model
class AIModelFactory {
    static createAIModel(type, apiKey) {
        if (type === "gemini") {
            return new GeminiAI(apiKey);
        } else if (type === "chatgpt") {
            return new ChatGPT();
        } else {
            throw new Error("Unknown AI model type");
        }
    }
}

export { AIModelFactory, GeminiAI, ChatGPT };

// models/AIModel.js

class AIModel {
    constructor(apiKey) {
        if (new.target === AIModel) {
            throw new Error("Cannot instantiate an abstract class.");
        }
        this.apiKey = apiKey;
    }

    async sendMessage(prompt) {
        throw new Error("Method 'sendMessage()' must be implemented.");
    }
}

export default AIModel;

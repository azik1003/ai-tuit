const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  export const chatSession = model.startChat({
    generationConfig,
  });
  
  // Factory Method Implementation
  
  class SavolCreator {
    async createQuestions(jobPosition, jobDesc, jobExperience) {
      throw new Error("createQuestions() method must be implemented");
    }
  }
  
  class ITSavolCreator extends SavolCreator {
    async createQuestions(jobPosition, jobDesc, jobExperience) {
      const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Give ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions with answers in JSON format.`;
  
      const result = await chatSession.sendMessage(InputPrompt);
      const mockJsonResp = (await result.response.text())
        .replace('```json', '')
        .replace('```', '');
  
      return JSON.parse(mockJsonResp);
    }
  }
  
  class MarketingSavolCreator extends SavolCreator {
    async createQuestions(jobPosition, jobDesc, jobExperience) {
      const InputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDesc}, Years of Experience: ${jobExperience}, Provide ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} marketing-related interview questions and answers in JSON format.`;
  
      const result = await chatSession.sendMessage(InputPrompt);
      const mockJsonResp = (await result.response.text())
        .replace('```json', '')
        .replace('```', '');
  
      return JSON.parse(mockJsonResp);
    }
  }
  
  export async function generateInterviewQuestions(jobPosition, jobDesc, jobExperience, field) {
    let creator;
  
    switch (field) {
      case "IT":
        creator = new ITSavolCreator();
        break;
      case "Marketing":
        creator = new MarketingSavolCreator();
        break;
      default:
        throw new Error("Field not supported");
    }
  
    return await creator.createQuestions(jobPosition, jobDesc, jobExperience);
  }
  
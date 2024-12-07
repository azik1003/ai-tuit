const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config(); 

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function chatWithAI(prompt) {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-4", 
      messages: [
        { role: "system", content: "You are a helpful assistant." }, 
        { role: "user", content: prompt }, 
      ],
      max_tokens: 200, 
      temperature: 0.7, 
    });

    const aiResponse = response.data.choices[0].message.content;
    console.log("AI Response:", aiResponse);
    return aiResponse;
  } catch (error) {
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}


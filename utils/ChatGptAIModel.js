// 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


const { Configuration, OpenAIApi } = require("openai");

// Initialize OpenAI API

const openai = new OpenAIApi(configuration);

// Generate Questions and Answers
async function generateQnA(topic) {
  try {
    const prompt = `Generate 3 interview questions and answers on the topic "${topic}". Provide the questions and answers in JSON format with "question" and "answer" fields.`;

    const response = await openai.createChatCompletion({
      model: "gpt-4", // Use "gpt-3.5-turbo" for a cheaper option
      messages: [
        { role: "system", content: "You are an AI designed to create interview questions and answers." },
        { role: "user", content: prompt },
      ],
      max_tokens: 300, // Adjust based on how detailed you want the responses
    });

    const qna = JSON.parse(response.data.choices[0].message.content); // Parse JSON response
    console.log("Generated Q&A:", qna);
    return qna;
  } catch (error) {
    console.error("Error generating Q&A:", error);
  }
}

// Example Usage
generateQnA("Machine Learning");

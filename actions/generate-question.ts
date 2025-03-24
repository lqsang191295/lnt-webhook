"use server";

type TypeInput = {
  api_key: string;
  model: string;
  amount: number;
  department: string;
};

let input: TypeInput = {
  api_key: "",
  model: "",
  amount: 0,
  department: "",
};

const prompt = `
    Tạo {amount} câu hỏi phỏng vấn kỹ thuật cho một chuyên gia làm việc trong khoa {department} của bệnh viện.

    Mỗi câu hỏi nên ở dạng trắc nghiệm với 4 lựa chọn.

    Trả về kết quả dưới dạng JSON theo cấu trúc sau, không thêm bất kỳ nội dung nào khác:
    {
        "questions": [
            {
                "question": "string",
                "options": ["string", "string", "string", "string"],
                "correctAnswer": "string",
                "explanation": "string"
            }
        ]
    }
  `;

const chatWithGeminiAI = async () => {
  const loadGoogleGenerativeAI = async (api_key: string) => {
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    return new GoogleGenerativeAI(api_key);
  };

  const genAI = await loadGoogleGenerativeAI(input.api_key);
  const genModel = genAI.getGenerativeModel({ model: input.model });
  const correctPrompt = prompt
    .replace("{amount}", input.amount.toString())
    .replace("{department}", input.department);

  const result = await genModel.generateContent(correctPrompt);
  const response = result.response;
  const text = response.text();
  const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
  const quiz = JSON.parse(cleanedText);

  return quiz.questions;
};

const chatWithGptAI = async () => {
  const loadChatGptAI = async (api_key: string) => {
    const { OpenAI } = await import("openai");
    return new OpenAI({
      apiKey: api_key,
    });
  };

  const openai = await loadChatGptAI(input.api_key);
  const correctPrompt = prompt
    .replace("{amount}", input.amount.toString())
    .replace("{department}", input.department);
  const completion = await openai.chat.completions.create({
    model: input.model,
    messages: [{ role: "user", content: correctPrompt }],
    max_tokens: 200,
  });

  console.log(completion.choices[0].message.content);
};

const chatWithDeepseekAI = async () => {
  const loadChatGptAI = async (api_key: string) => {
    const { OpenAI } = await import("openai");
    return new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: api_key,
    });
  };

  const openai = await loadChatGptAI(input.api_key);
  const correctPrompt = prompt
    .replace("{amount}", input.amount.toString())
    .replace("{department}", input.department);
  const completion = await openai.chat.completions.create({
    model: input.model,
    messages: [{ role: "system", content: correctPrompt }],
  });

  console.log(completion.choices[0].message.content);
};

const updateInputValue = (
  api_key: string,
  model: string,
  amount: number,
  department: string
) => {
  input = {
    api_key,
    model,
    amount,
    department,
  };
};

export async function generateQuiz(
  api_key: string,
  model: string,
  amount: number,
  department: string
) {
  updateInputValue(api_key, model, amount, department);

  let questions;

  try {
    if (model.includes("gemini")) {
      questions = await chatWithGeminiAI();
    } else if (model.includes("gpt")) {
      questions = await chatWithGptAI();
    } else if (model.includes("deepseek")) {
      questions = await chatWithDeepseekAI();
    }

    console.log(";questions ==== ", questions);

    return questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

"use server";

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// type Props = {
//   obj: object; // or Record<string, unknown>
// };

//obj = {prompt: "", data: [], type: "text"}
export const geminiPro = async (obj) => {
  const MODEL_NAME = "gemini-pro";
  const API_KEY = process.env.GEMINI_PRO_API_KEY;
  if (!API_KEY) throw new Error("API key not found");
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  try {
    const newPrompt = `${obj.prompt} \n\n ${
      obj.type == "text" ? obj.data : JSON.stringify(obj.data)
    }`;

    const parts = [
      {
        text: newPrompt,
      },
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
      safetySettings,
    });

    const response = result.response;

    let resultData = response.text();

    if (obj.type != "text") {
      resultData = JSON?.parse(resultData);
      //if not parsed correctly

      if (!resultData) {
        return {
          status: 400,
          message: "Not Parsed Correctly",
          data: 0,
          action: "skip",
        };
      }
    }

    return { status: 200, message: "success", data: resultData, action: "" };
  } catch (error) {
    console.log(error.message);

    if (error.message.includes("Harmful content detected")) {
      return {
        status: 400,
        message: "Harmful content detected",
        data: 0,
        action: "skip",
      };
    } else if (error.message.includes("Resource exhausted")) {
      return {
        status: 400,
        message: error.message,
        data: 0,
        action: "stop",
      };
    } else if (error.message.includes("Internal error")) {
      return {
        status: 500,
        message: error.message,
        data: 0,
        action: "stop",
      };
    } else if (error.message.includes("Request failed with status code 429")) {
      return {
        status: 429,
        message: "Rate limit exceeded",
        data: 0,
        action: "stop",
      };
    }
  }
};

import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
    console.warn("⚠️ GEMINI_API_KEY is not set in .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export interface GeneratedOffer {
    title: string;
    description: string;
    code: string | null;
    discount: string;
    expiryDate: string; // YYYY-MM-DD
    type: "code" | "deal";
}

export interface StoreOffers {
    storeName: string;
    offers: GeneratedOffer[];
}

export async function generateOffersBatch(
    stores: string[],
    country: string,
    language: string
): Promise<StoreOffers[]> {
    if (!API_KEY) return [];

    const prompt = `
    Generate 5-10 realistic coupon codes and deals for EACH of the following stores in ${country} (${language} language).
    
    Stores: ${stores.join(", ")}

    Requirements:
    - Mix of: percentage discounts, fixed amount off, free shipping
    - Include expiry dates (1-3 months from now)
    - Use realistic codes (e.g., SAVE20, WELCOME10)
    - Return strictly valid JSON array
    
    Format:
    [
      {
        "storeName": "Store Name",
        "offers": [
          {
            "title": "20% Off",
            "description": "...",
            "code": "SAVE20",
            "discount": "20%",
            "expiryDate": "2024-12-31",
            "type": "code"
          }
        ]
      }
    ]
  `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean markdown code blocks if present
        const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
        return JSON.parse(jsonStr);
    } catch (error) {
        console.error("Error generating offers:", error);
        return [];
    }
}

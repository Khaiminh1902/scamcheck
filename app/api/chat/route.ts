import { NextResponse } from "next/server";
import { DetectiveResult } from "@/types/detective";

const fallback: DetectiveResult = {
  riskLevel: "warning",
  scamSigns: [],
  recommendedActions: [
    "Không đưa ra quyết định vội vàng.",
    "Xác minh thông tin qua nguồn chính thức.",
  ],
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const prompt = `
Mày là chuyên gia phát hiện lừa đảo

Phân tích nội dung:

"${message}"

Trả về JSON đúng format:

{
  "riskLevel":"safe | warning | danger",
  "scamSigns":[
    {
      "title":"",
      "explanation":"",
      "excerpt":""
    }
  ],
  "recommendedActions":[]
}

Chỉ trả về JSON
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      },
    );

    const data = await response.json();

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let result: DetectiveResult;

    try {
      result = JSON.parse(cleaned);
    } catch {
      result = fallback;
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(fallback);
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { DetectiveResult } from "@/types/detective";

const fallback: DetectiveResult = {
  riskLevel: "warning",
  scamSigns: [],
  recommendedActions: [
    "Không đưa ra quyết định vội vàng",
    "Xác minh thông tin qua nguồn chính thức",
  ],
};

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const prompt = `
Bạn là chuyên gia phát hiện lừa đảo.

Phân tích nội dung sau:

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

Chỉ trả về JSON.
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
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      console.log("STATUS:", response.status);
      console.log("ERROR:", errorText);

      return NextResponse.json({
        ...fallback,
        error: errorText,
      });
    }

    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    console.log("Gemini raw:", text);

    const cleaned = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    let parsed: any = {};
    let hasParseError = false;

    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON parse failed:", e);
      parsed = {};
      hasParseError = true;
    }

    const result: DetectiveResult = {
      riskLevel:
        parsed?.riskLevel === "safe" ||
        parsed?.riskLevel === "warning" ||
        parsed?.riskLevel === "danger"
          ? parsed.riskLevel
          : "warning",

      scamSigns: Array.isArray(parsed?.scamSigns)
        ? parsed.scamSigns.map((item: any) => ({
            title: item?.title ?? "",
            explanation: item?.explanation ?? "",
            excerpt: item?.excerpt ?? "",
          }))
        : [],

      recommendedActions: Array.isArray(parsed?.recommendedActions)
        ? parsed.recommendedActions
        : [],
    };

    if (hasParseError || Object.keys(parsed).length === 0) {
       return NextResponse.json({ ...result, error: "Lỗi định dạng trả về từ AI" });
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
        ...fallback,
        error: error?.message || "Lỗi xử lý hệ thống",
    });
  }
}

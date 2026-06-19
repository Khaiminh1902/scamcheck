import { NextResponse } from "next/server";
import { DetectiveResult } from "@/types/detective";

type GeminiGenerateResponse = {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
};

type GeminiScamSign = {
  title?: unknown;
  explanation?: unknown;
  excerpt?: unknown;
};

type GeminiDetectiveResult = {
  riskLevel?: unknown;
  scamSigns?: unknown;
  recommendedActions?: unknown;
};

const fallback: DetectiveResult = {
  riskLevel: "warning",
  scamSigns: [],
  recommendedActions: [
    "Không đưa ra quyết định vội vàng",
    "Xác minh thông tin qua nguồn chính thức",
  ],
};

const psychologyBusyMessage = "Cô tâm lý đang bận, vui lòng thử lại sau.";

function isRiskLevel(value: unknown): value is DetectiveResult["riskLevel"] {
  return value === "safe" || value === "warning" || value === "danger";
}

function cleanJsonText(text: string) {
  return text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
}

function toText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeDetectiveResult(parsed: GeminiDetectiveResult): DetectiveResult {
  return {
    riskLevel: isRiskLevel(parsed.riskLevel) ? parsed.riskLevel : "warning",
    scamSigns: Array.isArray(parsed.scamSigns)
      ? parsed.scamSigns.map((item: GeminiScamSign) => ({
          title: toText(item?.title),
          explanation: toText(item?.explanation),
          excerpt: toText(item?.excerpt),
        }))
      : [],
    recommendedActions: Array.isArray(parsed.recommendedActions)
      ? parsed.recommendedActions.filter(
          (action): action is string => typeof action === "string",
        )
      : [],
  };
}

async function callGemini(prompt: string) {
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
    throw new Error(await response.text());
  }

  const data = (await response.json()) as GeminiGenerateResponse;
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
}

async function getPsychologyAdvice(message: string, detectiveResult: DetectiveResult) {
  const prompt = `
Bạn là Cô tâm lý trong ứng dụng giáo dục chống lừa đảo.

Hãy viết lời nhắn cho người dùng với các quy tắc:
- Giọng gần gũi, xưng là "cô" và gọi người dùng là "bác".
- Chỉ viết từ hai đến ba câu.
- Không hù dọa, không lên giọng dạy dỗ.
- Giải thích chiêu thức tâm lý mà kẻ lừa đảo đã dùng trong tin nhắn.

Tin nhắn người dùng:
"${message}"

Kết luận kỹ thuật của Thám tử:
${JSON.stringify(detectiveResult)}

Trả về JSON đúng format:

{
  "advice":""
}

Chỉ trả về JSON.
`;

  const text = await callGemini(prompt);
  const parsed = JSON.parse(cleanJsonText(text)) as { advice?: unknown };
  const advice = toText(parsed.advice).trim();

  if (!advice) {
    throw new Error("Cô tâm lý trả về nội dung rỗng.");
  }

  return advice;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { message?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { ...fallback, error: "Vui lòng nhập nội dung tin nhắn cần kiểm tra." },
        { status: 400 },
      );
    }

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

    const text = await callGemini(prompt);
    const cleaned = cleanJsonText(text);
    let parsed: GeminiDetectiveResult = {};
    let hasParseError = false;

    try {
      parsed = JSON.parse(cleaned) as GeminiDetectiveResult;
    } catch (e) {
      console.error("JSON parse failed:", e);
      parsed = {};
      hasParseError = true;
    }

    const result: DetectiveResult = normalizeDetectiveResult(parsed);

    if (hasParseError || Object.keys(parsed).length === 0) {
       return NextResponse.json({ ...result, error: "Lỗi định dạng trả về từ AI" });
    }

    if (result.riskLevel === "warning" || result.riskLevel === "danger") {
      try {
        result.psychologyAdvice = await getPsychologyAdvice(message, result);
      } catch (psychologyError) {
        console.error("Psychology layer failed:", psychologyError);
        result.psychologyError = psychologyBusyMessage;
      }
    }

    return NextResponse.json(result);
  } catch (error: unknown) {
    console.error(error);

    return NextResponse.json({
        ...fallback,
        error: error instanceof Error ? error.message : "Lỗi xử lý hệ thống",
    });
  }
}

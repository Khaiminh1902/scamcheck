import { NextResponse } from "next/server";
import {
  DetectiveResult,
  DetectiveScenario,
  ScenarioKey,
} from "@/types/detective";

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
  psychologyAdvice?: unknown;
  scenarios?: unknown;
};

const fallback: DetectiveResult = {
  riskLevel: "warning",
  scamSigns: [],
  recommendedActions: [
    "Không đưa ra quyết định vội vàng",
    "Xác minh thông tin qua nguồn chính thức",
  ],
};

const detectiveResponseSchema = {
  type: "OBJECT",
  properties: {
    riskLevel: {
      type: "STRING",
      enum: ["safe", "warning", "danger"],
    },
    scamSigns: {
      type: "ARRAY",
      maxItems: 3,
      items: {
        type: "OBJECT",
        properties: {
          title: { type: "STRING" },
          explanation: { type: "STRING" },
          excerpt: { type: "STRING" },
        },
        required: ["title", "explanation", "excerpt"],
      },
    },
    recommendedActions: {
      type: "ARRAY",
      maxItems: 3,
      items: { type: "STRING" },
    },
    psychologyAdvice: {
      type: "STRING",
    },
    scenarios: {
      type: "ARRAY",
      minItems: 4,
      maxItems: 4,
      items: {
        type: "OBJECT",
        properties: {
          key: { type: "STRING", enum: ["none", "link", "money", "otp"] },
          label: { type: "STRING" },
        },
        required: ["key", "label"],
      },
    },
  },
  required: [
    "riskLevel",
    "scamSigns",
    "recommendedActions",
    "psychologyAdvice",
    "scenarios",
  ],
};

function isRiskLevel(value: unknown): value is DetectiveResult["riskLevel"] {
  return value === "safe" || value === "warning" || value === "danger";
}

function isScenarioKey(value: unknown): value is ScenarioKey {
  return value === "none" || value === "link" || value === "money" || value === "otp";
}

function toText(value: unknown) {
  return typeof value === "string" ? value : "";
}

function toScenarioList(value: unknown): DetectiveScenario[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  return value.map((scenario) => {
    const item =
      typeof scenario === "object" && scenario !== null
        ? (scenario as { key?: unknown; label?: unknown })
        : {};

    return {
      key: isScenarioKey(item.key) ? item.key : "none",
      label: toText(item.label),
    };
  });
}

function normalizeDetectiveResult(
  parsed: GeminiDetectiveResult,
): DetectiveResult {
  const riskLevel = isRiskLevel(parsed.riskLevel)
    ? parsed.riskLevel
    : "warning";
  const psychologyAdvice = toText(parsed.psychologyAdvice).trim();
  const scenarios = toScenarioList(parsed.scenarios);

  return {
    riskLevel,
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
    scenarios,
    ...(riskLevel !== "safe" && psychologyAdvice ? { psychologyAdvice } : {}),
  };
}

async function callGemini(prompt: string) {
  const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
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
          responseSchema: detectiveResponseSchema,
          temperature: 0.2,
          maxOutputTokens: 8192,
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

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { message?: unknown };
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!message) {
      return NextResponse.json(
        { ...fallback, error: "Vui lòng nhập nội dung tin nhắn cần kiểm tra" },
        { status: 400 },
      );
    }

    const prompt = `
Mày là chuyên gia phát hiện lừa đảo.

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
  "recommendedActions":[],
  "psychologyAdvice":"",
  "scenarios":[
    { "key": "none", "label": "" },
    { "key": "link", "label": "" },
    { "key": "money", "label": "" },
    { "key": "otp", "label": "" }
  ]
}

Quy tắc:
- Nếu riskLevel là "safe", psychologyAdvice phải là chuỗi rỗng.
- Nếu riskLevel là "warning" hoặc "danger", psychologyAdvice là lời nhắn từ Cô tâm lý: xưng "cô", gọi người dùng là "bác", chỉ hai đến ba câu, giải thích chiêu thức tâm lý, không hù dọa và không lên giọng dạy dỗ.
- scamSigns có tối đa 3 phần tử.
- recommendedActions có tối đa 3 phần tử.
- scenarios PHẢI có đúng 4 phần tử với các key tương ứng:
  * "none": Nhãn cho hành động chưa làm gì cả, cá nhân hóa theo tin nhắn (ví dụ: "Chưa làm gì cả, chỉ mới đọc tin nhắn").
  * "link": Nhãn cho hành động bấm vào đường dẫn lạ cụ thể trong tin nhắn (ví dụ: "Đã bấm vào link trong tin nhắn").
  * "money": Nhãn cho hành động chuyển khoản tiền cụ thể được yêu cầu (ví dụ: "Đã chuyển khoản tiền theo yêu cầu").
  * "otp": Nhãn cho hành động cung cấp mã OTP/thông tin đăng nhập bảo mật (ví dụ: "Đã cung cấp mã xác thực OTP").
- Viết ngắn gọn, ưu tiên câu rõ ràng cho người lớn tuổi.
- Không xuống dòng bên trong chuỗi JSON.

Chỉ trả về JSON.
`;

    const text = await callGemini(prompt);

    let cleanText = text.trim();
    if (cleanText.startsWith("```json")) cleanText = cleanText.substring(7);
    else if (cleanText.startsWith("```")) cleanText = cleanText.substring(3);
    if (cleanText.endsWith("```"))
      cleanText = cleanText.substring(0, cleanText.length - 3);
    cleanText = cleanText.trim();
    cleanText = cleanText.replace(/[\n\r\t]/g, " ");

    let parsed: GeminiDetectiveResult = {};
    let hasParseError = false;

    try {
      parsed = JSON.parse(cleanText);
    } catch (e) {
      console.error("JSON parse failed:", e);
      parsed = {};
      hasParseError = true;
    }

    const result: DetectiveResult = normalizeDetectiveResult(parsed);

    if (hasParseError || Object.keys(parsed).length === 0) {
      return NextResponse.json({
        ...result,
        error: "Lỗi định dạng trả về từ AI",
      });
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

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

type GeminiGenerateResponse = {
  candidates?: {
    content?: {
      parts?: {
        text?: string;
      }[];
    };
  }[];
};

const responderResponseSchema = {
  type: "OBJECT",
  properties: {
    steps: {
      type: "ARRAY",
      description: "Danh sách các bước hành động được đánh số. Tuyệt đối không chứa dấu chấm than (!) ở bất kỳ phần nào.",
      items: {
        type: "OBJECT",
        properties: {
          stepNumber: { type: "INTEGER" },
          action: { type: "STRING", description: "Hành động cụ thể cần làm ngay lập tức" },
          quote: { type: "STRING", description: "Câu nói mẫu, lời thoại mẫu để người dùng đọc khi thực hiện hành động (ví dụ khi gọi điện thoại)" }
        },
        required: ["stepNumber", "action", "quote"]
      }
    }
  },
  required: ["steps"]
};

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
          responseSchema: responderResponseSchema,
          temperature: 0.1,
          maxOutputTokens: 1600,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  const data = (await response.json()) as GeminiGenerateResponse;
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messageText, scenario } = body as { messageText: string; scenario: "link" | "money" | "otp" };

    if (!messageText || !scenario) {
      return NextResponse.json(
        { error: "Thiếu dữ liệu đầu vào." },
        { status: 400 }
      );
    }

    // Đọc danh bạ hotline chính thức từ file
    const hotlinesPath = path.join(process.cwd(), "app", "data", "hotlines.json");
    const hotlinesData = await fs.readFile(hotlinesPath, "utf-8");
    const hotlines = JSON.parse(hotlinesData);

    const scenarioText = 
      scenario === "link" ? "Đã bấm vào đường dẫn lạ" :
      scenario === "money" ? "Đã chuyển khoản tiền cho kẻ lừa đảo" :
      "Đã cung cấp mã xác thực OTP / thông tin bảo mật";

    const prompt = `
Mày là "Người ứng cứu" - một chuyên gia hỗ trợ khẩn cấp cho người dùng bị lừa đảo công nghệ cao.
Nhiệm vụ của mày là đưa ra danh sách các hành động ứng phó khẩn cấp và chuẩn xác nhất cho tình huống hiện tại của người dùng.

Tình huống người dùng gặp phải: "${scenarioText}"
Tin nhắn lừa đảo liên quan: "${messageText}"

Danh sách số điện thoại chính thức được phép dùng (Tuyệt đối KHÔNG tự sinh ra bất kỳ số điện thoại nào khác):
${JSON.stringify(hotlines, null, 2)}

Quy tắc bắt buộc:
1. Giọng nói bình tĩnh, dứt khoát, trực diện.
2. Tuyệt đối không an ủi, không phân tích, không giải thích dài dòng.
3. Chỉ liệt kê các bước hành động được đánh số (1, 2, 3...).
4. Mỗi bước hành động phải kèm theo một câu nói mẫu/lời thoại mẫu cụ thể để người dùng chỉ việc đọc lên khi gọi điện thoại cho bên liên quan.
5. Chỉ được dùng số điện thoại từ danh sách chính thức được cung cấp ở trên.
6. TUYỆT ĐỐI KHÔNG SỬ DỤNG DẤU CHẤM THAN (!) trong toàn bộ phản hồi.

Trả về kết quả dưới dạng JSON theo đúng schema được yêu cầu.
`;

    const text = await callGemini(prompt);
    
    // Parse để lọc sạch và kiểm chứng không có dấu chấm than trong các trường văn bản
    let parsedResult = JSON.parse(text);
    if (parsedResult && Array.isArray(parsedResult.steps)) {
      parsedResult.steps = parsedResult.steps.map((step: { stepNumber: number; action: string; quote: string }) => {
        return {
          stepNumber: step.stepNumber,
          action: (step.action || "").replace(/!/g, "."),
          quote: (step.quote || "").replace(/!/g, ".")
        };
      });
    }

    return NextResponse.json(parsedResult);
  } catch (error: unknown) {
    console.error("Lỗi Người ứng cứu:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lỗi hệ thống khi gọi Người ứng cứu" },
      { status: 500 }
    );
  }
}

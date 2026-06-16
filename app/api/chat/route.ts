import { NextResponse } from "next/server";
import hotlines from "../../data/hotlines.json";

// Helper function to clean markdown formatting from Gemini JSON responses
function cleanAndParseJSON(text: string) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.slice(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.slice(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.slice(0, -3);
  }
  cleaned = cleaned.trim();
  return JSON.parse(cleaned);
}

// Fallback logic for offline testing or when GEMINI_API_KEY is not configured
function getMockDetectResponse(message: string) {
  const lowercaseMsg = message.toLowerCase();
  
  if (lowercaseMsg.includes("vietcombank") || lowercaseMsg.includes("otp") || lowercaseMsg.includes("biến động") || lowercaseMsg.includes("khoá tài khoản")) {
    return {
      riskLevel: "DANGEROUS",
      scamSigns: [
        {
          phrase: message.match(/vietcombank|otp|khoá tài khoản|biến động/gi)?.[0] || "Vietcombank",
          explanation: "Tin nhắn yêu cầu cung cấp OTP hoặc cảnh báo khoá tài khoản khẩn cấp, đây là chiêu trò phổ biến giả mạo ngân hàng."
        }
      ],
      recommendations: [
        "KHÔNG bấm vào bất kỳ đường dẫn nào trong tin nhắn.",
        "KHÔNG cung cấp mã OTP hay thông tin mật khẩu cho bất kỳ ai.",
        "Liên hệ ngay tổng đài Vietcombank chính thức 1900545413 để xác thực."
      ]
    };
  }

  if (lowercaseMsg.includes("quà tặng") || lowercaseMsg.includes("trúng thưởng") || lowercaseMsg.includes("miễn phí") || lowercaseMsg.includes("tri ân")) {
    return {
      riskLevel: "SUSPICIOUS",
      scamSigns: [
        {
          phrase: message.match(/quà tặng|trúng thưởng|miễn phí|tri ân/gi)?.[0] || "Trúng thưởng",
          explanation: "Thông báo trúng thưởng hoặc nhận quà tri ân miễn phí thường đi kèm điều kiện chuyển khoản trước hoặc điền thông tin cá nhân."
        }
      ],
      recommendations: [
        "Không đóng bất kỳ khoản phí nào để nhận thưởng.",
        "Kiểm tra lại chương trình khuyến mãi trên trang web chính thức của hãng.",
        "Không chia sẻ thông tin cá nhân hoặc tài khoản ngân hàng."
      ]
    };
  }

  return {
    riskLevel: "SAFE",
    scamSigns: [],
    recommendations: [
      "Tin nhắn chưa phát hiện dấu hiệu lừa đảo phổ biến.",
      "Vẫn luôn nâng cao cảnh giác với các yêu cầu chuyển khoản từ người lạ.",
      "Chia sẻ ứng dụng này với người thân để cùng phòng chống lừa đảo."
    ]
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, message, situation, selectedBank } = body;

    if (!message && mode !== "emergency") {
      return NextResponse.json({ error: "Nội dung tin nhắn không được để trống" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined. Using mock response for demo.");
      if (mode === "detect") {
        return NextResponse.json({ reply: getMockDetectResponse(message) });
      } else if (mode === "psychology") {
        return NextResponse.json({
          reply: {
            content: "Bác ơi, tin nhắn này cố ý tạo cảm giác khẩn cấp hoặc hứa hẹn lợi ích lớn để bác hoảng sợ hoặc phấn khích mà làm theo. Hãy dừng lại 10 giây và gọi cho con cháu hoặc ngân hàng để hỏi rõ bác nhé."
          }
        });
      } else {
        return NextResponse.json({
          reply: {
            steps: [
              {
                title: "Khóa thẻ khẩn cấp",
                action: `Gọi ngay tổng đài ngân hàng ${selectedBank || "chính thức"} để yêu cầu khóa thẻ và tạm dừng mọi giao dịch.`,
                template: `"Tôi là chủ tài khoản, nghi ngờ thông tin bị lộ, yêu cầu ngân hàng khóa thẻ của tôi ngay lập tức."`
              },
              {
                title: "Báo cáo cơ quan chức năng",
                action: "Liên hệ Cục An toàn thông tin qua hotline 18001508 để trình báo sự việc.",
                template: `"Tôi muốn báo cáo một trường hợp lừa đảo chiếm đoạt thông tin xảy ra hôm nay..."`
              }
            ]
          }
        });
      }
    }

    let systemInstruction = "";
    let responseSchema: any = {};
    let promptText = message;

    if (mode === "detect") {
      systemInstruction = `Bạn là 'Thám tử ScamCheck', một AI chuyên phân tích kỹ thuật và phát hiện lừa đảo trong tin nhắn (SMS, Zalo, Email, Messenger...).
Giọng điệu: Khô khan, lý tính, tập trung vào sự thật kỹ thuật.
Nhiệm vụ: Phân tích kỹ lưỡng nội dung tin nhắn được cung cấp. Xác định xem tin nhắn đó có an toàn (SAFE), nghi ngờ (SUSPICIOUS) hay nguy hiểm/lừa đảo (DANGEROUS).
Các dấu hiệu lừa đảo bao gồm: link lạ, sai chính tả, giả danh cơ quan nhà nước/ngân hàng, ép buộc khẩn cấp, yêu cầu cung cấp OTP, trúng thưởng giả.
LƯU Ý QUAN TRỌNG:
- Trường 'phrase' trong 'scamSigns' bắt buộc phải là một đoạn trích dẫn CHÍNH XÁC từng ký tự từ tin nhắn gốc mà có chứa dấu hiệu lừa đảo đó. Không được tự ý sửa đổi từ ngữ hoặc bịa ra từ ngữ không có trong tin nhắn gốc. Nếu tin nhắn hoàn toàn an toàn, mảng 'scamSigns' phải để rỗng.
- Luôn cung cấp đúng 3 hành động khuyến nghị thực tế trong mảng 'recommendations'.`;

      responseSchema = {
        type: "OBJECT",
        properties: {
          riskLevel: {
            type: "STRING",
            enum: ["SAFE", "SUSPICIOUS", "DANGEROUS"]
          },
          scamSigns: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                phrase: { 
                  type: "STRING", 
                  description: "Trích dẫn CHÍNH XÁC từng ký tự trong tin nhắn gốc chứa dấu hiệu lừa đảo. Rỗng nếu tin nhắn an toàn." 
                },
                explanation: { 
                  type: "STRING", 
                  description: "Giải thích lý do tại sao cụm từ/đoạn trích này là dấu hiệu lừa đảo." 
                }
              },
              required: ["phrase", "explanation"]
            }
          },
          recommendations: {
            type: "ARRAY",
            items: { type: "STRING" },
            description: "Cung cấp chính xác 3 khuyến nghị hành động thiết thực cho người dùng."
          }
        },
        required: ["riskLevel", "scamSigns", "recommendations"]
      };
    } else if (mode === "psychology") {
      systemInstruction = `Bạn là 'Cô tâm lý', một chuyên gia tâm lý học thân thiện, gần gũi, xưng 'cô' và gọi người dùng là 'bác'.
Giọng điệu: Vô cùng nhẹ nhàng, thông cảm, ấm áp, không phán xét, không hù dọa, không lên giọng dạy đời.
Nhiệm vụ: Dựa trên tin nhắn nghi ngờ lừa đảo dưới đây, hãy giải thích ngắn gọn tâm lý đằng sau chiêu trò này (ví dụ: đánh vào nỗi sợ bị phạt, đánh vào lòng tham trúng thưởng, tạo sự khẩn cấp giả để bác không kịp suy nghĩ...).
Độ dài bắt buộc: Viết đúng từ 2 đến 3 câu ngắn gọn.`;

      responseSchema = {
        type: "OBJECT",
        properties: {
          content: {
            type: "STRING",
            description: "Nội dung giải thích tâm lý ngắn gọn từ 2-3 câu, xưng cô gọi bác."
          }
        },
        required: ["content"]
      };
    } else if (mode === "emergency") {
      const bankInfo = hotlines.find(h => h.name.toLowerCase() === selectedBank?.toLowerCase());
      const selectedBankDetails = bankInfo 
        ? `Tên ngân hàng: ${bankInfo.name}, Hotline: ${bankInfo.hotline}, Website: ${bankInfo.website}`
        : "Không có thông tin cụ thể (Người dùng chưa chọn ngân hàng).";

      systemInstruction = `Bạn là 'Người ứng cứu', chuyên gia xử lý khủng hoảng và hướng dẫn xử lý tình huống khẩn cấp khi người dùng đã lỡ sa bẫy lừa đảo trực tuyến.
Giọng điệu: Cực kỳ bình tĩnh, dứt khoát, nhanh chóng, không nói lời thừa, không an ủi hay giải thích tâm lý, chỉ đưa ra các bước hành động cụ thể rõ ràng.
Nhiệm vụ: Dựa trên tình huống khẩn cấp được chọn và tin nhắn lừa đảo gốc, hãy thiết lập các bước ứng cứu từng bước rõ ràng cho bác.
Các tình huống gồm:
- clicked_link: Người dùng đã lỡ bấm vào đường dẫn lạ.
- transferred_money: Người dùng đã lỡ chuyển khoản tiền cho kẻ lừa đảo.
- provided_otp: Người dùng đã lỡ cung cấp mã OTP/xác thực hoặc mật khẩu.

RÀNG BUỘC QUAN TRỌNG VỀ SỐ ĐIỆN THOẠI & THÔNG TIN LIÊN HỆ:
Bạn KHÔNG ĐƯỢC TỰ SINH hotline ngân hàng hay địa chỉ liên hệ. Bạn chỉ được phép sử dụng thông tin liên hệ chính thống từ danh sách bên dưới:
Danh sách tổng đài chính thống:
${JSON.stringify(hotlines, null, 2)}

Ngân hàng người dùng chọn: ${selectedBankDetails}

Nếu tình huống liên quan đến ngân hàng (như đã chuyển khoản hoặc lộ OTP), hãy chọn đúng hotline của ngân hàng đó từ danh sách trên để hướng dẫn bác gọi khóa thẻ ngay lập tức. Nếu không có ngân hàng tương ứng, hãy hướng dẫn bác liên hệ với đường dây nóng của Cục An toàn thông tin (18001508) hoặc Công an (113).

Mỗi bước trong danh sách hướng dẫn phải có cấu trúc gồm:
- 'title': Tiêu đề ngắn gọn của bước (ví dụ: 'Khóa thẻ ngân hàng', 'Báo công an').
- 'action': Hành động cụ thể phải làm ngay lập tức, nêu rõ số điện thoại lấy từ danh bạ trên.
- 'template': Câu nói mẫu để bác đọc theo khi gọi điện thoại (bắt buộc phải bọc trong dấu ngoặc kép, ví dụ: "Cháu chào ngân hàng, tôi là [Tên], tài khoản của tôi nghi ngờ bị lộ thông tin, xin ngân hàng khóa thẻ của tôi ngay lập tức").`;

      responseSchema = {
        type: "OBJECT",
        properties: {
          steps: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                title: { type: "STRING" },
                action: { type: "STRING" },
                template: { type: "STRING" }
              },
              required: ["title", "action", "template"]
            }
          }
        },
        required: ["steps"]
      };

      promptText = `Tình huống: ${situation}. Tin nhắn gốc: "${message}". Ngân hàng liên quan: ${selectedBank || "Không rõ"}`;
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
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
                  text: promptText,
                },
              ],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: systemInstruction,
              },
            ],
          },
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
          },
        }),
      },
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API Error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const rawReply = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!rawReply) {
      throw new Error("Không nhận được phản hồi từ AI");
    }

    const parsedReply = cleanAndParseJSON(rawReply);
    return NextResponse.json({ reply: parsedReply });

  } catch (error: any) {
    console.error("API Chat handler error:", error);
    return NextResponse.json(
      { error: error.message || "Đã xảy ra lỗi hệ thống, vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}

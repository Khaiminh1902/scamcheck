import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/lib/storage";

export async function POST(req: Request) {
  try {
    const { message, result } = await req.json();

    if (!message || !result) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp đầy đủ message và result." },
        { status: 400 }
      );
    }

    const shareId = uuidv4();
    
    // Lưu vào Storage (KV trên Vercel, In-memory trên Local)
    await storage.set(`share:${shareId}`, { message, result }, { ex: 86400 });

    return NextResponse.json({ shareId });
  } catch (error) {
    console.error("Lỗi khi tạo mã chia sẻ:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi tạo link chia sẻ." },
      { status: 500 }
    );
  }
}

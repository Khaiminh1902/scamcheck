import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { storage } from "@/lib/storage";
import { SharePayload } from "@/types/detective";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<SharePayload>;
    const { message, result } = body;

    if (!message || !result) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp đầy đủ message và result." },
        { status: 400 },
      );
    }

    const shareId = uuidv4();
    await storage.set(`share:${shareId}`, { message, result }, { ex: 86400 });

    return NextResponse.json({ shareId });
  } catch (error) {
    console.error("Lỗi khi tạo mã chia sẻ:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi tạo link chia sẻ." },
      { status: 500 },
    );
  }
}

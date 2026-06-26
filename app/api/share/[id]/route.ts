import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { SharePayload } from "@/types/detective";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Không tìm thấy ID chia sẻ." },
        { status: 400 },
      );
    }

    const sharedData = await storage.get<SharePayload>(`share:${id}`);

    if (!sharedData) {
      return NextResponse.json(
        { error: "Đoạn chat đã hết hạn hoặc không tồn tại." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      shareId: id,
      message: sharedData.message,
      result: sharedData.result,
    });
  } catch (error) {
    console.error("Lỗi khi truy xuất dữ liệu chia sẻ:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra trên server." },
      { status: 500 },
    );
  }
}

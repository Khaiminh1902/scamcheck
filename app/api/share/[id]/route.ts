import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import SharedResult from "@/models/SharedResult";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "Không tìm thấy ID chia sẻ." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const sharedData = await SharedResult.findOne({ shareId: id }).lean();

    if (!sharedData) {
      return NextResponse.json(
        { error: "Đoạn chat đã hết hạn hoặc không tồn tại." },
        { status: 404 }
      );
    }

    return NextResponse.json(sharedData);
  } catch (error) {
    console.error("Lỗi khi truy xuất dữ liệu chia sẻ:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra trên server." },
      { status: 500 }
    );
  }
}

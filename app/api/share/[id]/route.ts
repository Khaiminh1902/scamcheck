import { NextResponse } from "next/server";
import { getDb } from "@/lib/sqlite";

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

    const db = await getDb();

    // Tự động dọn rác trước khi query
    await db.run(`DELETE FROM shared_results WHERE created_at <= datetime('now', '-1 day')`);

    const sharedData = await db.get(`SELECT * FROM shared_results WHERE share_id = ?`, [id]);

    if (!sharedData) {
      return NextResponse.json(
        { error: "Đoạn chat đã hết hạn hoặc không tồn tại." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      shareId: sharedData.share_id,
      message: sharedData.message,
      result: JSON.parse(sharedData.result),
    });
  } catch (error) {
    console.error("Lỗi khi truy xuất dữ liệu chia sẻ:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra trên server." },
      { status: 500 }
    );
  }
}

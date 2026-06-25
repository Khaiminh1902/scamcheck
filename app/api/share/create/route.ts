import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getDb } from "@/lib/sqlite";

export async function POST(req: Request) {
  try {
    const { message, result } = await req.json();

    if (!message || !result) {
      return NextResponse.json(
        { error: "Vui lòng cung cấp đầy đủ message và result." },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Dọn dẹp rác: Xóa các bản ghi cũ hơn 24 giờ (86400 giây)
    // SQLite dùng 'now', '-1 day' tương đương với việc xóa bản ghi tạo ra quá 24h
    await db.run(`DELETE FROM shared_results WHERE created_at <= datetime('now', '-1 day')`);

    const shareId = uuidv4();
    const resultJson = JSON.stringify(result);

    await db.run(
      `INSERT INTO shared_results (share_id, message, result) VALUES (?, ?, ?)`,
      [shareId, message, resultJson]
    );

    return NextResponse.json({ shareId });
  } catch (error) {
    console.error("Lỗi khi tạo mã chia sẻ:", error);
    return NextResponse.json(
      { error: "Đã có lỗi xảy ra khi tạo link chia sẻ." },
      { status: 500 }
    );
  }
}

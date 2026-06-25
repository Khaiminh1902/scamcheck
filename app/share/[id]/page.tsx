import { notFound } from "next/navigation";
import { getDb } from "@/lib/sqlite";
import Link from "next/link";
import SharedResultClient from "./SharedResultClient";

export default async function SharedResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const db = await getDb();

  // Dọn dẹp bản ghi rác quá 24h
  await db.run(`DELETE FROM shared_results WHERE created_at <= datetime('now', '-1 day')`);

  const sharedData = await db.get(`SELECT * FROM shared_results WHERE share_id = ?`, [id]);

  if (!sharedData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Đoạn chat không tồn tại
          </h1>
          <p className="text-gray-600 mb-8">
            Đoạn chat này đã hết hạn (sau 24 giờ) hoặc đường dẫn không hợp lệ.
          </p>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Quay lại trang chủ ScamCheck
          </Link>
        </div>
      </div>
    );
  }

  const message = sharedData.message;
  const result = JSON.parse(sharedData.result);

  return <SharedResultClient message={message} result={result} />;
}

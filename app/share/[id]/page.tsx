import { notFound } from "next/navigation";
import { storage } from "@/lib/storage";
import Link from "next/link";
import SharedResultClient from "./SharedResultClient";

export default async function SharedResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sharedData = await storage.get<{ message: string; result: any }>(`share:${id}`);

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
  const result = sharedData.result;

  return <SharedResultClient message={message} result={result} />;
}

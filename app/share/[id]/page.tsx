import { storage } from "@/lib/storage";
import Link from "next/link";
import SharedResultClient from "./SharedResultClient";
import { SharePayload } from "@/types/detective";
import { FaTriangleExclamation } from "react-icons/fa6";

export default async function SharedResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const sharedData = await storage.get<SharePayload>(`share:${id}`);

  if (!sharedData) {
    return (
      <div className="min-h-screen bg-canvas flex items-center justify-center p-6 font-sans">
        <div className="bg-surface-card border border-hairline p-8 rounded-2xl shadow-xl max-w-md w-full text-center">
          <div className="mb-4 flex justify-center text-red-500">
            <FaTriangleExclamation className="h-14 w-14" />
          </div>
          <h1 className="text-2xl font-bold text-ink mb-2">
            Đoạn chat không tồn tại
          </h1>
          <p className="text-ink mb-8">
            Đoạn chat này đã hết hạn (sau 24 giờ) hoặc đường dẫn không hợp lệ.
          </p>
          <Link
            href="/"
            className="inline-block bg-primary text-on-dark font-bold py-3 px-6 rounded-xl hover:bg-primary-active transition-colors"
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

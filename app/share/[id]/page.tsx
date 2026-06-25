import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import SharedResult from "@/models/SharedResult";
import RiskBadge from "@/app/components/level";
import Image from "next/image";
import ThamTu from "../../../public/tt.png";
import TamLy from "../../../public/tl.png";
import Link from "next/link";

export default async function SharedResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectToDatabase();
  const sharedData = await SharedResult.findOne({ shareId: id }).lean();

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

  const { message, result } = sharedData as any;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 font-sans pb-12">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6 shadow-md mb-8">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-black tracking-tight">ScamCheck</h1>
          <Link
            href="/"
            className="text-blue-100 hover:text-white text-sm font-bold bg-blue-700 px-4 py-2 rounded-lg"
          >
            Tự kiểm tra tin nhắn
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="bg-blue-50 text-blue-800 p-4 rounded-xl mb-6 text-sm md:text-base border border-blue-200">
          ℹ️ <strong>Lưu ý:</strong> Đây là kết quả phân tích được chia sẻ bởi một người khác. Dữ liệu này sẽ tự động bị xóa sau 24 giờ kể từ lúc tạo.
        </div>

        {/* Message */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gray-50 border-b border-gray-100 p-4 md:p-6 flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">
              Tin nhắn đáng ngờ
            </h2>
            <RiskBadge level={result.riskLevel} />
          </div>
          <div className="p-4 md:p-6 text-gray-800 text-lg md:text-xl italic">
            "{message}"
          </div>
        </div>

        {/* Tham Tu */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8 mb-6">
          <h2 className="mb-4 text-xl font-bold flex items-center gap-2 text-gray-800 border-b border-gray-100 pb-4">
            <Image src={ThamTu} alt="Tham Tu" height={24} width={72} style={{ width: "auto", height: "auto" }} />
            Phân tích kỹ thuật từ thám tử
          </h2>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Dấu hiệu lừa đảo
            </h3>
            {result.scamSigns.length === 0 ? (
              <p className="text-gray-600 italic">Không tìm thấy dấu hiệu lừa đảo rõ ràng.</p>
            ) : (
              <ul className="space-y-4">
                {result.scamSigns.map((sign: any, index: number) => (
                  <li key={index} className="flex gap-3">
                    <span className="shrink-0 text-xl">🚩</span>
                    <div>
                      <p className="font-bold text-red-700 text-base mb-1">
                        {sign.title}
                      </p>
                      <p className="text-gray-700 leading-relaxed text-sm">
                        {sign.details}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              Hành động đề xuất
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec: string, index: number) => (
                <li key={index} className="flex gap-3 items-start">
                  <span className="shrink-0 text-green-600 mt-1">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  </span>
                  <span className="text-gray-700 leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Co tam ly */}
        {result.psychologyAdvice && (
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold flex items-center gap-2 text-amber-900 border-b border-gray-100 pb-4">
              <Image src={TamLy} alt="Tam Ly" height={24} width={72} style={{ width: "auto", height: "auto" }} />
              Cô tâm lý
            </h2>
            <div className="text-gray-800 leading-relaxed space-y-4">
              {result.psychologyAdvice.split("\n").map((para: string, idx: number) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

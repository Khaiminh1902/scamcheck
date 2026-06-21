// app/components/UrlAnalysisPanel.tsx

import type { UrlAnalysisResult } from "@/types/detective";

type Props = {
  urls: UrlAnalysisResult[];
  isDarkMode: boolean;
};

function StatusBadge({
  type,
  isDarkMode,
}: {
  type: "suspicious" | "shortened" | "legitimate" | "unknown";
  isDarkMode: boolean;
}) {
  const config = {
    suspicious: {
      label: "⚠️ Nghi giả mạo",
      className: isDarkMode
        ? "bg-red-950 text-red-200 border-red-800"
        : "bg-red-100 text-red-700 border-red-300",
    },
    shortened: {
      label: "🔗 Rút gọn",
      className: isDarkMode
        ? "bg-yellow-950 text-yellow-200 border-yellow-800"
        : "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
    legitimate: {
      label: "✅ Chính thống",
      className: isDarkMode
        ? "bg-green-950 text-green-200 border-green-800"
        : "bg-green-100 text-green-700 border-green-300",
    },
    unknown: {
      label: "❓ Chưa xác minh",
      className: isDarkMode
        ? "bg-gray-800 text-gray-300 border-gray-700"
        : "bg-gray-100 text-gray-600 border-gray-300",
    },
  };

  const { label, className } = config[type];

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-sm font-bold ${className}`}
    >
      {label}
    </span>
  );
}

function getStatusType(
  url: UrlAnalysisResult
): "suspicious" | "shortened" | "legitimate" | "unknown" {
  if (url.isSuspicious) return "suspicious";
  if (url.isShortened) return "shortened";
  if (url.isLegitimate) return "legitimate";
  return "unknown";
}

export default function UrlAnalysisPanel({ urls, isDarkMode }: Props) {
  if (urls.length === 0) return null;

  const suspiciousCount = urls.filter((u) => u.isSuspicious).length;
  const shortenedCount = urls.filter((u) => u.isShortened).length;

  return (
    <div
      className={`rounded-xl border p-4 md:p-6 shadow-sm ${
        suspiciousCount > 0
          ? isDarkMode
            ? "border-red-800 bg-red-950/30"
            : "border-red-200 bg-red-50"
          : isDarkMode
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-white"
      }`}
    >
      <h2
        className={`mb-4 text-lg md:text-xl font-bold border-b pb-2 flex items-center gap-2 ${
          isDarkMode
            ? "border-gray-800 text-gray-100"
            : "border-gray-200 text-gray-800"
        }`}
      >
        🔗 Soi đường dẫn
        <span
          className={`text-sm font-medium ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          ({urls.length} đường dẫn)
        </span>
      </h2>

      {suspiciousCount > 0 && (
        <div
          className={`mb-4 rounded-lg border p-3 md:p-4 text-base md:text-lg font-bold ${
            isDarkMode
              ? "border-red-800 bg-red-950 text-red-200"
              : "border-red-300 bg-red-100 text-red-800"
          }`}
        >
          🚨 Phát hiện {suspiciousCount} đường dẫn nghi giả mạo! Bác tuyệt đối
          KHÔNG bấm vào.
        </div>
      )}

      {shortenedCount > 0 && suspiciousCount === 0 && (
        <div
          className={`mb-4 rounded-lg border p-3 md:p-4 text-base md:text-lg font-medium ${
            isDarkMode
              ? "border-yellow-800 bg-yellow-950 text-yellow-200"
              : "border-yellow-300 bg-yellow-100 text-yellow-800"
          }`}
        >
          ⚠️ Tin nhắn có đường dẫn rút gọn — không thể biết sẽ dẫn đến đâu.
          Bác nên cẩn trọng.
        </div>
      )}

      <div className="space-y-3">
        {urls.map((url, index) => {
          const statusType = getStatusType(url);

          return (
            <div
              key={index}
              className={`rounded-lg border p-3 md:p-4 ${
                statusType === "suspicious"
                  ? isDarkMode
                    ? "border-red-800 bg-red-950/50"
                    : "border-red-200 bg-red-50"
                  : statusType === "shortened"
                    ? isDarkMode
                      ? "border-yellow-800 bg-yellow-950/50"
                      : "border-yellow-200 bg-yellow-50"
                    : statusType === "legitimate"
                      ? isDarkMode
                        ? "border-green-800 bg-green-950/50"
                        : "border-green-200 bg-green-50"
                      : isDarkMode
                        ? "border-gray-700 bg-gray-800"
                        : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <StatusBadge type={statusType} isDarkMode={isDarkMode} />
                {url.matchedOrg && (
                  <span
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    {url.isLegitimate
                      ? `Thuộc ${url.matchedOrg}`
                      : `Giả mạo ${url.matchedOrg}`}
                  </span>
                )}
              </div>

              <p
                className={`text-base md:text-lg font-mono break-all ${
                  statusType === "suspicious"
                    ? isDarkMode
                      ? "text-red-300 line-through"
                      : "text-red-600 line-through"
                    : isDarkMode
                      ? "text-gray-200"
                      : "text-gray-800"
                }`}
              >
                {url.raw}
              </p>

              {url.reason && (
                <p
                  className={`mt-2 text-base md:text-lg ${
                    statusType === "suspicious"
                      ? isDarkMode
                        ? "text-red-200 font-bold"
                        : "text-red-700 font-bold"
                      : isDarkMode
                        ? "text-gray-400"
                        : "text-gray-600"
                  }`}
                >
                  {url.reason}
                </p>
              )}

              {statusType === "suspicious" && url.officialDomain && (
                <div
                  className={`mt-3 rounded-md border p-2 md:p-3 text-base md:text-lg ${
                    isDarkMode
                      ? "border-green-800 bg-green-950 text-green-200"
                      : "border-green-300 bg-green-100 text-green-800"
                  }`}
                >
                  ✅ Trang chính thức của {url.matchedOrg}:{" "}
                  <strong>{url.officialDomain}</strong>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

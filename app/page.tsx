"use client";

import { useState } from "react";
import RiskBadge from "./components/level";
import { DetectiveResult } from "@/types/detective";

export default function Page() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<DetectiveResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleCheck() {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
        }),
      });

      const data = await res.json();

      setResult(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  function highlightText(text: string, excerpt: string) {
    if (!excerpt) return text;

    return text.replace(
      excerpt,
      `<mark class="bg-yellow-300">${excerpt}</mark>`,
    );
  }

  return (
    <div className="flex h-screen flex-col bg-white text-black">
      {/* Main area */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-72.5 border-r border-gray-200 bg-gray-50 px-5 py-6">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Scam Check</h1>

            <button className="rounded-md p-1 text-gray-500 hover:bg-gray-200">
              ⧉
            </button>
          </div>

          <button
            className="mb-10 flex w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg hover:bg-gray-100"
            onClick={() => {
              setMessage("");
              setResult(null);
            }}
          >
            <span className="text-2xl">+</span>
            <span>Tìm kiếm mới</span>
          </button>

          <div>
            <h2 className="mb-4 px-1 text-sm font-semibold text-gray-500">
              Tìm kiếm gần đây
            </h2>

            <div className="space-y-1">
              <button className="w-full rounded-xl px-3 py-3 text-left text-base hover:bg-gray-200">
                Ví dụ 1
              </button>

              <button className="w-full rounded-xl px-3 py-3 text-left text-base hover:bg-gray-200">
                Ví dụ 2
              </button>

              <button className="w-full rounded-xl px-3 py-3 text-left text-base hover:bg-gray-200">
                Ví dụ 3
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto px-10 py-10">
          <div className="mx-auto w-full max-w-4xl">
            {/* Input */}
            <textarea
              className="h-72 w-full resize-none rounded border border-black p-5 text-lg outline-none"
              placeholder="Paste SMS, email hoặc đoạn chat cần kiểm tra..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              onClick={handleCheck}
              className="mt-6 rounded border border-black px-8 py-3 text-lg hover:bg-gray-100"
            >
              {loading ? "Checking..." : "Check"}
            </button>

            {/* Results */}
            {result && (
              <div className="mt-10 space-y-6">
                <RiskBadge level={result.riskLevel} />

                {/* Original text */}
                <div className="rounded border p-4">
                  <h2 className="mb-3 text-xl font-bold">Nội dung gốc</h2>

                  <div
                    dangerouslySetInnerHTML={{
                      __html: (result.scamSigns || []).reduce(
                        (current, sign) => highlightText(current, sign.excerpt),
                        message,
                      ),
                    }}
                  />
                </div>

                {/* Scam signs */}
                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Dấu hiệu lừa đảo</h2>

                  {result.scamSigns.length === 0 && (
                    <div>Không phát hiện dấu hiệu đáng ngờ.</div>
                  )}

                  {result.scamSigns.map((sign, index) => (
                    <div key={index} className="rounded border p-4">
                      <h3 className="font-bold text-red-600">{sign.title}</h3>

                      <p className="mt-2">{sign.explanation}</p>

                      <div className="mt-3 rounded bg-yellow-100 p-2">
                        &quot;{sign.excerpt}&quot;
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                <div className="rounded border p-4">
                  <h2 className="mb-3 text-xl font-bold">
                    Hành động khuyến nghị
                  </h2>

                  <ul className="ml-5 list-disc space-y-2">
                    {result.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="shrink-0 w-full border-t bg-white px-10 py-4 text-center text-sm text-gray-500">
        ScamCheck là công cụ giáo dục do nhóm học viên phát triển và không thay
        thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng.
      </footer>
    </div>
  );
}

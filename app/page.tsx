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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div>
        <textarea
          className="border w-full p-3 rounded"
          rows={8}
          placeholder="Paste SMS, email hoặc đoạn chat cần kiểm tra..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleCheck} className="border px-5 py-2 rounded mt-3">
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <>
          <RiskBadge level={result.riskLevel} />

          <div className="border rounded p-4">
            <h2 className="font-bold mb-3">Nội dung gốc</h2>

            <div
              dangerouslySetInnerHTML={{
                __html: (result.scamSigns || []).reduce(
                  (current, sign) => highlightText(current, sign.excerpt),
                  message,
                ),
              }}
            />
          </div>

          <div className="space-y-4">
            <h2 className="font-bold text-xl">Dấu hiệu lừa đảo</h2>

            {result.scamSigns.length === 0 && (
              <div>Không phát hiện dấu hiệu đáng ngờ.</div>
            )}

            {result.scamSigns.map((sign, index) => (
              <div key={index} className="border rounded p-4">
                <h3 className="font-bold text-red-600">{sign.title}</h3>

                <p className="mt-2">{sign.explanation}</p>

                <div className="bg-yellow-100 p-2 rounded mt-3">
                  &quot;{sign.excerpt}&quot;
                </div>
              </div>
            ))}
          </div>

          <div className="border rounded p-4">
            <h2 className="font-bold text-xl mb-3">Hành động khuyến nghị</h2>

            <ul className="list-disc ml-5 space-y-2">
              {result.recommendedActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div className="text-sm text-gray-500">
        ScamCheck là công cụ giáo dục do nhóm học viên phát triển và không thay
        thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng.
      </div>
    </div>
  );
}

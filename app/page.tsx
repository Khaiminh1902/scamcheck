"use client";

import { useState } from "react";
import RiskBadge from "@/components/level";
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

    // Tránh escape ký tự đặc biệt hoặc regex lỗi bằng cách thay thế trực tiếp chuỗi đơn giản
    const index = text.indexOf(excerpt);
    if (index === -1) return text;

    return (
      text.substring(0, index) +
      `<mark class="bg-amber-100 text-amber-950 border-b-2 border-amber-400 font-medium px-1 rounded-xs">${excerpt}</mark>` +
      text.substring(index + excerpt.length)
    );
  }

  return (
    <div className="min-h-screen bg-cosmos-bg text-cosmos-black flex flex-col font-sans selection:bg-cosmos-lavender/40 selection:text-cosmos-black">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-cosmos-light-gray h-16 flex items-center justify-between px-6 md:px-12 transition-all duration-300">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-cosmos-terracotta flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
            S
          </div>
          <span className="font-serif font-bold text-xl tracking-tight text-cosmos-black">
            ScamCheck
          </span>
        </div>
        <div className="text-xs text-cosmos-taupe font-medium uppercase tracking-wider hidden sm:block">
          Công cụ giáo dục nhận diện lừa đảo
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-10 md:py-16 space-y-10 pb-36">
        
        {/* Hero Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-serif font-normal text-cosmos-black leading-tight tracking-tight">
            Kiểm tra tin nhắn nghi ngờ
          </h1>
          <p className="text-base md:text-lg text-cosmos-dark-gray leading-relaxed font-serif">
            Dán nội dung tin nhắn SMS, Zalo, Messenger hoặc email bạn nhận được. ScamCheck sẽ giúp bạn phân tích các dấu hiệu bất thường.
          </p>
        </section>

        {/* Input Card */}
        <section className="bg-white rounded-2xl border border-cosmos-light-gray p-6 shadow-cosmos transition-all duration-300 hover:shadow-cosmos-hover">
          <div className="space-y-4">
            <textarea
              className="w-full bg-transparent border-0 border-b border-cosmos-light-gray focus:border-b-2 focus:border-cosmos-terracotta focus:bg-cosmos-terracotta/[0.01] focus:outline-hidden py-3 resize-none text-base md:text-lg transition-all duration-300 placeholder:text-cosmos-taupe/70 text-cosmos-black font-sans leading-relaxed"
              rows={6}
              placeholder="Dán hoặc nhập nội dung tin nhắn cần kiểm tra ở đây..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="flex justify-end pt-2">
              <button
                onClick={handleCheck}
                disabled={loading || !message.trim()}
                className={`h-[54px] px-8 rounded-full font-medium text-sm border flex items-center justify-center transition-all duration-300 cursor-pointer ${
                  !message.trim()
                    ? "bg-cosmos-light-gray text-cosmos-taupe border-cosmos-light-gray cursor-not-allowed opacity-50"
                    : "bg-cosmos-bg text-cosmos-terracotta border-black/12 hover:bg-cosmos-light-gray/60 hover:text-cosmos-rust hover:scale-[1.02] active:bg-cosmos-light-gray active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-cosmos-terracotta" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Đang phân tích...
                  </>
                ) : (
                  "Kiểm tra ngay"
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        {result && (
          <section className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between border-b border-cosmos-light-gray pb-4">
              <h2 className="text-2xl font-serif text-cosmos-black font-normal">
                Kết quả đánh giá
              </h2>
              <RiskBadge level={result.riskLevel} />
            </div>

            {/* Original Text Card */}
            <div className="bg-white rounded-2xl border border-cosmos-light-gray p-6 shadow-cosmos space-y-4">
              <h3 className="text-xs uppercase tracking-wider text-cosmos-taupe font-semibold font-sans">
                Nội dung tin nhắn gốc
              </h3>
              <div
                className="text-base md:text-lg text-cosmos-black leading-relaxed font-sans whitespace-pre-wrap"
                dangerouslySetInnerHTML={{
                  __html: result.scamSigns.reduce(
                    (current, sign) => highlightText(current, sign.excerpt),
                    message,
                  ),
                }}
              />
            </div>

            {/* Scam Signs Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-serif text-cosmos-black">
                Chi tiết dấu hiệu bất thường ({result.scamSigns.length})
              </h3>

              {result.scamSigns.length === 0 ? (
                <div className="bg-emerald-50/40 border border-emerald-100 text-emerald-800 p-6 rounded-2xl text-center text-base font-serif">
                  Không phát hiện dấu hiệu đáng ngờ đặc trưng của các hình thức lừa đảo phổ biến.
                </div>
              ) : (
                <div className="grid gap-4">
                  {result.scamSigns.map((sign, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-cosmos-light-gray p-6 shadow-cosmos border-l-4 border-l-cosmos-terracotta space-y-3 transition-all duration-300 hover:shadow-cosmos-hover"
                    >
                      <h4 className="font-serif font-bold text-lg text-cosmos-error-red">
                        {sign.title}
                      </h4>
                      <p className="text-cosmos-dark-gray text-sm md:text-base leading-relaxed">
                        {sign.explanation}
                      </p>
                      {sign.excerpt && (
                        <div className="bg-cosmos-bg border border-cosmos-light-gray/60 p-3 rounded-xl text-sm text-cosmos-charcoal font-serif italic relative mt-4">
                          <span className="absolute -top-2.5 left-4 bg-white px-2 text-[10px] font-sans font-medium uppercase tracking-wider text-cosmos-taupe not-italic border border-cosmos-light-gray/40 rounded-full">
                            Trích từ tin nhắn
                          </span>
                          &quot;{sign.excerpt}&quot;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recommended Actions Card */}
            <div className="bg-white rounded-2xl border border-cosmos-light-gray p-6 shadow-cosmos space-y-4">
              <h3 className="text-lg font-serif text-cosmos-black font-normal">
                Khuyến nghị an toàn
              </h3>
              <ul className="grid gap-3">
                {result.recommendedActions.map((action, index) => (
                  <li key={index} className="flex items-start text-sm md:text-base text-cosmos-dark-gray leading-relaxed">
                    <svg className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 w-full border-t border-cosmos-light-gray bg-white/85 backdrop-blur-md py-4 px-6 text-center text-xs text-cosmos-taupe z-40 transition-all duration-300">
        <div className="max-w-3xl mx-auto font-medium">
          ScamCheck là công cụ giáo dục do nhóm học viên phát triển và không thay
          thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng.
        </div>
      </footer>
    </div>
  );
}

"use client";

import { useState, useSyncExternalStore } from "react";
import RiskBadge from "./components/level";
import { DetectiveResult } from "@/types/detective";

type HistoryItem = {
  message: string;
  result: DetectiveResult;
  date: string;
};

const HISTORY_STORAGE_KEY = "scamcheck_history";
const EMPTY_HISTORY: HistoryItem[] = [];
let cachedHistoryValue: string | null = null;
let cachedHistory: HistoryItem[] = EMPTY_HISTORY;

const SAMPLE_MESSAGES = [
  {
    label: "Giả ngân hàng",
    tone: "Khóa tài khoản",
    text: "Tài khoản của bạn đã bị khoá. Vui lòng truy cập link http://vietconbank.vn để mở khoá",
  },
  {
    label: "Giả công an",
    tone: "Phạt nguội",
    text: "Đây là cục cảnh sát giao thông, bạn có 1 biên lai phạt nguội chưa nộp. Hãy bấm vào link và chuyển tiền sớm nhất có thể",
  },
  {
    label: "Trúng thưởng",
    tone: "Phí nhận quà",
    text: "Chúc mừng bạn đã trúng thưởng 1 chiếc điện thoại Iphone 17 Pro Max. Vui lòng chuyển khoản 1 triệu phí hồ sơ để nhận phần thưởng",
  },
];

function parseHistory(value: string | null): HistoryItem[] {
  if (!value) return [];

  try {
    return JSON.parse(value) as HistoryItem[];
  } catch (e) {
    console.error(e);
    return [];
  }
}

function getHistorySnapshot() {
  const value = localStorage.getItem(HISTORY_STORAGE_KEY);

  if (value === cachedHistoryValue) {
    return cachedHistory;
  }

  cachedHistoryValue = value;
  cachedHistory = parseHistory(value);

  return cachedHistory;
}

function getServerHistorySnapshot() {
  return EMPTY_HISTORY;
}

function subscribeToHistory(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("scamcheck-history", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("scamcheck-history", callback);
  };
}

function shortenText(text: string, wordLimit: number) {
  const words = text.trim().split(/\s+/);

  if (words.length <= wordLimit) {
    return text;
  }

  return `${words.slice(0, wordLimit).join(" ")}...`;
}

export default function Page() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<DetectiveResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const history = useSyncExternalStore(
    subscribeToHistory,
    getHistorySnapshot,
    getServerHistorySnapshot,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function saveToHistory(msg: string, res: DetectiveResult) {
    const newItem: HistoryItem = {
      message: msg,
      result: res,
      date: new Date().toLocaleString("vi-VN"),
    };
    const updated = [newItem, ...history];

    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("scamcheck-history"));
  }

  async function handleCheck() {
    setErrorMsg("");
    setResult(null);

    const trimmed = message.trim();
    if (!trimmed) {
      setErrorMsg("Vui lòng nhập nội dung tin nhắn cần kiểm tra");
      return;
    }

    if (trimmed.length > 5000) {
      setErrorMsg(
        "Tin nhắn quá dài (vượt quá 5000 ký tự). Vui lòng thử lại với đoạn tin nhắn ngắn hơn",
      );
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) {
        throw new Error("Không thể kết nối đến máy chủ");
      }

      const data = await res.json();

      if (data.error) {
        setErrorMsg(
          "AI từ chối phân tích nội dung hoặc gặp lỗi định dạng. Dưới đây là kết quả dự phòng",
        );
      }
      setResult(data);
      saveToHistory(trimmed, data);
    } catch (err) {
      console.log(err);
      setErrorMsg(
        "Mất kết nối mạng hoặc máy chủ gặp sự cố. Vui lòng kiểm tra lại đường truyền",
      );
    } finally {
      setLoading(false);
    }
  }

  function escapeHtml(text: string) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function highlightText(text: string, excerpt: string) {
    if (!excerpt) return text;
    const escapedExcerpt = escapeHtml(excerpt);

    return text.replace(
      escapedExcerpt,
      `<mark class="bg-yellow-300">${escapedExcerpt}</mark>`,
    );
  }

  function loadHistoryItem(item: HistoryItem) {
    setMessage(item.message);
    setResult(item.result);
    setErrorMsg("");
    setIsSidebarOpen(false);
  }

  return (
    <div className="flex flex-col min-h-screen md:h-screen bg-white text-black font-sans">
      <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50 shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <button
            className="cursor-pointer p-2 -ml-2 text-gray-600 hover:bg-gray-200 rounded-md"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
          <h1 className="text-2xl font-bold">Scam Check</h1>
        </div>
        <button
          className="cursor-pointer flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium hover:bg-gray-100"
          onClick={() => {
            setMessage("");
            setResult(null);
            setErrorMsg("");
          }}
        >
          <span>+ Mới</span>
        </button>
      </header>

      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-y-auto md:overflow-hidden relative">
        {isSidebarOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-[70vw] max-w-96 bg-gray-50 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-80 md:border-r md:border-gray-200 md:shadow-none md:z-auto shrink-0 overflow-hidden
        `}
        >
          <div className="flex mb-6 items-center justify-between px-5 pt-6 pb-2 border-b border-gray-200 md:border-none shrink-0">
            <h1 className="text-2xl font-bold hidden md:block">Scam Check</h1>
            <h1 className="text-xl font-bold md:hidden">Lịch sử</h1>
            <button
              className="cursor-pointer md:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-200 rounded-md"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div className="px-5 pb-6 flex flex-1 min-h-0 flex-col">
            <button
              className="cursor-pointer hidden md:flex mb-8 w-full items-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-4 text-lg font-medium hover:bg-gray-100"
              onClick={() => {
                setMessage("");
                setResult(null);
                setErrorMsg("");
              }}
            >
              <span className="text-2xl leading-none">+</span>
              <span>Tìm kiếm mới</span>
            </button>

            <div className="flex min-h-0 flex-1 flex-col">
              <h2 className="mb-4 px-1 text-base font-semibold text-gray-600 uppercase tracking-wider">
                Lịch sử tìm kiếm ({history.length})
              </h2>

              <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-4 -mr-4">
                {history.length === 0 && (
                  <p className="px-1 text-gray-500 text-lg">Chưa có lịch sử.</p>
                )}
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => loadHistoryItem(item)}
                    className="cursor-pointer w-full rounded-xl px-4 py-3 text-left hover:bg-gray-200 border border-transparent hover:border-gray-300 transition-colors"
                  >
                    <p className="text-lg font-medium truncate">
                      {item.message}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">{item.date}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-5 py-6 md:px-10 md:py-10 order-1 md:order-2 md:overflow-y-auto relative">
          <div className="mx-auto w-full max-w-4xl">
            <div className="mb-5 rounded-xl border border-gray-200 bg-gray-50 p-3 md:mb-6 md:p-5">
              <div className="mb-3 flex flex-col gap-1 md:mb-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Thử nhanh
                  </p>
                  <h2 className="text-base font-bold text-gray-900 md:text-xl">
                    Tin nhắn mẫu để thử nghiệm
                  </h2>
                </div>
              </div>

              <div className="grid min-w-0 gap-2 md:gap-3 md:grid-cols-3">
                {SAMPLE_MESSAGES.map((btn, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setMessage(btn.text);
                      setResult(null);
                      setErrorMsg("");
                    }}
                    className="group min-w-0 cursor-pointer overflow-hidden rounded-lg border border-gray-200 bg-white px-3 py-2 text-left shadow-sm transition-colors hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-4"
                  >
                    <span className="hidden md:mb-2 md:inline-flex rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 group-hover:bg-white">
                      {btn.tone}
                    </span>
                    <span className="block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold text-gray-900 md:text-lg">
                      {btn.label}
                    </span>
                    <span className="mt-0.5 block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 md:mt-1 md:line-clamp-2 md:whitespace-normal md:text-sm md:wrap-anywhere">
                      <span className="md:hidden">
                        {shortenText(btn.text, 6)}
                      </span>
                      <span className="hidden md:inline">{btn.text}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <textarea
              className="h-40 md:h-64 w-full resize-none rounded-xl border border-gray-300 p-4 md:p-5 text-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm"
              placeholder="Dán tin SMS, email hoặc đoạn chat cần kiểm tra vào đây..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {errorMsg && (
              <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-lg border border-red-200">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCheck}
                disabled={loading}
                className="cursor-pointer rounded-xl bg-black text-white px-8 py-4 text-xl font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-colors w-full md:w-auto shadow-md"
              >
                {loading ? "Đang phân tích..." : "Kiểm tra rủi ro"}
              </button>
            </div>

            {loading && (
              <div className="mt-10 p-6 md:p-10 flex flex-col items-center justify-center space-y-4 rounded-xl border border-gray-200 bg-gray-50">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-lg md:text-xl font-medium text-gray-600 text-center">
                  Thám tử đang soi tin nhắn, xin bác chờ chút ...
                </p>
              </div>
            )}

            {result && !loading && (
              <div className="mt-10 space-y-6 md:space-y-8 animate-in fade-in duration-500">
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                  <span className="text-xl md:text-2xl font-bold">
                    Mức độ rủi ro:
                  </span>
                  <RiskBadge level={result.riskLevel} />
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                  <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
                    Nội dung đã phân tích
                  </h2>
                  <div
                    className="text-base md:text-lg leading-relaxed text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: (result.scamSigns || []).reduce(
                        (current, sign) => highlightText(current, sign.excerpt),
                        escapeHtml(message),
                      ),
                    }}
                  />
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 md:p-6 shadow-sm">
                  <h2 className="mb-4 text-lg md:text-xl font-bold text-gray-800 border-b pb-2">
                    Phân tích kỹ thuật từ thám tử
                  </h2>

                  <div className="space-y-4">
                    <h3 className="text-base md:text-lg font-bold text-gray-800">
                      Dấu hiệu lừa đảo phát hiện được
                    </h3>

                    {result.scamSigns.length === 0 && (
                      <div className="p-4 bg-green-50 text-green-700 rounded-xl text-base md:text-lg">
                        ✅ Không phát hiện dấu hiệu lừa đảo rõ ràng. Tuy nhiên,
                        bác vẫn nên cẩn trọng
                      </div>
                    )}

                    {result.scamSigns.map((sign, index) => (
                      <div
                        key={index}
                        className="rounded-xl border border-red-200 bg-red-50 p-4 md:p-5"
                      >
                        <h4 className="text-lg md:text-xl font-bold text-red-600 mb-2">
                          🚩 {sign.title}
                        </h4>
                        <p className="text-base md:text-lg text-gray-700 mb-3 md:mb-4">
                          {sign.explanation}
                        </p>

                        {sign.excerpt && (
                          <div className="rounded-lg bg-yellow-100 p-3 text-base md:text-lg border border-yellow-200 text-gray-800 italic">
                            &quot;{sign.excerpt}&quot;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4 md:p-5">
                    <h3 className="mb-3 text-base md:text-lg font-bold text-blue-800">
                      Hành động bác nên làm tiếp theo
                    </h3>
                    <ul className="ml-5 md:ml-6 list-disc space-y-2 md:space-y-3 text-base md:text-lg text-blue-900 marker:text-blue-500">
                      {result.recommendedActions.map((action, index) => (
                        <li key={index}>{action}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {(result.psychologyAdvice || result.psychologyError) && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 md:p-6 shadow-sm">
                    <h2 className="mb-3 md:mb-4 text-lg md:text-xl font-bold text-amber-900">
                      Hiểu vì sao mình suýt tin
                    </h2>
                    {result.psychologyAdvice && (
                      <p className="text-base md:text-lg leading-relaxed text-amber-950">
                        {result.psychologyAdvice}
                      </p>
                    )}
                    {result.psychologyError && (
                      <p className="text-base md:text-lg leading-relaxed text-amber-900">
                        {result.psychologyError}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      <footer className="shrink-0 w-full border-t border-gray-200 bg-gray-50 px-5 md:px-10 py-5 text-center text-sm md:text-base text-gray-600 font-medium">
        ⚠️ <strong>Lưu ý:</strong> ScamCheck là công cụ giáo dục do nhóm học
        viên phát triển và không thay thế cảnh báo chính thức từ ngân hàng hoặc
        cơ quan chức năng. Khi nghi ngờ, hãy gọi số hotline trên thẻ ngân hàng!
      </footer>
    </div>
  );
}

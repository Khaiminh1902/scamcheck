"use client";

import { useState, useSyncExternalStore, useRef } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import RiskBadge from "./components/level";
import { DetectiveResult } from "@/types/detective";
import Link from "next/link";
import ThamTu from "../public/tt.png";
import TamLy from "../public/tl.png";
import Image from "next/image";
import WarningCard from "./components/WarningCard";
import html2canvas from "html2canvas";
import { QRCodeSVG } from "qrcode.react";

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
    text: "Đây là cục cảnh sát giao thông, bạn có 1 biên lai phạt nguội chưa nộp. Hãy bấm vào link https://de.pornhub.org/ và chuyển tiền sớm nhất có thể",
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [responderLoading, setResponderLoading] = useState(false);
  const [responderSteps, setResponderSteps] = useState<Array<{ stepNumber: number; action: string; quote: string }> | null>(null);
  const [responderError, setResponderError] = useState("");
  const history = useSyncExternalStore(
    subscribeToHistory,
    getHistorySnapshot,
    getServerHistorySnapshot,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | undefined>(undefined);
  const warningCardRef = useRef<HTMLDivElement>(null);
  const messageLength = message.length;
  const themeToggleLabel = isDarkMode
    ? "Chuyển sang giao diện sáng"
    : "Chuyển sang giao diện tối";

  async function handleSelectScenario(scenario: "none" | "link" | "money" | "otp") {
    setSelectedScenario(scenario);
    if (scenario === "none") {
      setResponderSteps(null);
      setResponderError("");
      return;
    }

    setResponderLoading(true);
    setResponderError("");
    setResponderSteps(null);

    try {
      const res = await fetch("/api/responder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageText: message, scenario }),
      });

      if (!res.ok) {
        throw new Error("Không thể kết nối đến máy chủ ứng cứu");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setResponderSteps(data.steps || []);
    } catch (err: any) {
      console.error(err);
      setResponderError(err.message || "Đã xảy ra lỗi khi liên hệ với Người ứng cứu.");
    } finally {
      setResponderLoading(false);
    }
  }

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

  function clearHistory() {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ lịch sử?")) {
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      window.dispatchEvent(new Event("scamcheck-history"));
    }
  }

  function deleteHistoryItem(index: number) {
    const updated = history.filter((_, i) => i !== index);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event("scamcheck-history"));
  }


  async function handleCheck() {
    setErrorMsg("");
    setResult(null);
    setSelectedScenario(null);
    setResponderSteps(null);
    setResponderError("");

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

  /*
  async function handleShareAndDownloadCard() {
    if (!warningCardRef.current || !result) return;
    try {
      setIsDownloading(true);

      // 1. Gửi dữ liệu lên Server để lấy Share ID
      let currentShareUrl = typeof window !== "undefined" ? window.location.origin : "https://scamcheck.vn";
      try {
        const res = await fetch('/api/share/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, result })
        });
        if (res.ok) {
          const data = await res.json();
          if (data.shareId) {
            const origin = typeof window !== "undefined" ? window.location.origin : "https://scamcheck.vn";
            currentShareUrl = `${origin}/share/${data.shareId}`;
            setShareUrl(currentShareUrl);
            // Đợi component cập nhật xong URL mới vào DOM
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        }
      } catch (apiErr) {
        console.error("Lỗi khi đẩy dữ liệu lên server:", apiErr);
        // Nếu lỗi, vẫn tiếp tục sinh ảnh với URL mặc định
      }

      // 2. Chụp ảnh thẻ cảnh báo
      const canvas = await html2canvas(warningCardRef.current, {
        scale: 2, // High resolution
        useCORS: true,
        backgroundColor: null,
        windowWidth: warningCardRef.current.scrollWidth,
        windowHeight: warningCardRef.current.scrollHeight,
        x: 0,
        y: 0,
      });
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `scamcheck-canh-bao-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Lỗi khi tạo ảnh thẻ cảnh báo:", err);
      alert("Đã có lỗi xảy ra khi tạo ảnh. Vui lòng thử lại sau.");
    } finally {
      setIsDownloading(false);
    }
  }
  */

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
      `<mark class="bg-accent-amber">${escapedExcerpt}</mark>`,
    );
  }

  function loadHistoryItem(item: HistoryItem) {
    setMessage(item.message);
    setResult(item.result);
    setErrorMsg("");
    setIsSidebarOpen(false);
    setSelectedScenario(null);
    setResponderSteps(null);
    setResponderError("");
  }

  return (
    <div
      className={`flex flex-col min-h-screen md:h-screen font-sans transition-colors ${isDarkMode ? "dark bg-zinc-900 text-zinc-100" : "bg-canvas text-ink"
        }`}
      style={{ colorScheme: isDarkMode ? "dark" : "light" }}
    >
      <header
        className={`md:hidden flex items-center justify-between px-5 py-4 border-b shrink-0 relative z-10 transition-colors ${isDarkMode
          ? "border-zinc-800/80 bg-zinc-900"
          : "border-hairline bg-canvas"
          }`}
      >
        <div className="flex items-center gap-3">
          <button
            className={`cursor-pointer p-2 -ml-2 rounded-md transition-colors ${isDarkMode
              ? "text-zinc-300 hover:bg-zinc-800"
              : "text-ink hover:bg-surface-soft"
              }`}
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
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-zinc-100" : "text-ink"}`}>Scam Check</h1>
          <button
            type="button"
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
            onClick={() => setIsDarkMode((current) => !current)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${isDarkMode
              ? "border-zinc-800/80 bg-zinc-900 text-yellow-300 hover:bg-zinc-800"
              : "border-hairline bg-canvas text-ink hover:bg-surface-soft"
              }`}
          >
            {isDarkMode ? (
              <FaSun className="h-4 w-4" />
            ) : (
              <FaMoon className="h-4 w-4" />
            )}
          </button>
        </div>
        <button
          className={`cursor-pointer flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${isDarkMode
            ? "border-zinc-800/80 bg-zinc-900 hover:bg-zinc-800"
            : "border-hairline bg-canvas hover:bg-surface-soft"
            }`}
          onClick={() => {
            setMessage("");
            setResult(null);
            setErrorMsg("");
            setSelectedScenario(null);
            setResponderSteps(null);
            setResponderError("");
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
          fixed inset-y-0 left-0 z-50 w-[70vw] max-w-96 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${isDarkMode ? "bg-zinc-900" : "bg-canvas"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-80 md:border-r ${isDarkMode ? "border-zinc-800/80" : "md:border-gray-200"} md:shadow-none md:z-auto shrink-0 overflow-hidden
        `}
        >
          <div
            className={`flex mb-6 items-center justify-between px-5 pt-6 pb-2 border-b md:border-none shrink-0 ${isDarkMode ? "border-zinc-800/80" : "border-hairline"
              }`}
          >
            <div className="hidden md:flex items-center gap-3">
              <h1 className={`text-2xl font-bold ${isDarkMode ? "text-zinc-100" : "text-ink"}`}>Scam Check</h1>
              <button
                type="button"
                aria-label={themeToggleLabel}
                title={themeToggleLabel}
                onClick={() => setIsDarkMode((current) => !current)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${isDarkMode
                  ? "border-zinc-800/80 bg-zinc-900 text-yellow-300 hover:bg-zinc-800"
                  : "border-hairline bg-canvas text-ink hover:bg-surface-soft"
                  }`}
              >
                {isDarkMode ? (
                  <FaSun className="h-4 w-4" />
                ) : (
                  <FaMoon className="h-4 w-4" />
                )}
              </button>
            </div>
            <h1 className={`text-xl font-bold md:hidden ${isDarkMode ? "text-zinc-100" : "text-ink"}`}>Lịch sử</h1>
            <button
              className={`cursor-pointer md:hidden p-2 -mr-2 rounded-md transition-colors ${isDarkMode
                ? "text-zinc-300 hover:bg-zinc-800"
                : "text-muted hover:bg-surface-soft"
                }`}
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
              className={`cursor-pointer hidden md:flex mb-3 w-full items-center gap-3 rounded-xl border px-5 py-4 text-lg font-medium transition-colors ${isDarkMode
                ? "border-zinc-800/80 bg-zinc-900 hover:bg-zinc-800"
                : "border-hairline bg-canvas hover:bg-surface-soft"
                }`}
              onClick={() => {
                setMessage("");
                setResult(null);
                setErrorMsg("");
                setSelectedScenario(null);
                setResponderSteps(null);
                setResponderError("");
              }}
            >
              <span className="text-2xl leading-none">+</span>
              <span>Tìm kiếm mới</span>
            </button>
            <Link
              className={`cursor-pointer hidden md:flex mb-3 w-full items-center gap-3 rounded-xl border px-5 py-4 text-lg font-medium transition-colors ${isDarkMode
                ? "border-zinc-800/80 bg-zinc-900 hover:bg-zinc-800"
                : "border-hairline bg-canvas hover:bg-surface-soft"
                }`}
              href="/luyentap"
            >
              Chế độ luyện tập
            </Link>
            <Link
              className={`cursor-pointer hidden md:flex mb-3 w-full items-center gap-3 rounded-xl border px-5 py-4 text-lg font-medium transition-colors ${isDarkMode
                ? "border-zinc-800/80 bg-zinc-900 hover:bg-zinc-800"
                : "border-hairline bg-canvas hover:bg-surface-soft"
                }`}
              href="/thuvien"
            >
              Thư viện lừa đảo
            </Link>
            <Link
              className={`cursor-pointer hidden md:flex mb-8 w-full items-center gap-3 rounded-xl border px-5 py-4 text-lg font-medium transition-colors ${isDarkMode
                ? "border-zinc-800/80 bg-zinc-900 hover:bg-zinc-800"
                : "border-hairline bg-canvas hover:bg-surface-soft"
                }`}
              href="/danhba"
            >
              Danh bạ khẩn cấp
            </Link>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="flex items-center justify-between mb-4 px-1">
                <h2
                  className={`text-base font-semibold uppercase tracking-wider ${isDarkMode ? "text-zinc-400" : "text-ink"
                    }`}
                >
                  Lịch sử tìm kiếm ({history.length})
                </h2>
                {history.length > 0 && (
                  <button
                    onClick={clearHistory}
                    className={`cursor-pointer text-sm px-2 py-1 rounded border transition-colors ${
                      isDarkMode
                        ? "border-error text-red-400 hover:bg-red-950/50 hover:text-red-300"
                        : "border-error text-red-600 hover:bg-red-50"
                    }`}
                  >
                    Xóa tất cả
                  </button>
                )}
              </div>

              <div
                className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-4 -mr-4"
                style={{
                  colorScheme: isDarkMode ? "dark" : "light",
                  scrollbarColor: isDarkMode
                    ? "#4b5563 #111827"
                    : "#d1d5db #f9fafb",
                }}
              >
                {history.length === 0 && (
                  <p
                    className={`px-1 text-lg ${isDarkMode ? "text-zinc-400" : "text-muted"
                      }`}
                  >
                    Chưa có lịch sử.
                  </p>
                )}
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start justify-between w-full rounded-xl border border-transparent transition-colors pr-2 ${isDarkMode
                      ? "hover:bg-zinc-800/50 hover:border-zinc-700"
                      : "hover:bg-surface-soft hover:border-hairline-soft"
                      }`}
                  >
                    <button
                      onClick={() => loadHistoryItem(item)}
                      className="flex-1 cursor-pointer text-left px-4 py-3 min-w-0"
                    >
                      <p className="text-lg font-medium truncate">
                        {item.message}
                      </p>
                      <p
                        className={`text-sm mt-1 ${isDarkMode ? "text-zinc-400" : "text-muted"
                          }`}
                      >
                        {item.date}
                      </p>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteHistoryItem(idx);
                      }}
                      title="Xóa đoạn chat này"
                      className={`cursor-pointer mt-3 p-2 rounded-lg transition-colors ${
                        isDarkMode
                          ? "text-zinc-400 hover:text-red-400 hover:bg-zinc-800"
                          : "text-muted hover:text-red-500 hover:bg-gray-300"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 px-5 py-6 md:px-10 md:py-10 order-1 md:order-2 md:overflow-y-auto relative">
          <div className="mx-auto w-full max-w-4xl">
            <div
              className={`mb-5 rounded-xl border p-3 md:mb-6 md:p-5 transition-colors ${isDarkMode
                ? "border-zinc-800/80 bg-zinc-900"
                : "border-hairline bg-canvas"
                }`}
            >
              <div className="mb-3 flex flex-col gap-1 md:mb-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p
                    className={`text-xs font-semibold uppercase tracking-wider ${isDarkMode ? "text-zinc-400" : "text-muted"
                      }`}
                  >
                    Thử nhanh
                  </p>
                  <h2
                    className={`text-base font-bold md:text-xl ${isDarkMode ? "text-zinc-100" : "text-ink"
                      }`}
                  >
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
                      setSelectedScenario(null);
                      setResponderSteps(null);
                      setResponderError("");
                    }}
                    className={`group min-w-0 cursor-pointer overflow-hidden rounded-lg border px-3 py-2 text-left shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 md:p-4 ${isDarkMode
                      ? "border-zinc-800/80 bg-zinc-900 hover:border-blue-500 hover:bg-zinc-800"
                      : "border-hairline bg-canvas hover:border-blue-300 hover:bg-blue-50"
                      }`}
                  >
                    <span
                      className={`hidden md:mb-2 md:inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${isDarkMode
                        ? "bg-blue-950 text-blue-200"
                        : "bg-surface-card text-blue-700 group-hover:bg-white"
                        }`}
                    >
                      {btn.tone}
                    </span>
                    <span
                      className={`block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold md:text-lg ${isDarkMode ? "text-zinc-100" : "text-ink"
                        }`}
                    >
                      {btn.label}
                    </span>
                    <span
                      className={`mt-0.5 block w-full min-w-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm md:mt-1 md:line-clamp-2 md:whitespace-normal md:text-sm md:wrap-anywhere ${isDarkMode ? "text-zinc-400" : "text-muted"
                        }`}
                    >
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
              className={`h-40 md:h-64 w-full resize-none rounded-xl border p-4 md:p-5 text-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-sm ${isDarkMode
                ? "border-zinc-800/80 bg-zinc-900 text-zinc-100 placeholder:text-gray-500"
                : "border-hairline bg-canvas text-ink placeholder:text-gray-500"
                }`}
              placeholder="Dán tin SMS, email hoặc đoạn chat cần kiểm tra vào đây..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <div className="mt-2 flex justify-end">
              <span
                className={`text-sm md:text-base ${messageLength > 5000
                  ? "text-red-500"
                  : isDarkMode
                    ? "text-zinc-400"
                    : "text-muted"
                  }`}
              >
                {messageLength}/5000
              </span>
            </div>

            {errorMsg && (
              <div
                className={`mt-4 p-4 rounded-lg text-lg border ${isDarkMode
                  ? "border-error bg-red-950 text-red-200"
                  : "border-error bg-error text-on-primary text-error"
                  }`}
              >
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="mt-6 flex justify-center">
              <button
                onClick={handleCheck}
                disabled={loading}
                className={`cursor-pointer rounded-xl px-8 py-4 text-xl font-bold transition-colors w-full md:w-auto shadow-md disabled:bg-gray-400 ${isDarkMode
                  ? "bg-red-600 text-zinc-100 hover:bg-primary-active"
                  : "bg-red-600 text-on-dark hover:bg-primary-active"
                  }`}
              >
                {loading ? "Đang phân tích..." : "Kiểm tra rủi ro"}
              </button>
            </div>

            {loading && (
              <div
                className={`mt-10 p-6 md:p-10 flex flex-col items-center justify-center space-y-4 rounded-xl border ${isDarkMode
                  ? "border-zinc-800/80 bg-zinc-900"
                  : "border-hairline bg-canvas"
                  }`}
              >
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p
                  className={`text-lg md:text-xl font-medium text-center ${isDarkMode ? "text-zinc-300" : "text-ink"
                    }`}
                >
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

                <div
                  className={`rounded-xl border p-4 md:p-6 shadow-sm ${isDarkMode
                    ? "border-zinc-800/80 bg-zinc-900"
                    : "border-hairline bg-canvas"
                    }`}
                >
                  <h2
                    className={`mb-3 md:mb-4 text-lg md:text-xl font-bold border-b pb-2 ${isDarkMode
                      ? "border-zinc-800/80 text-zinc-100"
                      : "border-hairline text-ink"
                      }`}
                  >
                    Nội dung đã phân tích
                  </h2>
                  <div
                    className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-zinc-300" : "text-ink"
                      }`}
                    dangerouslySetInnerHTML={{
                      __html: (result.scamSigns || []).reduce(
                        (current, sign) => highlightText(current, sign.excerpt),
                        escapeHtml(message),
                      ),
                    }}
                  />
                </div>

                <div
                  className={`rounded-xl border p-4 md:p-6 shadow-sm ${isDarkMode
                    ? "border-zinc-800/80 bg-zinc-900"
                    : "border-hairline bg-canvas"
                    }`}
                >
                  <h2
                    className={`mb-4 text-lg md:text-xl font-bold border-b pb-2 flex items-center gap-2 ${isDarkMode
                      ? "border-zinc-800/80 text-zinc-100"
                      : "border-hairline text-ink"
                      }`}
                  >
                    <Image src={ThamTu} alt="Tham Tu" height={20} width={60} style={{ width: "auto", height: "auto" }} />{" "}
                    Phân tích kỹ thuật từ thám tử
                  </h2>

                  <div className="space-y-4">
                    <h3
                      className={`text-base md:text-lg font-bold ${isDarkMode ? "text-zinc-100" : "text-ink"
                        }`}
                    >
                      Dấu hiệu lừa đảo phát hiện được
                    </h3>

                    {result.scamSigns.length === 0 && (
                      <div
                        className={`p-4 rounded-xl text-base md:text-lg ${isDarkMode
                          ? "bg-green-950 text-green-200"
                          : "bg-green-50 text-green-700"
                          }`}
                      >
                        ✅ Không phát hiện dấu hiệu lừa đảo rõ ràng. Tuy nhiên,
                        bác vẫn nên cẩn trọng
                      </div>
                    )}

                    {result.scamSigns.map((sign, index) => (
                      <div
                        key={index}
                        className={`rounded-xl border p-4 md:p-5 ${isDarkMode
                          ? "border-error bg-red-950"
                          : "border-error bg-red-50"
                          }`}
                      >
                        <h4
                          className={`text-lg md:text-xl font-bold mb-2 ${isDarkMode ? "text-red-300" : "text-red-600"
                            }`}
                        >
                          🚩 {sign.title}
                        </h4>
                        <p
                          className={`text-base md:text-lg mb-3 md:mb-4 ${isDarkMode ? "text-zinc-300" : "text-ink"
                            }`}
                        >
                          {sign.explanation}
                        </p>

                        {sign.excerpt && (
                          <div
                            className={`rounded-lg p-3 text-base md:text-lg border italic ${isDarkMode
                              ? "border-yellow-800 bg-yellow-950 text-yellow-100"
                              : "border-yellow-200 bg-yellow-100 text-ink"
                              }`}
                          >
                            &quot;{sign.excerpt}&quot;
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {result.recommendedActions?.length > 0 && (
                    <div
                      className={`mt-5 rounded-xl border p-4 md:p-5 ${isDarkMode
                        ? "border-primary bg-blue-950"
                        : "border-primary bg-surface-card"
                        }`}
                    >
                      <h3
                        className={`mb-3 text-base md:text-lg font-bold ${isDarkMode ? "text-blue-200" : "text-blue-800"
                          }`}
                      >
                        Hành động bác nên làm tiếp theo
                      </h3>

                      <ul
                        className={`ml-5 md:ml-6 list-disc space-y-2 md:space-y-3 text-base md:text-lg marker:text-blue-500 ${isDarkMode ? "text-blue-100" : "text-blue-900"
                          }`}
                      >
                        {result.recommendedActions.map((action, index) => (
                          <li key={index}>{action}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {(result.psychologyAdvice || result.psychologyError) && (
                  <div
                    className={`rounded-xl border p-4 md:p-6 shadow-sm ${isDarkMode
                      ? "border-amber-900 bg-amber-950"
                      : "border-amber-200 bg-amber-50"
                      }`}
                  >
                    <h2
                      className={`mb-3 md:mb-4 text-lg md:text-xl font-bold flex items-center gap-2 ${isDarkMode ? "text-amber-100" : "text-amber-900"
                        }`}
                    >
                      <Image src={TamLy} alt="Tam Ly" height={20} width={60} style={{ width: "auto", height: "auto" }} />{" "}
                      Cô tâm lý
                    </h2>
                    {result.psychologyAdvice && (
                      <p
                        className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-amber-100" : "text-amber-950"
                          }`}
                      >
                        {result.psychologyAdvice}
                      </p>
                    )}
                    {result.psychologyError && (
                      <p
                        className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-amber-200" : "text-amber-900"
                          }`}
                      >
                        {result.psychologyError}
                      </p>
                    )}
                  </div>
                )}

                {(result.riskLevel === "warning" || result.riskLevel === "danger") && (
                  <div
                    className={`rounded-xl border p-4 md:p-6 shadow-sm space-y-4 ${isDarkMode
                      ? "border-zinc-800/80 bg-zinc-900"
                      : "border-hairline bg-canvas"
                      }`}
                  >
                    <h2
                      className={`text-lg md:text-xl font-bold border-b pb-2 ${isDarkMode
                        ? "border-zinc-800/80 text-zinc-100"
                        : "border-hairline text-gray-850"
                        }`}
                    >
                      Bác đã làm gì rồi?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(result.scenarios && result.scenarios.length === 4 ? result.scenarios : [
                        { key: "none", label: "🛡️ Chưa làm gì cả" },
                        { key: "link", label: "🔗 Đã bấm vào đường dẫn" },
                        { key: "money", label: "💸 Đã chuyển khoản tiền" },
                        { key: "otp", label: "🔑 Đã cung cấp mã OTP / mật khẩu" }
                      ]).map((scen) => {
                        const isSelected = selectedScenario === scen.key;
                        const icon = scen.key === "none" ? "🛡️ " : scen.key === "link" ? "🔗 " : scen.key === "money" ? "💸 " : "🔑 ";
                        const cleanLabel = scen.label.startsWith("🛡️") || scen.label.startsWith("🔗") || scen.label.startsWith("💸") || scen.label.startsWith("🔑")
                          ? scen.label 
                          : `${icon}${scen.label}`;

                        return (
                          <button
                            key={scen.key}
                            disabled={selectedScenario !== null}
                            onClick={() => handleSelectScenario(scen.key as any)}
                            className={`cursor-pointer rounded-xl px-4 py-3 text-base md:text-lg font-medium transition-colors text-left border ${
                              isSelected
                                ? scen.key === "none"
                                  ? isDarkMode ? "bg-green-950 border-green-700 text-green-300" : "bg-green-50 border-green-200 text-green-700"
                                  : isDarkMode ? "bg-red-950 border-error text-red-300" : "bg-red-50 border-error text-error"
                                : isDarkMode ? "border-zinc-800/80 bg-zinc-900 hover:bg-zinc-800 text-zinc-100 disabled:opacity-50" : "border-hairline bg-canvas hover:bg-surface-soft text-gray-750 disabled:opacity-50"
                            }`}
                          >
                            {cleanLabel}
                          </button>
                        );
                      })}
                    </div>

                    {selectedScenario === "none" && (
                      <div
                        className={`mt-4 p-5 rounded-xl border text-base md:text-lg animate-in fade-in duration-300 ${isDarkMode
                          ? "border-green-900 bg-green-950 text-green-200"
                          : "border-green-200 bg-green-50 text-green-700"
                          }`}
                      >
                        🌟 Bác thật tuyệt vời và tỉnh táo. Không thao tác hay nhấp vào bất kỳ thông tin nào trong tin nhắn là cách tốt nhất để bảo vệ mình. Hãy tiếp tục nâng cao cảnh giác bác nhé.
                      </div>
                    )}

                    {responderLoading && (
                      <div className="mt-4 p-5 flex flex-col items-center justify-center space-y-3">
                        <div className="w-8 h-8 border-4 border-error border-t-transparent rounded-full animate-spin"></div>
                        <p className={`text-base md:text-lg ${isDarkMode ? "text-zinc-300" : "text-ink"}`}>
                          Đang liên hệ Người ứng cứu khẩn cấp...
                        </p>
                      </div>
                    )}

                    {responderError && (
                      <div
                        className={`mt-4 p-4 rounded-xl text-base md:text-lg border ${isDarkMode
                          ? "border-error bg-red-950 text-red-200"
                          : "border-error bg-error text-on-primary text-error"
                          }`}
                      >
                        ⚠️ {responderError}
                      </div>
                    )}

                    {responderSteps && responderSteps.length > 0 && (
                      <div className="mt-4 space-y-4 animate-in fade-in duration-300">
                        <div className={`p-4 rounded-xl border-l-4 ${
                          isDarkMode ? "bg-red-950/40 border-error" : "bg-red-50 border-error"
                        }`}>
                          <h3 className={`text-base md:text-lg font-bold mb-1 ${isDarkMode ? "text-red-300" : "text-red-750"}`}>
                            🚨 Kịch bản ứng cứu khẩn cấp từ Người ứng cứu
                          </h3>
                          <p className={`text-sm md:text-base ${isDarkMode ? "text-zinc-300" : "text-ink"}`}>
                            Bác cần làm chính xác và nhanh chóng các bước dưới đây để giảm thiểu tối đa thiệt hại.
                          </p>
                        </div>

                        <div className="space-y-3">
                          {responderSteps.map((step) => (
                            <div
                              key={step.stepNumber}
                              className={`p-4 md:p-5 rounded-xl border ${
                                isDarkMode ? "border-zinc-800/80 bg-gray-900/60" : "border-hairline bg-canvas"
                              }`}
                            >
                              <h4 className={`text-base md:text-lg font-bold flex gap-2 items-center mb-2 ${
                                isDarkMode ? "text-zinc-100" : "text-ink"
                              }`}>
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-on-dark text-xs font-bold shrink-0">
                                  {step.stepNumber}
                                </span>
                                {step.action}
                              </h4>
                              {step.quote && (
                                <div className={`p-3 rounded-lg border italic text-sm md:text-base ${
                                  isDarkMode ? "border-zinc-800/80 bg-zinc-900 text-zinc-300" : "border-hairline bg-canvas text-ink"
                                }`}>
                                  &ldquo;{step.quote}&rdquo;
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={handleShareAndDownloadCard}
                    disabled={isDownloading}
                    className={`flex items-center gap-2 cursor-pointer rounded-xl px-6 py-3 text-base md:text-lg font-bold transition-colors shadow-md disabled:opacity-70 ${
                      isDarkMode
                        ? "bg-green-700 text-zinc-100 hover:bg-green-600"
                        : "bg-green-600 text-on-dark hover:bg-green-700"
                    }`}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      ></path>
                    </svg>
                    {isDownloading ? "Đang tạo QR & Tải ảnh..." : "Tạo QR & Tải ảnh Thẻ Cảnh Báo"}
                  </button>
                </div>

                {shareUrl && (
                  <div className={`mt-8 p-6 border rounded-2xl flex flex-col items-center shadow-sm ${isDarkMode ? "bg-zinc-900 border-zinc-800/80" : "bg-canvas border-hairline"}`}>
                    <h3 className={`text-lg font-bold mb-4 ${isDarkMode ? "text-zinc-100" : "text-ink"}`}>Chia sẻ trực tuyến kết quả này</h3>
                    <div className="bg-canvas p-4 rounded-xl shadow-sm border border-hairline mb-4">
                      <QRCodeSVG value={shareUrl} size={180} />
                    </div>
                    <div className="flex items-center gap-2 w-full max-w-sm">
                      <input 
                        type="text" 
                        readOnly 
                        value={shareUrl} 
                        className={`flex-1 px-3 py-2.5 text-sm rounded-lg border focus:outline-none ${isDarkMode ? "bg-zinc-900 border-zinc-800/80 text-zinc-100" : "bg-canvas border-hairline text-ink"}`}
                      />
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(shareUrl);
                          alert("Đã sao chép đường dẫn!");
                        }}
                        className={`px-4 py-2.5 text-sm font-bold rounded-lg transition-colors ${isDarkMode ? "bg-primary hover:bg-primary-active text-zinc-100" : "bg-primary hover:bg-primary-active text-on-dark"}`}
                      >
                        Copy
                      </button>
                    </div>
                    <p className={`mt-3 text-sm text-center ${isDarkMode ? "text-zinc-400" : "text-muted"}`}>
                      Người thân của bạn có thể quét mã QR này hoặc truy cập đường dẫn trên để xem kết quả phân tích. (Tự động xoá sau 24 giờ)
                    </p>
                  </div>
                )}

                <div style={{ position: "fixed", left: "-9999px", top: 0, zIndex: -100, opacity: 0, pointerEvents: "none" }}>
                  <WarningCard ref={warningCardRef} message={message} result={result} url={shareUrl || (typeof window !== "undefined" ? window.location.origin : "https://scamcheck.vn")} />
                </div>
                */}
              </div>
            )}
          </div>
        </main>
      </div>

      <footer
        className={`shrink-0 w-full border-t px-5 md:px-10 py-5 text-center text-sm md:text-base font-medium transition-colors ${isDarkMode
          ? "border-zinc-800/80 bg-zinc-900 text-zinc-400"
          : "border-hairline bg-canvas text-ink"
          }`}
      >
        <div className="flex flex-col gap-2 items-center">
          <p>
            ⚠️ <strong>Lưu ý:</strong> ScamCheck là công cụ giáo dục do nhóm học
            viên phát triển và không thay thế cảnh báo chính thức từ ngân hàng hoặc
            cơ quan chức năng. Khi nghi ngờ, hãy gọi số hotline trên thẻ ngân hàng!
          </p>
          {process.env.NEXT_PUBLIC_APP_VERSION && (
            <p className="text-xs opacity-60 font-mono">Phiên bản: {process.env.NEXT_PUBLIC_APP_VERSION}</p>
          )}
        </div>
      </footer>
    </div>
  );
}

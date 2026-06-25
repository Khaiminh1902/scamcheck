"use client";

import { useState, useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";
import RiskBadge from "@/app/components/level";
import Image from "next/image";
import ThamTu from "../../../public/tt.png";
import TamLy from "../../../public/tl.png";
import Link from "next/link";
import { DetectiveResult } from "@/types/detective";

export default function SharedResultClient({ message, result }: { message: string, result: DetectiveResult }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const themeToggleLabel = isDarkMode ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối";

  return (
    <div
      className={`flex flex-col min-h-screen md:h-screen font-sans transition-colors ${isDarkMode ? "bg-gray-950 text-gray-100" : "bg-white text-black"
        }`}
      style={{ colorScheme: isDarkMode ? "dark" : "light" }}
    >
      <header
        className={`md:hidden flex items-center justify-between px-5 py-4 border-b shrink-0 relative z-10 transition-colors ${isDarkMode
            ? "border-gray-800 bg-gray-900"
            : "border-gray-200 bg-gray-50"
          }`}
      >
        <div className="flex items-center gap-3">
          <button
            className={`cursor-pointer p-2 -ml-2 rounded-md transition-colors ${isDarkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-200"
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
          <h1 className="text-2xl font-bold">Scam Check</h1>
          <button
            type="button"
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
            onClick={() => setIsDarkMode((current) => !current)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${isDarkMode
                ? "border-gray-700 bg-gray-800 text-yellow-300 hover:bg-gray-700"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
              }`}
          >
            {isDarkMode ? (
              <FaSun className="h-4 w-4" />
            ) : (
              <FaMoon className="h-4 w-4" />
            )}
          </button>
        </div>
        <Link
          href="/"
          className={`cursor-pointer flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${isDarkMode
              ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
              : "border-gray-300 bg-white hover:bg-gray-100"
            }`}
        >
          <span>Về trang chủ</span>
        </Link>
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
          fixed inset-y-0 left-0 z-50 w-[70vw] max-w-96 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:w-80 md:border-r ${isDarkMode ? "md:border-gray-800" : "md:border-gray-200"} md:shadow-none md:z-auto shrink-0 overflow-hidden
        `}
        >
          <div
            className={`flex mb-6 items-center justify-between px-5 pt-6 pb-2 border-b md:border-none shrink-0 ${isDarkMode ? "border-gray-800" : "border-gray-200"
              }`}
          >
            <div className="hidden md:flex items-center gap-3">
              <h1 className="text-2xl font-bold">Scam Check</h1>
              <button
                type="button"
                aria-label={themeToggleLabel}
                title={themeToggleLabel}
                onClick={() => setIsDarkMode((current) => !current)}
                className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${isDarkMode
                    ? "border-gray-700 bg-gray-800 text-yellow-300 hover:bg-gray-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {isDarkMode ? (
                  <FaSun className="h-4 w-4" />
                ) : (
                  <FaMoon className="h-4 w-4" />
                )}
              </button>
            </div>
            <h1 className="text-xl font-bold md:hidden">Menu</h1>
            <button
              className={`cursor-pointer md:hidden p-2 -mr-2 rounded-md transition-colors ${isDarkMode
                  ? "text-gray-300 hover:bg-gray-800"
                  : "text-gray-500 hover:bg-gray-200"
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
            <Link
              className={`cursor-pointer hidden md:flex mb-3 w-full items-center gap-3 rounded-xl border px-5 py-4 text-lg font-medium transition-colors bg-blue-600 text-white border-blue-500 hover:bg-blue-700`}
              href="/"
            >
              <span className="text-2xl leading-none">+</span>
              <span>Tự kiểm tra tin nhắn</span>
            </Link>
            <Link
              className={`cursor-pointer hidden md:flex mb-3 w-full items-center gap-3 rounded-xl border px-5 py-4 text-lg font-medium transition-colors ${isDarkMode
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                  : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
              href="/luyentap"
            >
              Chế độ luyện tập
            </Link>
            <Link
              className={`cursor-pointer hidden md:flex mb-8 w-full items-center gap-3 rounded-xl border px-5 py-4 text-lg font-medium transition-colors ${isDarkMode
                  ? "border-gray-700 bg-gray-800 hover:bg-gray-700"
                  : "border-gray-300 bg-white hover:bg-gray-100"
                }`}
              href="/thuvien"
            >
              Thư viện lừa đảo
            </Link>

            <div className="flex min-h-0 flex-1 flex-col">
              <h2
                className={`mb-4 px-1 text-base font-semibold uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              >
                Thông tin chia sẻ
              </h2>

              <div
                className="min-h-0 flex-1 space-y-4 pr-4 -mr-4"
              >
                <p
                  className={`px-1 text-sm md:text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  Bạn đang xem một kết quả kiểm tra lừa đảo do người khác chia sẻ.
                </p>
                <p
                  className={`px-1 text-sm md:text-base leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                >
                  Kết quả này sẽ tự động được xóa đi sau 24 giờ kể từ lúc tạo để đảm bảo quyền riêng tư.
                </p>
              </div>
            </div>
          </div>
        </aside>

      <main className="flex-1 overflow-y-auto relative w-full">
        <div className="w-full max-w-4xl mx-auto px-4 py-8 md:px-8 pb-32">
          
          <div className={`p-4 rounded-xl mb-6 text-sm md:text-base border ${isDarkMode ? "bg-blue-900/30 text-blue-200 border-blue-800" : "bg-blue-50 text-blue-800 border-blue-200"}`}>
            ℹ️ <strong>Lưu ý:</strong> Đây là kết quả phân tích được chia sẻ bởi một người khác. Dữ liệu này sẽ tự động bị xóa sau 24 giờ kể từ lúc chia sẻ.
          </div>

          <div
            className={`rounded-2xl border p-4 md:p-6 mb-6 md:mb-8 shadow-sm ${isDarkMode
                ? "border-gray-800 bg-gray-900"
                : "border-gray-200 bg-gray-50"
              }`}
          >
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-inherit">
              <h2
                className={`text-sm md:text-base font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-500"
                  }`}
              >
                Tin nhắn đáng ngờ
              </h2>
              <RiskBadge level={result.riskLevel} />
            </div>
            <p
              className={`text-lg md:text-xl font-medium italic ${isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              "{message}"
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div
              className={`rounded-xl border p-4 md:p-6 shadow-sm ${isDarkMode
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
                }`}
            >
              <h2 className="mb-4 md:mb-6 text-xl md:text-2xl font-bold flex items-center gap-2">
                <Image src={ThamTu} alt="Tham Tu" height={24} width={72} style={{ width: "auto", height: "auto" }} />{" "}
                Phân tích kỹ thuật từ thám tử
              </h2>

              <div className="mb-6 md:mb-8">
                <h3
                  className={`mb-3 md:mb-4 text-sm md:text-base font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                >
                  Dấu hiệu lừa đảo
                </h3>
                {(!result.scamSigns || result.scamSigns.length === 0) ? (
                  <p
                    className={`italic text-base md:text-lg ${isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    Không có dấu hiệu đáng ngờ cụ thể nào được tìm thấy.
                  </p>
                ) : (
                  <ul className="space-y-4 md:space-y-6">
                    {result.scamSigns.map((sign, index) => (
                      <li key={index} className="flex gap-3">
                        <span className="shrink-0 text-xl md:text-2xl mt-0.5">
                          🚩
                        </span>
                        <div>
                          <p
                            className={`font-bold text-base md:text-lg mb-1 md:mb-2 ${isDarkMode ? "text-red-400" : "text-red-600"
                              }`}
                          >
                            {sign.title}
                          </p>
                          <p
                            className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                              }`}
                          >
                            {sign.explanation}
                          </p>
                          {sign.excerpt && (
                            <div
                              className={`rounded-lg p-3 mt-3 text-base md:text-lg border italic ${isDarkMode
                                ? "border-yellow-800 bg-yellow-950 text-yellow-100"
                                : "border-yellow-200 bg-yellow-100 text-gray-800"
                                }`}
                            >
                              "{sign.excerpt}"
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {result.recommendedActions && result.recommendedActions.length > 0 && (
                <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-inherit">
                  <h3
                    className={`mb-3 md:mb-4 text-sm md:text-base font-bold uppercase tracking-wider ${isDarkMode ? "text-gray-400" : "text-gray-500"
                      }`}
                  >
                    Hành động đề xuất
                  </h3>
                  <ul
                    className={`list-disc ml-5 md:ml-6 space-y-2 md:space-y-3 text-base md:text-lg marker:text-green-500 ${isDarkMode ? "text-green-100" : "text-green-900"
                      }`}
                  >
                    {result.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {result.psychologyAdvice && (
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
                <p
                  className={`text-base md:text-lg leading-relaxed ${isDarkMode ? "text-amber-100" : "text-amber-950"
                    }`}
                >
                  {result.psychologyAdvice}
                </p>
              </div>
            )}
            
            <div className="flex justify-center mt-8">
               <Link href="/" className={`w-full max-w-sm text-center block cursor-pointer rounded-xl px-6 py-4 text-base md:text-lg font-bold transition-colors shadow-md ${isDarkMode ? "bg-blue-700 text-white hover:bg-blue-600" : "bg-blue-600 text-white hover:bg-blue-700"}`}>
                  Thử kiểm tra tin nhắn của bạn ngay
               </Link>
            </div>
          </div>
        </div>
      </main>
      </div>

      <footer
        className={`shrink-0 w-full border-t px-5 md:px-10 py-5 text-center text-sm md:text-base font-medium transition-colors ${isDarkMode
            ? "border-gray-800 bg-gray-900 text-gray-400"
            : "border-gray-200 bg-gray-50 text-gray-600"
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

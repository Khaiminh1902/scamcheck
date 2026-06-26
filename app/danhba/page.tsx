"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaMoon, FaSun, FaPhone, FaCopy, FaCheck } from "react-icons/fa6";
import hotlines from "../data/hotlines.json";
import { useThemeMode } from "../components/useThemeMode";

type HotlineItem = {
  name: string;
  phone: string;
  type: string;
};

export default function HotlinePage() {
  const { isDarkMode, setIsDarkMode, themeToggleLabel } = useThemeMode();
  const [filterType, setFilterType] = useState<"all" | "authority_police" | "bank">("all");
  const [copiedPhone, setCopiedPhone] = useState<string | null>(null);

  const handleCopy = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const filteredHotlines = hotlines.filter((item: HotlineItem) => {
    if (filterType === "all") return true;
    if (filterType === "authority_police") {
      return item.type === "authority" || item.type === "police";
    }
    return item.type === "bank";
  });

  return (
    <div
      className={`flex flex-col min-h-screen font-sans transition-colors ${
        isDarkMode ? "bg-dark-elevated text-dark-text" : "bg-canvas text-ink"
      }`}
      style={{ colorScheme: isDarkMode ? "dark" : "light" }}
    >
      <header
        className={`flex items-center justify-between px-5 py-4 border-b shrink-0 relative z-10 transition-colors ${
          isDarkMode ? "border-dark-border bg-dark-elevated" : "border-hairline bg-surface-card"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-muted hover:bg-surface-soft"
            }`}
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Quay lại Trang chủ</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold hidden sm:block">
            Danh bạ khẩn cấp
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold sm:hidden">Danh bạ khẩn cấp</h1>
          <button
            type="button"
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
            onClick={() => setIsDarkMode((current) => !current)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${
              isDarkMode
                ? "border-dark-border bg-dark-soft text-yellow-300 hover:bg-zinc-700"
                : "border-hairline bg-surface-card text-ink hover:bg-surface-soft"
            }`}
          >
            {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 md:px-10 md:py-8 max-w-5xl mx-auto w-full">
        <div className="mb-6 md:mb-8">
          <h2 className={`text-lg md:text-xl font-bold mb-4 ${isDarkMode ? "text-dark-text" : "text-ink"}`}>
            Phân loại theo nhóm
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setFilterType("all")}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors cursor-pointer ${
                filterType === "all"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "bg-dark-soft text-dark-text-muted hover:bg-zinc-700 border border-dark-border"
                  : "bg-surface-card text-muted hover:bg-surface-soft border border-hairline"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilterType("authority_police")}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors cursor-pointer ${
                filterType === "authority_police"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "bg-dark-soft text-dark-text-muted hover:bg-zinc-700 border border-dark-border"
                  : "bg-surface-card text-muted hover:bg-surface-soft border border-hairline"
              }`}
            >
              Cơ quan & Công an
            </button>
            <button
              onClick={() => setFilterType("bank")}
              className={`px-5 py-2.5 rounded-full text-sm md:text-base font-semibold transition-colors cursor-pointer ${
                filterType === "bank"
                  ? "bg-blue-600 text-white"
                  : isDarkMode
                  ? "bg-dark-soft text-dark-text-muted hover:bg-zinc-700 border border-dark-border"
                  : "bg-surface-card text-muted hover:bg-surface-soft border border-hairline"
              }`}
            >
              Ngân hàng
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {filteredHotlines.map((item: HotlineItem, index) => {
            const isCopied = copiedPhone === item.phone;
            const badgeColor =
              item.type === "authority"
                ? isDarkMode ? "bg-amber-950/50 text-amber-300 border-amber-800" : "bg-amber-50 text-amber-700 border-amber-200"
                : item.type === "police"
                ? isDarkMode ? "bg-red-950/50 text-red-300 border-red-800" : "bg-red-50 text-red-700 border-red-200"
                : isDarkMode ? "bg-blue-950/50 text-blue-300 border-blue-800" : "bg-blue-50 text-blue-700 border-blue-200";

            const badgeLabel =
              item.type === "authority" ? "Cơ quan" : item.type === "police" ? "Công an" : "Ngân hàng";

            return (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isDarkMode
                    ? "border-dark-border bg-dark-elevated hover:border-zinc-500"
                    : "border-hairline bg-surface-card hover:border-gray-300 shadow-sm"
                }`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeColor}`}>
                      {badgeLabel}
                    </span>
                  </div>
                  <h3 className={`text-lg md:text-xl font-bold mb-4 ${isDarkMode ? "text-gray-100" : "text-gray-900"}`}>
                    {item.name}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t pt-4 mt-2 border-dashed border-gray-300 dark:border-gray-800">
                  <span className="text-xl font-extrabold tracking-wide text-blue-600 dark:text-blue-400">
                    {item.phone}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(item.phone)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isDarkMode
                        ? "border-dark-border hover:bg-dark-soft text-dark-text-muted hover:text-dark-text"
                        : "border-hairline hover:bg-surface-soft text-muted hover:text-ink"
                      }`}
                      title="Sao chép số điện thoại"
                    >
                      {isCopied ? <FaCheck className="w-4 h-4 text-green-500" /> : <FaCopy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`tel:${item.phone}`}
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold transition-colors cursor-pointer"
                    >
                      <FaPhone className="w-3.5 h-3.5" />
                      <span>Gọi</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

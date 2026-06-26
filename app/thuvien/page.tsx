"use client";

import { useState } from "react";
import Link from "next/link";
import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa6";
import { SCAM_LIBRARY, SCAM_CATEGORIES, ScamCategory } from "../data/scam-library";

export default function LibraryPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ScamCategory | "all">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const themeToggleLabel = isDarkMode
    ? "Chuyển sang giao diện sáng"
    : "Chuyển sang giao diện tối";

  const filteredLibrary =
    selectedCategory === "all"
      ? SCAM_LIBRARY
      : SCAM_LIBRARY.filter((item) => item.category === selectedCategory);

  return (
    <div
      className={`flex flex-col min-h-screen font-sans transition-colors ${
        isDarkMode ? "dark bg-zinc-900 text-zinc-100" : "bg-canvas text-ink"
      }`}
      style={{ colorScheme: isDarkMode ? "dark" : "light" }}
    >
      <header
        className={`flex items-center justify-between px-5 py-4 border-b shrink-0 relative z-10 transition-colors ${
          isDarkMode ? "border-zinc-800/80 bg-zinc-900" : "border-hairline bg-canvas"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "text-zinc-300 hover:bg-zinc-800"
                : "text-ink hover:bg-surface-soft"
            }`}
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Quay lại Trang chủ</span>
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold hidden sm:block">
            Thư viện lừa đảo
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold sm:hidden">Thư viện lừa đảo</h1>
          <button
            type="button"
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
            onClick={() => setIsDarkMode((current) => !current)}
            className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition-colors ${
              isDarkMode
                ? "border-zinc-800/80 bg-zinc-900 text-yellow-300 hover:bg-zinc-800"
                : "border-hairline bg-canvas text-ink hover:bg-surface-soft"
            }`}
          >
            {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 md:px-10 md:py-8 max-w-5xl mx-auto w-full">
        <div className="mb-6 md:mb-8">
          <h2 className={`text-lg md:text-xl font-bold mb-4 ${isDarkMode ? "text-zinc-100" : "text-ink"}`}>
            Phân loại theo nhóm
          </h2>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {Object.entries(SCAM_CATEGORIES).map(([key, label]) => {
              const isActive = selectedCategory === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as ScamCategory | "all")}
                  className={`px-4 py-2 rounded-full text-sm md:text-base font-medium transition-colors cursor-pointer ${
                    isActive
                      ? isDarkMode
                        ? "bg-primary text-zinc-100"
                        : "bg-primary text-on-dark"
                      : isDarkMode
                      ? "bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800/80"
                      : "bg-canvas text-ink hover:bg-surface-soft border border-hairline"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-4 md:gap-6">
          {filteredLibrary.map((item) => {
            const isExpanded = expandedId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all overflow-hidden ${
                  isDarkMode
                    ? "border-zinc-800/80 bg-zinc-900"
                    : "border-hairline bg-canvas shadow-sm"
                }`}
              >
                <button
                  className="w-full px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between text-left focus:outline-none cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? "text-blue-400" : "text-primary"
                      }`}
                    >
                      {SCAM_CATEGORIES[item.category]}
                    </span>
                    <h3
                      className={`text-lg md:text-xl font-bold ${
                        isDarkMode ? "text-zinc-100" : "text-ink"
                      }`}
                    >
                      {item.name}
                    </h3>
                  </div>
                  <div
                    className={`mt-2 sm:mt-0 p-2 rounded-full transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    } ${
                      isDarkMode
                        ? "bg-zinc-900 text-zinc-400"
                        : "bg-canvas text-muted"
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
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {isExpanded && (
                  <div
                    className={`px-5 pb-5 pt-2 border-t ${
                      isDarkMode ? "border-zinc-800/80" : "border-hairline"
                    }`}
                  >
                    <p
                      className={`text-base md:text-lg mb-4 leading-relaxed ${
                        isDarkMode ? "text-zinc-300" : "text-ink"
                      }`}
                    >
                      {item.description}
                    </p>
                    <div
                      className={`rounded-lg p-4 text-base md:text-lg italic relative ${
                        isDarkMode
                          ? "bg-yellow-950/30 border border-yellow-900 text-yellow-200"
                          : "bg-yellow-50 border border-yellow-200 text-ink"
                      }`}
                    >
                      <span className="absolute -top-3 left-4 bg-inherit px-2 text-xs font-bold uppercase tracking-wider text-yellow-600 dark:text-yellow-500">
                        Ví dụ thực tế
                      </span>
                      &quot;{item.example}&quot;
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          
          {filteredLibrary.length === 0 && (
            <div className={`p-8 text-center rounded-xl border ${
              isDarkMode ? "border-zinc-800/80 text-zinc-400" : "border-hairline text-muted"
            }`}>
              Không tìm thấy kiểu lừa đảo nào trong danh mục này.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

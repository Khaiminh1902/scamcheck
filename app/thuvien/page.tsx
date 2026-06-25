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
        isDarkMode ? "bg-gray-950 text-gray-100" : "bg-gray-50 text-black"
      }`}
      style={{ colorScheme: isDarkMode ? "dark" : "light" }}
    >
      <header
        className={`flex items-center justify-between px-5 py-4 border-b shrink-0 relative z-10 transition-colors ${
          isDarkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors ${
              isDarkMode
                ? "text-gray-300 hover:bg-gray-800"
                : "text-gray-600 hover:bg-gray-100"
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
                ? "border-gray-700 bg-gray-800 text-yellow-300 hover:bg-gray-700"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {isDarkMode ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
          </button>
        </div>
      </header>

      <main className="flex-1 px-4 py-6 md:px-10 md:py-8 max-w-5xl mx-auto w-full">
        <div className="mb-6 md:mb-8">
          <h2 className={`text-lg md:text-xl font-bold mb-4 ${isDarkMode ? "text-gray-200" : "text-gray-800"}`}>
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
                        ? "bg-blue-600 text-white"
                        : "bg-blue-600 text-white"
                      : isDarkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
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
                    ? "border-gray-800 bg-gray-900"
                    : "border-gray-200 bg-white shadow-sm"
                }`}
              >
                <button
                  className="w-full px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between text-left focus:outline-none cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  <div className="flex flex-col gap-1 pr-4">
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {SCAM_CATEGORIES[item.category]}
                    </span>
                    <h3
                      className={`text-lg md:text-xl font-bold ${
                        isDarkMode ? "text-gray-100" : "text-gray-900"
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
                        ? "bg-gray-800 text-gray-400"
                        : "bg-gray-100 text-gray-500"
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
                      isDarkMode ? "border-gray-800" : "border-gray-100"
                    }`}
                  >
                    <p
                      className={`text-base md:text-lg mb-4 leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {item.description}
                    </p>
                    <div
                      className={`rounded-lg p-4 text-base md:text-lg italic relative ${
                        isDarkMode
                          ? "bg-yellow-950/30 border border-yellow-900 text-yellow-200"
                          : "bg-yellow-50 border border-yellow-200 text-gray-800"
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
              isDarkMode ? "border-gray-800 text-gray-400" : "border-gray-200 text-gray-500"
            }`}>
              Không tìm thấy kiểu lừa đảo nào trong danh mục này.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaBars,
  FaChevronRight,
  FaHouse,
  FaMoon,
  FaSun,
  FaTriangleExclamation,
  FaXmark,
} from "react-icons/fa6";
import RiskBadge from "@/app/components/level";
import { useThemeMode } from "@/app/components/useThemeMode";
import { DetectiveResult } from "@/types/detective";
import ThamTu from "../../../public/tt.png";
import TamLy from "../../../public/tl.png";
import { useState } from "react";

type SharedResultClientProps = {
  message: string;
  result: DetectiveResult;
};

export default function SharedResultClient({
  message,
  result,
}: SharedResultClientProps) {
  const { isDarkMode, setIsDarkMode, themeToggleLabel } = useThemeMode();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className={`flex min-h-screen flex-col font-sans transition-colors ${
        isDarkMode ? "bg-dark-elevated text-dark-text" : "bg-canvas text-ink"
      }`}
      style={{ colorScheme: isDarkMode ? "dark" : "light" }}
    >
      <header
        className={`flex items-center justify-between border-b px-5 py-4 transition-colors md:hidden ${
          isDarkMode
            ? "border-dark-border bg-dark-elevated"
            : "border-hairline bg-surface-card"
        }`}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            className={`rounded-lg p-2 transition-colors ${
              isDarkMode
                ? "text-dark-text-muted hover:bg-dark-soft"
                : "text-muted hover:bg-surface-soft"
            }`}
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaBars className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-semibold text-ink dark:text-dark-text">
            ScamCheck
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={themeToggleLabel}
            title={themeToggleLabel}
            onClick={() => setIsDarkMode((current) => !current)}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              isDarkMode
                ? "border-dark-border bg-dark-soft text-amber-300 hover:bg-zinc-700"
                : "border-hairline bg-surface-card text-ink hover:bg-surface-soft"
            }`}
          >
            {isDarkMode ? (
              <FaSun className="h-4 w-4" />
            ) : (
              <FaMoon className="h-4 w-4" />
            )}
          </button>
          <Link
            href="/"
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              isDarkMode
                ? "border-dark-border bg-dark-soft hover:bg-zinc-700"
                : "border-hairline bg-surface-card hover:bg-surface-soft"
            }`}
          >
            <FaHouse className="h-4 w-4" />
            <span>Trang chủ</span>
          </Link>
        </div>
      </header>

      <div className="relative flex flex-1 flex-col md:flex-row">
        {isSidebarOpen && (
          <button
            type="button"
            aria-label="Đóng menu"
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed inset-y-0 left-0 z-50 flex w-[78vw] max-w-80 flex-col border-r shadow-2xl transition-transform duration-300 md:relative md:w-80 md:translate-x-0 md:shadow-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } ${
            isDarkMode
              ? "border-dark-border bg-dark-elevated"
              : "border-hairline bg-surface-card"
          }`}
        >
          <div className="flex items-center justify-between px-5 pb-3 pt-6 md:pb-5">
            <div>
              <h2 className="text-xl font-semibold text-ink dark:text-dark-text">
                Kết quả chia sẻ
              </h2>
              <p className="mt-1 text-sm text-muted dark:text-dark-text-muted">
                Xem lại phân tích đã được gửi cho bạn.
              </p>
            </div>
            <button
              type="button"
              className={`rounded-lg p-2 transition-colors md:hidden ${
                isDarkMode
                  ? "text-dark-text-muted hover:bg-dark-soft"
                  : "text-muted hover:bg-surface-soft"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <FaXmark className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-3 px-5 pb-6">
            <Link
              href="/"
              className="flex items-center justify-between rounded-xl bg-primary px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-primary-active"
            >
              <span>Tự kiểm tra tin nhắn</span>
              <FaChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/luyentap"
              className={`rounded-xl border px-4 py-3 text-base font-medium transition-colors ${
                isDarkMode
                  ? "border-dark-border bg-dark-soft hover:bg-zinc-700"
                  : "border-hairline bg-surface-card hover:bg-surface-soft"
              }`}
            >
              Chế độ luyện tập
            </Link>
            <Link
              href="/thuvien"
              className={`rounded-xl border px-4 py-3 text-base font-medium transition-colors ${
                isDarkMode
                  ? "border-dark-border bg-dark-soft hover:bg-zinc-700"
                  : "border-hairline bg-surface-card hover:bg-surface-soft"
              }`}
            >
              Thư viện lừa đảo
            </Link>
            <div
              className={`mt-2 rounded-2xl border p-4 text-sm leading-relaxed ${
                isDarkMode
                  ? "border-blue-900 bg-blue-950/40 text-blue-100"
                  : "border-blue-200 bg-blue-50 text-blue-900"
              }`}
            >
              Kết quả này sẽ tự động được xóa sau 24 giờ để bảo vệ quyền riêng
              tư của người chia sẻ.
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            <div
              className={`rounded-2xl border p-4 text-sm md:text-base ${
                isDarkMode
                  ? "border-blue-900 bg-blue-950/40 text-blue-100"
                  : "border-blue-200 bg-blue-50 text-blue-900"
              }`}
            >
              <div className="flex items-start gap-3">
                <FaTriangleExclamation className="mt-0.5 h-5 w-5 shrink-0" />
                <p>
                  Đây là kết quả phân tích được người khác chia sẻ. Dữ liệu này
                  chỉ mang tính tham khảo và sẽ hết hạn tự động.
                </p>
              </div>
            </div>

            <section
              className={`rounded-2xl border p-5 shadow-sm md:p-6 ${
                isDarkMode
                  ? "border-dark-border bg-dark-elevated"
                  : "border-hairline bg-surface-card"
              }`}
            >
              <div className="mb-4 flex items-center justify-between border-b border-inherit pb-4">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted dark:text-dark-text-muted">
                  Tin nhắn đã kiểm tra
                </h2>
                <RiskBadge level={result.riskLevel} />
              </div>
              <p className="text-lg italic leading-relaxed text-body dark:text-dark-text">
                &ldquo;{message}&rdquo;
              </p>
            </section>

            <section
              className={`rounded-2xl border p-5 shadow-sm md:p-6 ${
                isDarkMode
                  ? "border-dark-border bg-dark-elevated"
                  : "border-hairline bg-surface-card"
              }`}
            >
              <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold text-ink dark:text-dark-text">
                <Image
                  src={ThamTu}
                  alt="Thám tử"
                  width={72}
                  height={24}
                  style={{ width: "auto", height: "auto" }}
                />
                Phân tích kỹ thuật
              </h2>

              {result.scamSigns.length === 0 ? (
                <p className="rounded-xl bg-green-50 px-4 py-3 text-base text-green-700 dark:bg-green-950/40 dark:text-green-200">
                  Không phát hiện dấu hiệu lừa đảo rõ ràng, nhưng vẫn nên xác
                  minh nguồn gửi trước khi thao tác.
                </p>
              ) : (
                <div className="space-y-4">
                  {result.scamSigns.map((sign, index) => (
                    <div
                      key={index}
                      className={`rounded-xl border p-4 ${
                        isDarkMode
                          ? "border-red-900 bg-red-950/40"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <h3 className="text-lg font-semibold text-red-600 dark:text-red-300">
                        {sign.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-body dark:text-dark-text">
                        {sign.explanation}
                      </p>
                      {sign.excerpt && (
                        <div
                          className={`mt-3 rounded-lg border px-4 py-3 italic ${
                            isDarkMode
                              ? "border-amber-800 bg-amber-950 text-amber-100"
                              : "border-amber-200 bg-amber-50 text-amber-900"
                          }`}
                        >
                          &ldquo;{sign.excerpt}&rdquo;
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {result.recommendedActions.length > 0 && (
                <div
                  className={`mt-6 rounded-xl border p-4 ${
                    isDarkMode
                      ? "border-emerald-900 bg-emerald-950/40"
                      : "border-emerald-200 bg-emerald-50"
                  }`}
                >
                  <h3 className="mb-3 text-base font-semibold text-emerald-800 dark:text-emerald-200">
                    Hành động nên làm tiếp theo
                  </h3>
                  <ul className="ml-5 list-disc space-y-2 text-base text-emerald-900 dark:text-emerald-100">
                    {result.recommendedActions.map((action, index) => (
                      <li key={index}>{action}</li>
                    ))}
                  </ul>
                </div>
              )}
            </section>

            {(result.psychologyAdvice || result.psychologyError) && (
              <section
                className={`rounded-2xl border p-5 shadow-sm md:p-6 ${
                  isDarkMode
                    ? "border-amber-900 bg-amber-950/40"
                    : "border-amber-200 bg-amber-50"
                }`}
              >
                <h2 className="mb-4 flex items-center gap-3 text-xl font-semibold text-amber-900 dark:text-amber-100">
                  <Image
                    src={TamLy}
                    alt="Cô tâm lý"
                    width={60}
                    height={20}
                    style={{ width: "auto", height: "auto" }}
                  />
                  Góc nhìn tâm lý
                </h2>
                {result.psychologyAdvice && (
                  <p className="text-base leading-relaxed text-amber-950 dark:text-amber-100">
                    {result.psychologyAdvice}
                  </p>
                )}
                {result.psychologyError && (
                  <p className="text-base leading-relaxed text-amber-900 dark:text-amber-200">
                    {result.psychologyError}
                  </p>
                )}
              </section>
            )}

            <div className="flex justify-center">
              <Link
                href="/"
                className="w-full max-w-sm rounded-xl bg-primary px-6 py-4 text-center text-base font-semibold text-white transition-colors hover:bg-primary-active"
              >
                Kiểm tra tin nhắn của bạn
              </Link>
            </div>
          </div>
        </main>
      </div>

      <footer
        className={`border-t px-5 py-5 text-center text-sm font-medium transition-colors ${
          isDarkMode
            ? "border-dark-border bg-dark-elevated text-dark-text-muted"
            : "border-hairline bg-surface-card text-muted"
        }`}
      >
        <p>
          ScamCheck là công cụ hỗ trợ giáo dục. Khi nghi ngờ có rủi ro thật,
          hãy liên hệ ngân hàng hoặc cơ quan chức năng qua số chính thức.
        </p>
      </footer>
    </div>
  );
}

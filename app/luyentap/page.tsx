"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaMoon, FaSun } from "react-icons/fa6";
import { PRACTICE_SCENARIOS } from "../data/practice-scenarios";
import ThamTu from "../../public/tt.png";
import TamLy from "../../public/tl.png";
import { useThemeMode } from "../components/useThemeMode";

export default function PracticePage() {
  const { isDarkMode, setIsDarkMode, themeToggleLabel } = useThemeMode();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);

  const currentScenario = PRACTICE_SCENARIOS[currentIndex];

  const handleAnswer = (isScamChoice: boolean) => {
    if (hasAnswered) return;
    
    setHasAnswered(true);
    setUserChoice(isScamChoice);
    
    if (isScamChoice === currentScenario.isScam) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < PRACTICE_SCENARIOS.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setHasAnswered(false);
      setUserChoice(null);
    } else {
      setIsFinished(true);
    }
  };

  const resetPractice = () => {
    setCurrentIndex(0);
    setScore(0);
    setHasAnswered(false);
    setIsFinished(false);
    setUserChoice(null);
  };

  return (
    <div
      className={`flex flex-col min-h-screen font-sans transition-colors ${
        isDarkMode ? "dark bg-dark-elevated text-dark-text" : "bg-canvas text-ink"
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
                ? "text-dark-text-muted hover:bg-dark-soft"
                : "text-ink hover:bg-surface-soft"
            }`}
          >
            <FaArrowLeft />
            <span className="hidden sm:inline">Quay lại Trang chủ</span>
          </Link>
          <h1 className={`text-xl sm:text-2xl font-bold hidden sm:block ${isDarkMode ? "text-dark-text" : "text-ink"}`}>
            Chế độ luyện tập
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <h1 className={`text-xl font-bold sm:hidden ${isDarkMode ? "text-dark-text" : "text-ink"}`}>Luyện tập</h1>
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

      <main className="flex-1 px-4 py-6 md:px-10 md:py-10 max-w-4xl mx-auto w-full flex flex-col">
        {!isFinished ? (
          <div className="flex-1 flex flex-col">
            <div className="mb-6 flex justify-between items-center">
              <span className={`text-lg font-semibold ${isDarkMode ? "text-dark-text-muted" : "text-muted"}`}>
                Câu {currentIndex + 1} / {PRACTICE_SCENARIOS.length}
              </span>
              <span className={`text-lg font-semibold ${isDarkMode ? "text-blue-400" : "text-primary"}`}>
                Điểm: {score}
              </span>
            </div>

            <div className="w-full bg-surface-soft dark:bg-gray-800 rounded-full h-2 mb-8">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / PRACTICE_SCENARIOS.length) * 100}%` }}
              ></div>
            </div>

            <div className={`rounded-2xl border p-6 md:p-8 mb-8 shadow-sm flex-1 flex flex-col justify-center ${
              isDarkMode ? "border-dark-border bg-dark-elevated" : "border-hairline bg-surface-card"
            }`}>
              <h2 className="text-sm font-bold uppercase tracking-wider mb-4 text-muted dark:text-gray-400">
                Tin nhắn mẫu:
              </h2>
              <p className={`text-xl md:text-2xl leading-relaxed font-medium mb-8 ${
                isDarkMode ? "text-dark-text" : "text-ink"
              }`}>
                &quot;{currentScenario.content}&quot;
              </p>

              {!hasAnswered ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                  <button
                    onClick={() => handleAnswer(false)}
                    className={`py-4 px-6 rounded-xl text-lg font-bold border-2 transition-all cursor-pointer ${
                      isDarkMode
                        ? "border-green-800 text-green-400 hover:bg-green-950/50 hover:border-green-600"
                        : "border-green-200 text-green-700 hover:bg-green-50 hover:border-green-400"
                    }`}
                  >
                    ✅ An toàn
                  </button>
                  <button
                    onClick={() => handleAnswer(true)}
                    className={`py-4 px-6 rounded-xl text-lg font-bold border-2 transition-all cursor-pointer ${
                      isDarkMode
                        ? "border-error text-red-400 hover:bg-red-950/50 hover:border-red-600"
                        : "border-error text-error hover:bg-red-50 hover:border-red-400"
                    }`}
                  >
                    🚩 Lừa đảo
                  </button>
                </div>
              ) : (
                <div className="mt-auto animate-in fade-in zoom-in duration-300">
                  <div className={`p-5 rounded-xl border-2 mb-6 ${
                    userChoice === currentScenario.isScam
                      ? isDarkMode ? "bg-green-950 border-green-800" : "bg-green-50 border-green-200"
                      : isDarkMode ? "bg-red-950 border-error" : "bg-red-50 border-error"
                  }`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">
                        {userChoice === currentScenario.isScam ? "🎉" : "❌"}
                      </span>
                      <h3 className={`text-xl font-bold ${
                        userChoice === currentScenario.isScam
                          ? isDarkMode ? "text-green-400" : "text-green-700"
                          : isDarkMode ? "text-red-400" : "text-error"
                      }`}>
                        {userChoice === currentScenario.isScam ? "Chính xác!" : "Sai rồi bác ơi!"}
                      </h3>
                    </div>
                    
                    <div className="flex gap-4 items-start mt-4 pt-4 border-t border-opacity-20 border-current">
                      <Image src={ThamTu} alt="Tham Tu" width={50} height={50} className="rounded-full bg-canvas dark:bg-gray-800 p-1 shrink-0" />
                      <div>
                        <p className={`font-semibold mb-1 ${isDarkMode ? "text-dark-text-muted" : "text-ink"}`}>
                          Đáp án đúng: <span className="uppercase">{currentScenario.isScam ? "Lừa đảo" : "An toàn"}</span>
                        </p>
                        <p className={`text-lg ${isDarkMode ? "text-dark-text-muted" : "text-ink"}`}>
                          {currentScenario.explanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    className="w-full py-4 rounded-xl text-xl font-bold bg-primary text-on-dark hover:bg-primary-active transition-colors shadow-md cursor-pointer"
                  >
                    {currentIndex < PRACTICE_SCENARIOS.length - 1 ? "Câu tiếp theo ➡️" : "Xem kết quả 🏆"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center animate-in slide-in-from-bottom-8 duration-500 py-10">
            <div className={`w-full max-w-2xl rounded-2xl border p-8 md:p-12 text-center shadow-lg ${
              isDarkMode ? "border-dark-border bg-dark-elevated" : "border-hairline bg-surface-card"
            }`}>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Kết quả luyện tập</h2>
              
              <div className="my-8 flex justify-center">
                <div className={`w-40 h-40 rounded-full flex items-center justify-center text-5xl font-bold border-8 ${
                  score >= 8 
                    ? "border-green-500 text-green-500" 
                    : score >= 5 
                      ? "border-yellow-500 text-yellow-500" 
                      : "border-error text-red-500"
                }`}>
                  {score}/{PRACTICE_SCENARIOS.length}
                </div>
              </div>

              <div className={`mt-8 p-6 rounded-xl border flex flex-col sm:flex-row items-center gap-6 text-left ${
                isDarkMode ? "bg-dark-soft border-dark-border" : "bg-surface-card border-primary"
              }`}>
                <Image src={TamLy} alt="Tam Ly" width={80} height={80} className="shrink-0" />
                <div>
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-dark-text" : "text-ink"}`}>
                    Cô Tâm Lý nhắn gửi:
                  </h3>
                  <p className={`text-lg ${isDarkMode ? "text-dark-text-muted" : "text-ink"}`}>
                    {score >= 8 
                      ? "Bác giỏi quá! Mắt nhìn tinh tường thế này thì khó có kẻ gian nào lừa được bác. Cứ giữ vững tinh thần cảnh giác này nhé!" 
                      : score >= 5 
                        ? "Bác làm khá tốt, nhưng vẫn còn chút nhầm lẫn nhỏ. Kẻ gian giờ tinh vi lắm, bác nhớ cẩn thận hơn và kiểm tra kỹ thông tin trước khi bấm nhé!" 
                        : "Kết quả chưa được tốt lắm bác ạ. Lừa đảo trên mạng giờ muôn hình vạn trạng, bác hãy dùng ScamCheck thường xuyên hoặc nhờ con cháu kiểm tra giúp để luôn an toàn nhé!"}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetPractice}
                  className={`py-4 px-8 rounded-xl text-lg font-bold border-2 transition-colors cursor-pointer ${
                    isDarkMode
                      ? "border-dark-border text-dark-text-muted hover:bg-dark-soft"
                      : "border-hairline text-ink hover:bg-surface-soft"
                  }`}
                >
                  🔄 Chơi lại
                </button>
                <Link
                  href="/"
                  className="py-4 px-8 rounded-xl text-lg font-bold bg-primary text-on-dark hover:bg-primary-active transition-colors shadow-md text-center"
                >
                  🏠 Về Trang chủ
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

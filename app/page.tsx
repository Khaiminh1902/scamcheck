"use client";

import { useState, useEffect } from "react";
import hotlines from "./data/hotlines.json";

interface ScamSign {
  phrase: string;
  explanation: string;
}

interface Reply {
  riskLevel: "SAFE" | "SUSPICIOUS" | "DANGEROUS";
  scamSigns: ScamSign[];
  recommendations: string[];
}

interface PsychologyReply {
  content: string;
}

interface EmergencyStep {
  title: string;
  action: string;
  template: string;
}

interface HistoryItem {
  id: string;
  timestamp: string;
  message: string;
  reply: Reply;
  psychologyReply?: PsychologyReply | null;
  emergencySituation?: string | null;
  emergencyReply?: { steps: EmergencyStep[] } | null;
  selectedBank?: string;
}

const TIN_MAU = {
  bank: "Vietcombank trân trọng thông báo: Tài khoản của quý khách hiện đang bị khoá tạm thời. Vui lòng bấm vào đường dẫn http://vietcornbank.com.vn/xac-thuc để cập nhật và mở khoá tài khoản khẩn cấp.",
  prize: "Chúc mừng số điện thoại của bạn đã may mắn trúng thưởng giải nhất trị giá 100 triệu đồng từ chương trình tri ân khách hàng. Vui lòng liên hệ số 19001234 hoặc truy cập trang web để nhận giải thưởng miễn phí ngay hôm nay!",
  police: "Bộ Công an thông báo: Số điện thoại và số căn cước của bạn liên quan đến đường dây buôn lậu ma tuý đang điều tra. Yêu cầu bạn chuyển toàn bộ số dư tài khoản tiết kiệm vào tài khoản kiểm sát an toàn để phục vụ kiểm tra khẩn cấp."
};

export default function Page() {
  const [message, setMessage] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [loading, setLoading] = useState(false);
  const [psychologyLoading, setPsychologyLoading] = useState(false);
  const [emergencyLoading, setEmergencyLoading] = useState(false);
  
  // Results
  const [reply, setReply] = useState<Reply | null>(null);
  const [psychologyReply, setPsychologyReply] = useState<PsychologyReply | null>(null);
  const [psychologyError, setPsychologyError] = useState<string | null>(null);
  const [emergencySituation, setEmergencySituation] = useState<string | null>(null);
  const [emergencyReply, setEmergencyReply] = useState<{ steps: EmergencyStep[] } | null>(null);
  const [emergencyError, setEmergencyError] = useState<string | null>(null);

  // App state
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [hoveredSignIndex, setHoveredSignIndex] = useState<number | null>(null);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>(null);

  // Load history from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("scamcheck_history");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  // Save scan to history
  const saveToHistory = (
    msg: string, 
    rep: Reply, 
    psych?: PsychologyReply | null,
    sit?: string | null,
    emRep?: { steps: EmergencyStep[] } | null,
    bank?: string
  ) => {
    try {
      const newItem: HistoryItem = {
        id: Math.random().toString(36).substring(2, 9),
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " " + new Date().toLocaleDateString("vi-VN"),
        message: msg,
        reply: rep,
        psychologyReply: psych,
        emergencySituation: sit,
        emergencyReply: emRep,
        selectedBank: bank
      };

      setHistory(prev => {
        const filtered = prev.filter(item => item.message !== msg); // Avoid duplicates
        const updated = [newItem, ...filtered].slice(0, 10); // Limit to 10
        localStorage.setItem("scamcheck_history", JSON.stringify(updated));
        return updated;
      });
      setActiveHistoryId(newItem.id);
    } catch (e) {
      console.error("Failed to save history", e);
    }
  };

  // Trigger check analysis (Thám tử + Cô tâm lý in sequence)
  const handleCheck = async () => {
    if (!message.trim()) {
      setErrorMsg("Bác ơi, vui lòng dán hoặc nhập nội dung tin nhắn cần kiểm tra nhé.");
      return;
    }
    if (message.length > 5000) {
      setErrorMsg("Bác ơi, tin nhắn quá dài (vượt quá 5.000 ký tự). Bác hãy tóm tắt hoặc dán phần nghi ngờ nhất nhé.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setReply(null);
    setPsychologyReply(null);
    setPsychologyError(null);
    setEmergencySituation(null);
    setEmergencyReply(null);
    setEmergencyError(null);
    setActiveHistoryId(null);

    try {
      // 1. Call Thám tử (Detect Mode)
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "detect", message })
      });

      if (!res.ok) {
        throw new Error("Không thể kết nối máy chủ AI. Bác vui lòng kiểm tra lại mạng mạng mạng nhé.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const detectResult = data.reply as Reply;
      setReply(detectResult);

      let psychResult: PsychologyReply | null = null;

      // 2. Call Cô tâm lý in sequence if suspect/dangerous (Cấp 3)
      if (detectResult.riskLevel === "SUSPICIOUS" || detectResult.riskLevel === "DANGEROUS") {
        setPsychologyLoading(true);
        try {
          const psychRes = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mode: "psychology", message })
          });
          if (psychRes.ok) {
            const psychData = await psychRes.json();
            psychResult = psychData.reply as PsychologyReply;
            setPsychologyReply(psychResult);
          } else {
            setPsychologyError("Cô tâm lý đang bận, vui lòng thử lại sau.");
          }
        } catch (e) {
          setPsychologyError("Cô tâm lý đang bận, vui lòng thử lại sau.");
        } finally {
          setPsychologyLoading(false);
        }
      }

      // Save initial result to history
      saveToHistory(message, detectResult, psychResult);

    } catch (error: any) {
      console.error(error);
      setErrorMsg(error.message || "Đã xảy ra lỗi không xác định. Bác vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // Trigger Emergency Action Plans (Người ứng cứu - Cấp 5)
  const handleEmergencySelect = async (situation: string) => {
    setEmergencySituation(situation);
    setEmergencyReply(null);
    setEmergencyError(null);

    if (situation === "none") {
      // No call to AI needed, just local praise
      // Update history record
      updateHistoryItem(activeHistoryId, { emergencySituation: situation, emergencyReply: null });
      return;
    }

    setEmergencyLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "emergency",
          situation,
          message,
          selectedBank
        })
      });

      if (!res.ok) {
        throw new Error("Không thể liên hệ Người ứng cứu. Hãy gọi trực tiếp số 113 hoặc 18001508.");
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      const emergencyData = data.reply as { steps: EmergencyStep[] };
      setEmergencyReply(emergencyData);

      // Update history record with emergency details
      updateHistoryItem(activeHistoryId, {
        emergencySituation: situation,
        emergencyReply: emergencyData,
        selectedBank
      });

    } catch (e: any) {
      setEmergencyError(e.message || "Không thể tải kịch bản ứng cứu. Vui lòng liên hệ hotline khẩn cấp bên dưới.");
    } finally {
      setEmergencyLoading(false);
    }
  };

  // Helper to update current history item properties (e.g. after choosing emergency action)
  const updateHistoryItem = (id: string | null, updates: Partial<HistoryItem>) => {
    if (!id) return;
    setHistory(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          return { ...item, ...updates };
        }
        return item;
      });
      localStorage.setItem("scamcheck_history", JSON.stringify(updated));
      return updated;
    });
  };

  // Load selected history item back into view
  const loadHistoryItem = (item: HistoryItem) => {
    setMessage(item.message);
    setReply(item.reply);
    setPsychologyReply(item.psychologyReply || null);
    setEmergencySituation(item.emergencySituation || null);
    setEmergencyReply(item.emergencyReply || null);
    setSelectedBank(item.selectedBank || "");
    setErrorMsg(null);
    setPsychologyError(null);
    setEmergencyError(null);
    setActiveHistoryId(item.id);
  };

  // Clear history
  const clearAllHistory = () => {
    setHistory([]);
    localStorage.removeItem("scamcheck_history");
    setActiveHistoryId(null);
  };

  // Text highlighting renderer
  const renderHighlightedText = (text: string, signs: ScamSign[]) => {
    if (!signs || signs.length === 0) return <span>{text}</span>;

    const phrases = signs
      .map(s => s.phrase)
      .filter(p => p && p.trim().length > 0)
      .sort((a, b) => b.length - a.length); // Longest first to prevent partial replacement bugs

    if (phrases.length === 0) return <span>{text}</span>;

    // Escape regex specials
    const escaped = phrases.map(p => p.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");

    const parts = text.split(regex);

    return (
      <p className="leading-relaxed font-sans text-cosmos-charcoal whitespace-pre-wrap">
        {parts.map((part, idx) => {
          const matchIndex = signs.findIndex(s => s.phrase.toLowerCase() === part.toLowerCase());
          if (matchIndex !== -1) {
            const isHovered = hoveredSignIndex === matchIndex;
            return (
              <mark
                key={idx}
                onMouseEnter={() => setHoveredSignIndex(matchIndex)}
                onMouseLeave={() => setHoveredSignIndex(null)}
                className={`transition-colors duration-200 cursor-pointer px-1 rounded-sm font-semibold select-none ${
                  isHovered ? "bg-amber-300 text-cosmos-off-black" : "bg-amber-100 text-cosmos-charcoal"
                }`}
                title="Rê chuột để xem giải thích"
              >
                {part}
              </mark>
            );
          }
          return <span key={idx}>{part}</span>;
        })}
      </p>
    );
  };

  // Copy text helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Đã sao chép câu mẫu! Bác có thể dán vào tin nhắn hoặc đọc khi gọi điện thoại.");
  };

  return (
    <div className="flex-1 flex flex-col font-serif bg-cosmos-off-white text-cosmos-black">
      
      {/* NAVIGATION BAR */}
      <header className="bg-white border-b border-cosmos-light-gray sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-cosmos-terracotta flex items-center justify-center text-white font-bold text-lg select-none">
              S
            </div>
            <h1 className="text-xl font-bold tracking-tight text-cosmos-black">ScamCheck</h1>
          </div>
          <div className="flex gap-4">
            <span className="text-xs font-sans text-cosmos-taupe uppercase tracking-widest border border-cosmos-taupe/20 px-2.5 py-1 rounded-full">
              Kính lão đắc thọ
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1200px] w-full mx-auto px-6 py-12 flex flex-col gap-12">
        
        {/* HERO TITLE */}
        <section className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-cosmos-black">
            Bảo vệ gia đình trước bẫy lừa trực tuyến
          </h2>
          <p className="text-base md:text-lg font-sans text-cosmos-dark-gray max-w-lg mx-auto leading-relaxed">
            Dán tin nhắn nghi ngờ từ SMS, Zalo hoặc Email để kiểm tra nhanh mức độ rủi ro, các dấu hiệu lừa đảo và cách ứng phó an toàn nhất.
          </p>
        </section>

        {/* MAIN CONTAINER: INPUT & HISTORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: CHECKER PANELS */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* BOX 1: INPUT MESSAGE */}
            <div className="bg-white rounded-2xl border border-cosmos-light-gray p-6 md:p-8 shadow-cosmos-card hover:shadow-cosmos-card-hover transition-all duration-300">
              <h3 className="text-lg font-semibold text-cosmos-black mb-4 font-serif">
                Bước 1: Nhập tin nhắn nghi ngờ
              </h3>
              
              {/* INPUT BOX */}
              <div className="relative group">
                <textarea
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="Dán nội dung tin nhắn hoặc email nghi ngờ vào đây (ví dụ: yêu cầu chuyển khoản khẩn cấp, trúng quà tặng, khoá thẻ ngân hàng...)"
                  rows={5}
                  className="w-full bg-transparent border-0 border-b border-black/20 text-cosmos-black font-sans text-base py-3 focus:outline-none focus:border-cosmos-terracotta focus:bg-cosmos-terracotta/[0.01] transition-all resize-none leading-relaxed placeholder-cosmos-taupe/80"
                />
              </div>

              {/* ACTION ROW */}
              <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* SAMPLE MESSAGES QUICK PICK */}
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs font-sans text-cosmos-dark-gray">Thử tin mẫu:</span>
                  <button
                    onClick={() => { setMessage(TIN_MAU.bank); setErrorMsg(null); }}
                    className="text-xs font-sans text-cosmos-terracotta bg-cosmos-off-white hover:bg-cosmos-terracotta/10 px-3 py-1.5 rounded-full border border-cosmos-light-gray hover:border-cosmos-terracotta/20 transition-all cursor-pointer"
                  >
                    🏦 Giả mạo Ngân hàng
                  </button>
                  <button
                    onClick={() => { setMessage(TIN_MAU.prize); setErrorMsg(null); }}
                    className="text-xs font-sans text-cosmos-terracotta bg-cosmos-off-white hover:bg-cosmos-terracotta/10 px-3 py-1.5 rounded-full border border-cosmos-light-gray hover:border-cosmos-terracotta/20 transition-all cursor-pointer"
                  >
                    🎁 Quà tặng trúng thưởng
                  </button>
                  <button
                    onClick={() => { setMessage(TIN_MAU.police); setErrorMsg(null); }}
                    className="text-xs font-sans text-cosmos-terracotta bg-cosmos-off-white hover:bg-cosmos-terracotta/10 px-3 py-1.5 rounded-full border border-cosmos-light-gray hover:border-cosmos-terracotta/20 transition-all cursor-pointer"
                  >
                    👮 Giả danh Công an
                  </button>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  onClick={handleCheck}
                  disabled={loading}
                  className="bg-cosmos-off-white text-cosmos-terracotta hover:bg-[#F0EEE9] active:bg-cosmos-light-gray disabled:bg-cosmos-light-gray disabled:text-cosmos-taupe font-sans font-medium text-sm h-[54px] px-8 rounded-full border border-black/12 transition-all cursor-pointer select-none whitespace-nowrap flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-cosmos-terracotta border-t-transparent rounded-full animate-spin"></span>
                      Đang phân tích...
                    </>
                  ) : (
                    "Kiểm tra ngay"
                  )}
                </button>
              </div>

              {/* ERROR STATE */}
              {errorMsg && (
                <div className="mt-4 p-4 bg-cosmos-error/10 border border-cosmos-error/20 text-cosmos-error font-sans text-sm rounded-xl flex items-start gap-2.5">
                  <span className="mt-0.5">⚠️</span>
                  <div>
                    <p className="font-semibold">Có lỗi xảy ra:</p>
                    <p>{errorMsg}</p>
                  </div>
                </div>
              )}
            </div>

            {/* WAITING LOADING SKELETON */}
            {loading && (
              <div className="bg-white rounded-2xl border border-cosmos-light-gray p-6 md:p-8 space-y-6 animate-pulse">
                <div className="h-7 bg-gray-200 rounded w-1/4"></div>
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-full"></div>
                  <div className="h-5 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div className="h-[2px] bg-gray-200"></div>
                <div className="h-20 bg-gray-100 rounded"></div>
              </div>
            )}

            {/* BOX 2: DETECTED RESULTS */}
            {reply && !loading && (
              <div className="space-y-8">
                
                {/* 2.1 DETECTION DETAIL */}
                <div className="bg-white rounded-2xl border border-cosmos-light-gray p-6 md:p-8 shadow-cosmos-card space-y-6">
                  
                  {/* RISK BADGE */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cosmos-light-gray">
                    <h3 className="text-xl font-bold font-serif text-cosmos-black">Kết quả phân tích từ Thám tử</h3>
                    
                    {reply.riskLevel === "DANGEROUS" && (
                      <span className="px-5 py-2 text-sm font-sans font-bold text-white bg-cosmos-error rounded-full flex items-center gap-1.5 shadow-md">
                        🛑 NGUY HIỂM - CÓ LỪA ĐẢO
                      </span>
                    )}
                    {reply.riskLevel === "SUSPICIOUS" && (
                      <span className="px-5 py-2 text-sm font-sans font-bold text-cosmos-charcoal bg-amber-400 rounded-full flex items-center gap-1.5 shadow-md">
                        ⚠️ NGHI NGỜ - CẦN CẢNH GIÁC
                      </span>
                    )}
                    {reply.riskLevel === "SAFE" && (
                      <span className="px-5 py-2 text-sm font-sans font-bold text-white bg-emerald-600 rounded-full flex items-center gap-1.5 shadow-md">
                        ✅ AN TOÀN - CHƯA PHÁT HIỆN LỖI
                      </span>
                    )}
                  </div>

                  {/* HIGHLIGHTED TEXT SECTION */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-cosmos-dark-gray">Nội dung tin nhắn:</h4>
                    <div className="p-4 bg-cosmos-off-white rounded-xl border border-cosmos-light-gray relative min-h-[80px]">
                      {renderHighlightedText(message, reply.scamSigns)}
                    </div>
                    {reply.scamSigns.length > 0 && (
                      <p className="text-xs font-sans text-cosmos-taupe italic">
                        💡 Rê chuột vào các đoạn được <span className="bg-amber-100 px-1 font-semibold text-cosmos-charcoal rounded">tô màu vàng</span> để xem phân tích chi tiết.
                      </p>
                    )}
                  </div>

                  {/* SPECIFIC SCAM SIGNS */}
                  {reply.scamSigns.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-cosmos-dark-gray">Các dấu hiệu nhận diện được:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {reply.scamSigns.map((sign, idx) => (
                          <div 
                            key={idx}
                            onMouseEnter={() => setHoveredSignIndex(idx)}
                            onMouseLeave={() => setHoveredSignIndex(null)}
                            className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                              hoveredSignIndex === idx 
                                ? "bg-amber-50/50 border-amber-300 shadow-sm" 
                                : "bg-white border-cosmos-light-gray"
                            }`}
                          >
                            <span className="inline-block text-xs font-bold text-cosmos-terracotta bg-cosmos-off-white border border-cosmos-light-gray px-2 py-0.5 rounded mb-2">
                              Dấu hiệu #{idx + 1}
                            </span>
                            <blockquote className="text-sm font-sans font-medium text-cosmos-black border-l-2 border-amber-400 pl-2 mb-2 italic">
                              "{sign.phrase}"
                            </blockquote>
                            <p className="text-sm font-sans text-cosmos-dark-gray leading-relaxed">{sign.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RECOMMENDATIONS */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-sans font-bold uppercase tracking-wider text-cosmos-dark-gray">Việc bác nên và không nên làm ngay:</h4>
                    <ul className="space-y-2.5">
                      {reply.recommendations.map((rec, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-base font-sans text-cosmos-black">
                          <span className="flex-shrink-0 w-6 h-6 bg-cosmos-off-white text-cosmos-terracotta font-bold text-xs rounded-full flex items-center justify-center border border-cosmos-light-gray">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* 2.2 CO TAM LY (Cấp 3) */}
                {(reply.riskLevel === "SUSPICIOUS" || reply.riskLevel === "DANGEROUS") && (
                  <div className="bg-white rounded-2xl border border-cosmos-light-gray p-6 md:p-8 shadow-cosmos-card space-y-4">
                    <div className="flex items-center gap-3 border-b border-cosmos-light-gray pb-4">
                      <div className="w-10 h-10 rounded-full bg-cosmos-lavender flex items-center justify-center text-xl">
                        👩‍🏫
                      </div>
                      <div>
                        <h4 className="font-bold font-serif text-cosmos-black text-lg">Góc chia sẻ của Cô tâm lý</h4>
                        <p className="text-xs font-sans text-cosmos-taupe">Hiểu vì sao mình suýt tin</p>
                      </div>
                    </div>

                    {psychologyLoading ? (
                      <div className="space-y-2 py-2 animate-pulse">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    ) : psychologyError ? (
                      <p className="text-sm font-sans text-cosmos-taupe italic">{psychologyError}</p>
                    ) : psychologyReply ? (
                      <p className="text-base font-sans leading-relaxed text-cosmos-dark-gray bg-cosmos-off-white/40 p-4 rounded-xl border border-cosmos-light-gray italic">
                        "{psychologyReply.content}"
                      </p>
                    ) : null}
                  </div>
                )}

                {/* 2.3 NGƯỜI ỨNG CỨU (Cấp 5) */}
                {(reply.riskLevel === "SUSPICIOUS" || reply.riskLevel === "DANGEROUS") && (
                  <div className="bg-white rounded-2xl border border-cosmos-light-gray p-6 md:p-8 shadow-cosmos-card space-y-6">
                    <div className="flex items-center gap-3 border-b border-cosmos-light-gray pb-4">
                      <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xl">
                        🚨
                      </div>
                      <div>
                        <h4 className="font-bold font-serif text-cosmos-black text-lg">Hỗ trợ khẩn cấp từ Người ứng cứu</h4>
                        <p className="text-xs font-sans text-cosmos-taupe">Nếu bác đã lỡ thao tác theo tin nhắn lừa đảo</p>
                      </div>
                    </div>

                    {/* INTERACTIVE QUESTION */}
                    <div className="space-y-4">
                      <label className="block text-sm font-sans font-bold uppercase tracking-wider text-cosmos-dark-gray">
                        Bác đã làm gì rồi?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                          onClick={() => handleEmergencySelect("none")}
                          className={`p-4 rounded-xl border text-left font-sans text-sm transition-all cursor-pointer ${
                            emergencySituation === "none"
                              ? "border-emerald-500 bg-emerald-50/50 font-semibold text-emerald-800"
                              : "border-cosmos-light-gray bg-white hover:bg-cosmos-off-white"
                          }`}
                        >
                          🟢 Cháu chưa làm gì cả
                        </button>
                        <button
                          onClick={() => handleEmergencySelect("clicked_link")}
                          className={`p-4 rounded-xl border text-left font-sans text-sm transition-all cursor-pointer ${
                            emergencySituation === "clicked_link"
                              ? "border-cosmos-terracotta bg-cosmos-terracotta/5 font-semibold text-cosmos-terracotta-hover"
                              : "border-cosmos-light-gray bg-white hover:bg-cosmos-off-white"
                          }`}
                        >
                          🔗 Cháu đã bấm vào đường link lạ
                        </button>
                        <button
                          onClick={() => handleEmergencySelect("provided_otp")}
                          className={`p-4 rounded-xl border text-left font-sans text-sm transition-all cursor-pointer ${
                            emergencySituation === "provided_otp"
                              ? "border-cosmos-terracotta bg-cosmos-terracotta/5 font-semibold text-cosmos-terracotta-hover"
                              : "border-cosmos-light-gray bg-white hover:bg-cosmos-off-white"
                          }`}
                        >
                          🔑 Cháu đã cung cấp mã OTP/xác thực
                        </button>
                        <button
                          onClick={() => handleEmergencySelect("transferred_money")}
                          className={`p-4 rounded-xl border text-left font-sans text-sm transition-all cursor-pointer ${
                            emergencySituation === "transferred_money"
                              ? "border-cosmos-terracotta bg-cosmos-terracotta/5 font-semibold text-cosmos-terracotta-hover"
                              : "border-cosmos-light-gray bg-white hover:bg-cosmos-off-white"
                          }`}
                        >
                          💸 Cháu đã chuyển tiền đi rồi
                        </button>
                      </div>
                    </div>

                    {/* SELECT BANK IF CRITICAL ACTION CHOSEN */}
                    {emergencySituation && emergencySituation !== "none" && (
                      <div className="space-y-2 p-4 bg-cosmos-off-white rounded-xl border border-cosmos-light-gray">
                        <label className="block text-sm font-sans font-medium text-cosmos-dark-gray">
                          Để có hướng dẫn chính xác nhất, xin chọn ngân hàng của bác (nếu có):
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => {
                            setSelectedBank(e.target.value);
                          }}
                          className="w-full bg-white border border-cosmos-light-gray rounded-lg p-2.5 font-sans text-sm focus:outline-none focus:border-cosmos-terracotta focus:ring-1 focus:ring-cosmos-terracotta"
                        >
                          <option value="">-- Chọn ngân hàng hỗ trợ --</option>
                          {hotlines.filter(h => h.name !== "Phòng An ninh mạng & Phòng chống tội phạm công nghệ cao" && h.name !== "Cục An toàn thông tin (AIS)").map((bank, index) => (
                            <option key={index} value={bank.name}>
                              {bank.name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleEmergencySelect(emergencySituation)}
                          disabled={emergencyLoading}
                          className="mt-3 w-full bg-cosmos-terracotta text-white font-sans text-xs font-semibold py-2 px-4 rounded-lg hover:bg-cosmos-terracotta-hover transition-colors cursor-pointer"
                        >
                          {emergencyLoading ? "Đang cập nhật hướng dẫn..." : "Cập nhật số tổng đài ngân hàng này"}
                        </button>
                      </div>
                    )}

                    {/* EMERGENCY RESULTS */}
                    {emergencySituation === "none" && (
                      <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 font-sans text-sm rounded-xl flex items-start gap-2.5">
                        <span className="text-base">🎉</span>
                        <div>
                          <p className="font-semibold">Bác xử lý rất tuyệt vời!</p>
                          <p>Bác không bấm link hay làm theo bất kỳ chỉ dẫn nào là quyết định hoàn toàn chính xác. Bác hãy xóa tin nhắn này đi và giữ cảnh giác nhé.</p>
                        </div>
                      </div>
                    )}

                    {emergencyLoading && (
                      <div className="space-y-4 animate-pulse py-2">
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded w-5/6"></div>
                      </div>
                    )}

                    {emergencyError && (
                      <div className="p-4 bg-cosmos-error/10 border border-cosmos-error/20 text-cosmos-error font-sans text-sm rounded-xl">
                        {emergencyError}
                      </div>
                    )}

                    {emergencyReply && !emergencyLoading && (
                      <div className="space-y-4">
                        <h5 className="text-sm font-sans font-bold uppercase tracking-wider text-cosmos-dark-gray">Kịch bản ứng cứu khẩn cấp:</h5>
                        
                        <div className="space-y-4">
                          {emergencyReply.steps.map((step, idx) => (
                            <div key={idx} className="bg-cosmos-off-white/50 border border-cosmos-light-gray rounded-xl p-4 space-y-3">
                              <div className="flex items-center justify-between gap-4">
                                <span className="font-sans font-bold text-sm text-cosmos-charcoal">
                                  Bước {idx + 1}: {step.title}
                                </span>
                              </div>
                              <p className="text-sm font-sans text-cosmos-dark-gray leading-relaxed">
                                {step.action}
                              </p>
                              {step.template && (
                                <div className="bg-white border border-cosmos-light-gray rounded-lg p-3 relative group">
                                  <p className="text-xs font-sans text-cosmos-taupe uppercase font-semibold tracking-wider mb-1">Mẫu câu nói khi gọi điện:</p>
                                  <p className="text-sm font-sans text-cosmos-black italic font-medium pr-10">
                                    {step.template}
                                  </p>
                                  <button
                                    onClick={() => copyToClipboard(step.template)}
                                    className="absolute top-2 right-2 p-1.5 rounded-md text-cosmos-taupe hover:text-cosmos-terracotta hover:bg-cosmos-off-white transition-all cursor-pointer"
                                    title="Sao chép mẫu câu"
                                  >
                                    📋
                                  </button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CONTACT HOTLINES DIRECTORY */}
                    {emergencySituation && emergencySituation !== "none" && (
                      <div className="mt-4 pt-4 border-t border-cosmos-light-gray space-y-3">
                        <h5 className="text-xs font-sans font-bold uppercase tracking-wider text-cosmos-dark-gray">Đường dây nóng hỗ trợ chính thức:</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {hotlines.filter(h => h.name === "Cục An toàn thông tin (AIS)" || h.name === "Phòng An ninh mạng & Phòng chống tội phạm công nghệ cao").map((hotline, idx) => (
                            <div key={idx} className="bg-white border border-cosmos-light-gray rounded-xl p-3 flex justify-between items-center">
                              <div>
                                <p className="text-xs font-bold font-sans text-cosmos-black">{hotline.name}</p>
                                <p className="text-lg font-bold font-sans text-cosmos-terracotta">{hotline.hotline}</p>
                              </div>
                              <a 
                                href={`tel:${hotline.hotline}`}
                                className="bg-cosmos-terracotta text-white hover:bg-cosmos-terracotta-hover px-4 py-1.5 rounded-full font-sans text-xs font-semibold tracking-wide transition-colors"
                              >
                                Gọi ngay
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                )}

              </div>
            )}

          </div>

          {/* RIGHT: SCAN HISTORY */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-cosmos-light-gray p-6 md:p-8 shadow-cosmos-card space-y-6">
            <div className="flex items-center justify-between border-b border-cosmos-light-gray pb-4">
              <h3 className="text-lg font-bold font-serif text-cosmos-black">Lịch sử kiểm tra</h3>
              {history.length > 0 && (
                <button
                  onClick={clearAllHistory}
                  className="text-xs font-sans text-cosmos-taupe hover:text-cosmos-error hover:underline transition-all cursor-pointer"
                >
                  Xóa hết
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="py-8 text-center text-cosmos-taupe font-sans text-sm space-y-2">
                <p>Chưa có tin nhắn nào được kiểm tra.</p>
                <p className="text-xs text-cosmos-taupe/80">Lịch sử sẽ được lưu trực tiếp trên thiết bị của bác.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadHistoryItem(item)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer hover:border-cosmos-terracotta/40 ${
                      activeHistoryId === item.id
                        ? "bg-cosmos-off-white border-cosmos-terracotta"
                        : "bg-white border-cosmos-light-gray"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[10px] font-sans text-cosmos-taupe font-semibold uppercase">{item.timestamp}</span>
                      
                      {item.reply.riskLevel === "DANGEROUS" && (
                        <span className="text-[10px] font-sans font-bold text-cosmos-error">🛑 Nguy hiểm</span>
                      )}
                      {item.reply.riskLevel === "SUSPICIOUS" && (
                        <span className="text-[10px] font-sans font-bold text-amber-500">⚠️ Nghi ngờ</span>
                      )}
                      {item.reply.riskLevel === "SAFE" && (
                        <span className="text-[10px] font-sans font-bold text-emerald-600">✅ An toàn</span>
                      )}
                    </div>
                    <p className="text-xs font-sans text-cosmos-charcoal line-clamp-2 leading-relaxed">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </main>

      {/* FOOTER WARNING STATEMENT */}
      <footer className="bg-white border-t border-cosmos-light-gray mt-12 py-6">
        <div className="max-w-[1200px] mx-auto px-6 text-center text-xs md:text-sm font-sans text-cosmos-taupe leading-relaxed space-y-2">
          <p className="font-semibold text-cosmos-dark-gray uppercase tracking-wider text-[11px]">Dòng cảnh báo pháp lý bắt buộc</p>
          <p className="max-w-3xl mx-auto">
            ScamCheck là công cụ giáo dục do nhóm học viên phát triển và đánh giá của ứng dụng không thay thế cảnh báo chính thức từ ngân hàng hoặc cơ quan chức năng. Khi nghi ngờ, người dùng nên gọi tổng đài chính thức của ngân hàng được in trên thẻ.
          </p>
        </div>
      </footer>

    </div>
  );
}

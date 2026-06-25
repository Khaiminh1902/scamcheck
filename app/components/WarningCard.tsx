import React, { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { DetectiveResult } from "@/types/detective";
import RiskBadge from "./level";

interface WarningCardProps {
  message: string;
  result: DetectiveResult;
  url?: string;
}

const WarningCard = forwardRef<HTMLDivElement, WarningCardProps>(
  ({ message, result, url = "https://scamcheck.vn" }, ref) => {
    // Shorten message if too long
    const shortMessage =
      message.length > 200 ? message.substring(0, 200) + "..." : message;

    const displayDomain = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

    return (
      <div
        ref={ref}
        style={{
          width: "480px",
          padding: "32px",
          backgroundColor: "#ffffff",
          color: "#111827",
          fontFamily: 'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          boxSizing: "border-box",
          borderRadius: "20px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", paddingBottom: "16px", borderBottom: "2px solid #f3f4f6" }}>
          <h1 style={{ margin: 0, fontSize: "32px", fontWeight: 900, color: "#2563eb", letterSpacing: "-1px" }}>ScamCheck</h1>
          <RiskBadge level={result.riskLevel} />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ margin: "0 0 8px 0", fontSize: "13px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Nội dung đáng ngờ</h2>
          <div style={{ padding: "16px", backgroundColor: "#f9fafb", borderLeft: "4px solid #d1d5db", borderRadius: "0 8px 8px 0", color: "#374151", fontSize: "16px", fontStyle: "italic", lineHeight: 1.5 }}>
            "{shortMessage}"
          </div>
        </div>

        {result.scamSigns.length > 0 && (
          <div style={{ marginBottom: "24px" }}>
            <h2 style={{ margin: "0 0 12px 0", fontSize: "13px", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", letterSpacing: "1px" }}>Dấu hiệu lừa đảo chính</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {result.scamSigns.slice(0, 2).map((sign, idx) => (
                <div key={idx} style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
                  <span style={{ fontSize: "18px", marginTop: "-2px" }}>🚩</span>
                  <span style={{ fontSize: "16px", fontWeight: 600, color: "#b91c1c", lineHeight: 1.4 }}>{sign.title}</span>
                </div>
              ))}
            </div>
            {result.scamSigns.length > 2 && (
              <div style={{ marginTop: "12px", fontSize: "14px", fontStyle: "italic", color: "#6b7280" }}>
                ...và {result.scamSigns.length - 2} dấu hiệu khác
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "2px dashed #e5e7eb", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ padding: "6px", backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "10px" }}>
            <QRCodeSVG value={url} size={64} />
          </div>
          <div>
            <p style={{ margin: "0 0 4px 0", fontSize: "16px", fontWeight: 700, color: "#111827" }}>Kiểm tra tin nhắn lừa đảo ngay</p>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b7280", lineHeight: 1.4 }}>Quét mã QR hoặc truy cập <strong>{displayDomain}</strong> để tự bảo vệ mình và người thân.</p>
          </div>
        </div>
      </div>
    );
  }
);

WarningCard.displayName = "WarningCard";

export default WarningCard;

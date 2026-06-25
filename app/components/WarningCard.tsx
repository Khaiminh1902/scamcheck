import React, { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { DetectiveResult } from "@/types/detective";

interface WarningCardProps {
  message: string;
  result: DetectiveResult;
  url?: string;
}

const WarningCard = forwardRef<HTMLDivElement, WarningCardProps>(
  ({ message, result, url = "https://scamcheck.vn" }, ref) => {
    const shortMessage = message.length > 150 ? message.substring(0, 150) + "..." : message;
    const displayDomain = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

    let badgeBg = "";
    let badgeText = "";
    let riskText = "";
    let icon = "";

    if (result.riskLevel === "danger") {
      badgeBg = "#fef2f2";
      badgeText = "#dc2626";
      riskText = "CẢNH BÁO LỪA ĐẢO";
      icon = "🚨";
    } else if (result.riskLevel === "warning") {
      badgeBg = "#fffbeb";
      badgeText = "#d97706";
      riskText = "CÓ DẤU HIỆU NGHI NGỜ";
      icon = "⚠️";
    } else {
      badgeBg = "#f0fdf4";
      badgeText = "#16a34a";
      riskText = "AN TOÀN";
      icon = "✅";
    }

    return (
      <div
        ref={ref}
        style={{
          width: "520px",
          backgroundColor: "#ffffff",
          color: "#111827",
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          boxSizing: "border-box",
          borderRadius: "16px",
          border: "1px solid #e5e7eb",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header Section */}
        <div style={{ padding: "24px 32px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f3f4f6" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "20px" }}>🛡️</span>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
              ScamCheck
            </h1>
          </div>
          <div style={{
            backgroundColor: badgeBg,
            color: badgeText,
            padding: "6px 12px",
            borderRadius: "6px",
            fontWeight: 700,
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            border: `1px solid ${badgeText}30`
          }}>
            <span style={{ fontSize: "14px" }}>{icon}</span>
            {riskText}
          </div>
        </div>

        {/* Content Body */}
        <div style={{ padding: "32px", display: "flex", flexDirection: "column", gap: "24px" }}>
          
          {/* Message Section */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase" }}>
              Nội dung kiểm tra
            </div>
            <div style={{ 
              color: "#374151", 
              fontSize: "15px", 
              fontStyle: "italic", 
              lineHeight: 1.6,
              borderLeft: "3px solid #e5e7eb",
              paddingLeft: "16px"
            }}>
              "{shortMessage}"
            </div>
          </div>

          {/* Analysis Section */}
          {result.scamSigns.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ fontSize: "12px", fontWeight: 600, color: "#6b7280", letterSpacing: "0.5px", textTransform: "uppercase" }}>
                Kết quả phân tích
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {result.scamSigns.slice(0, 2).map((sign, idx) => (
                  <div key={idx} style={{ 
                    display: "flex", 
                    alignItems: "flex-start", 
                    gap: "10px"
                  }}>
                    <span style={{ fontSize: "16px", marginTop: "2px" }}>•</span>
                    <span style={{ fontSize: "15px", fontWeight: 500, color: "#111827", lineHeight: 1.5 }}>
                      {sign.title}
                    </span>
                  </div>
                ))}
              </div>
              {result.scamSigns.length > 2 && (
                <div style={{ fontSize: "13px", color: "#9ca3af", marginTop: "4px" }}>
                  ...và {result.scamSigns.length - 2} dấu hiệu khác
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer / QR */}
        <div style={{ 
          padding: "24px 32px", 
          backgroundColor: "#f9fafb", 
          display: "flex", 
          alignItems: "center", 
          gap: "20px",
          borderTop: "1px solid #e5e7eb"
        }}>
          <div style={{ 
            padding: "8px", 
            backgroundColor: "#ffffff", 
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <QRCodeSVG value={url} size={64} level="M" />
          </div>
          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "4px" }}>
            <div style={{ fontSize: "14px", fontWeight: 700, color: "#111827" }}>
              Quét mã để xem chi tiết
            </div>
            <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5, wordWrap: "break-word", wordBreak: "break-all" }}>
              hoặc truy cập <strong style={{ color: "#374151" }}>{displayDomain}</strong>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

WarningCard.displayName = "WarningCard";

export default WarningCard;

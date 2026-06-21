// app/lib/domain-checker.ts

import { LEGITIMATE_ORGS, SHORTENED_DOMAINS } from "@/app/data/legitimate-domains";
import type { UrlAnalysisResult } from "@/types/detective";
import type { ExtractedUrl } from "./url-extractor";

/**
 * Ký tự thường bị thay thế để giả mạo tên miền (homoglyph / typosquatting).
 * Mỗi entry: [ký tự giả, ký tự thật]
 */
const CHAR_SUBSTITUTIONS: [string, string][] = [
  ["0", "o"],
  ["o", "0"],
  ["1", "l"],
  ["l", "1"],
  ["1", "i"],
  ["i", "1"],
  ["rn", "m"],
  ["m", "rn"],
  ["vv", "w"],
  ["w", "vv"],
  ["cl", "d"],
  ["d", "cl"],
  ["nn", "m"],
];

/**
 * Tính Levenshtein distance giữa hai chuỗi.
 * Dùng để phát hiện tên miền có edit distance nhỏ so với tên miền chính thức.
 */
function levenshteinDistance(a: string, b: string): number {
  const m = a.length;
  const n = b.length;

  // Tối ưu: nếu chênh lệch quá lớn, skip sớm
  if (Math.abs(m - n) > 3) return Math.abs(m - n);

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array<number>(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,       // deletion
        dp[i][j - 1] + 1,       // insertion
        dp[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return dp[m][n];
}

/**
 * Normalize tên miền: bỏ subdomain, chỉ giữ domain + TLD chính.
 * Ví dụ: "login.vietcombank.com.vn" → "vietcombank.com.vn"
 */
function extractMainDomain(hostname: string): string {
  const parts = hostname.split(".");

  // TLD dạng .com.vn, .org.vn, .net.vn, .edu.vn, .gov.vn
  if (parts.length >= 3) {
    const lastTwo = parts.slice(-2).join(".");
    if (["com.vn", "org.vn", "net.vn", "edu.vn", "gov.vn"].includes(lastTwo)) {
      // domain.com.vn → lấy 3 phần cuối
      return parts.slice(-3).join(".");
    }
  }

  // TLD đơn: .vn, .com, .org, ...
  if (parts.length >= 2) {
    return parts.slice(-2).join(".");
  }

  return hostname;
}

/**
 * Lấy phần tên (không có TLD) để so khớp.
 * "vietcombank.com.vn" → "vietcombank"
 */
function extractDomainName(hostname: string): string {
  const main = extractMainDomain(hostname);
  const dotIndex = main.indexOf(".");
  return dotIndex !== -1 ? main.slice(0, dotIndex) : main;
}

/**
 * Kiểm tra xem domainName có phải là biến thể character substitution
 * của một keyword chính thống không.
 */
function checkCharSubstitution(
  domainName: string,
  keyword: string
): boolean {
  if (domainName === keyword) return false; // exact match, not a substitution

  for (const [fake, real] of CHAR_SUBSTITUTIONS) {
    const variant = domainName.replace(fake, real);
    if (variant === keyword) return true;

    // Kiểm tra nhiều lần thay thế
    const variant2 = variant.replace(fake, real);
    if (variant2 === keyword) return true;
  }

  return false;
}

/**
 * Kiểm tra tên miền có phải URL rút gọn không.
 */
function isShortenedUrl(hostname: string): boolean {
  const mainDomain = extractMainDomain(hostname);
  return SHORTENED_DOMAINS.includes(mainDomain);
}

/**
 * Phân tích một URL đã trích xuất và trả về kết quả đánh giá.
 */
export function checkDomain(extracted: ExtractedUrl): UrlAnalysisResult {
  const { raw, hostname } = extracted;
  const mainDomain = extractMainDomain(hostname);
  const domainName = extractDomainName(hostname);

  // 1. Kiểm tra URL rút gọn
  if (isShortenedUrl(hostname)) {
    return {
      raw,
      hostname,
      isSuspicious: false,
      isShortened: true,
      isLegitimate: false,
      reason: "Đường dẫn rút gọn — không thể xác định đích đến thực sự",
    };
  }

  // 2. Kiểm tra exact match với tên miền chính thống
  for (const org of LEGITIMATE_ORGS) {
    if (org.domains.includes(mainDomain)) {
      return {
        raw,
        hostname,
        isSuspicious: false,
        isShortened: false,
        isLegitimate: true,
        matchedOrg: org.name,
        officialDomain: mainDomain,
      };
    }
  }

  // 3. Kiểm tra giả mạo: character substitution + Levenshtein
  for (const org of LEGITIMATE_ORGS) {
    for (const keyword of org.keywords) {
      // Character substitution check
      if (checkCharSubstitution(domainName, keyword)) {
        return {
          raw,
          hostname,
          isSuspicious: true,
          isShortened: false,
          isLegitimate: false,
          matchedOrg: org.name,
          officialDomain: org.domains[0],
          reason: `Tên miền "${hostname}" dùng ký tự thay thế để giả mạo ${org.name} (tên miền chính thức: ${org.domains[0]})`,
        };
      }

      // Levenshtein distance check (chỉ với keyword đủ dài)
      if (keyword.length >= 4) {
        const distance = levenshteinDistance(domainName, keyword);
        if (distance > 0 && distance <= 2) {
          return {
            raw,
            hostname,
            isSuspicious: true,
            isShortened: false,
            isLegitimate: false,
            matchedOrg: org.name,
            officialDomain: org.domains[0],
            reason: `Tên miền "${hostname}" rất giống với ${org.name} nhưng KHÔNG phải trang chính thức (tên miền chính thức: ${org.domains[0]})`,
          };
        }
      }
    }

    // So khớp Levenshtein trực tiếp với tên miền chính thức
    for (const officialDomain of org.domains) {
      const officialName = extractDomainName(officialDomain);
      if (officialName.length >= 4 && domainName !== officialName) {
        const distance = levenshteinDistance(domainName, officialName);
        if (distance > 0 && distance <= 2) {
          return {
            raw,
            hostname,
            isSuspicious: true,
            isShortened: false,
            isLegitimate: false,
            matchedOrg: org.name,
            officialDomain: officialDomain,
            reason: `Tên miền "${hostname}" rất giống với ${org.name} nhưng KHÔNG phải trang chính thức (tên miền chính thức: ${officialDomain})`,
          };
        }
      }
    }
  }

  // 4. Không xác định: không khớp với bất kỳ tổ chức nào
  return {
    raw,
    hostname,
    isSuspicious: false,
    isShortened: false,
    isLegitimate: false,
    reason: "Tên miền không nằm trong danh sách tổ chức đã xác minh — hãy cẩn trọng",
  };
}

/**
 * Phân tích tất cả URL trong tin nhắn.
 */
export function analyzeUrls(extractedUrls: ExtractedUrl[]): UrlAnalysisResult[] {
  return extractedUrls.map(checkDomain);
}

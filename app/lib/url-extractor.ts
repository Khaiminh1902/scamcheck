// app/lib/url-extractor.ts

export type ExtractedUrl = {
  raw: string;
  hostname: string;
};

/**
 * Regex tách URL từ tin nhắn.
 *
 * Hỗ trợ:
 * - URL có protocol (http/https)
 * - URL bắt đầu bằng www.
 * - URL không protocol nhưng có TLD phổ biến (.com, .vn, .org, .net, .io, .ly, ...)
 */
const URL_REGEX =
  /(?:https?:\/\/)[^\s<>"']+|(?:www\.)[^\s<>"']+|(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+(?:com\.vn|org\.vn|net\.vn|edu\.vn|gov\.vn|vn|com|org|net|info|io|me|ly|cc|xyz|top|online|site|link|click|app|dev|co)(?:\/[^\s<>"']*)?/gi;

/**
 * Loại bỏ dấu câu ở cuối URL mà thường không thuộc URL thật.
 */
function stripTrailingPunctuation(url: string): string {
  return url.replace(/[.,;:!?)]+$/, "");
}

/**
 * Trích xuất hostname từ URL string.
 */
function extractHostname(url: string): string {
  let normalized = url.toLowerCase();

  // Bỏ protocol
  normalized = normalized.replace(/^https?:\/\//, "");

  // Bỏ www.
  normalized = normalized.replace(/^www\./, "");

  // Lấy phần trước path/query
  const slashIndex = normalized.indexOf("/");
  if (slashIndex !== -1) {
    normalized = normalized.slice(0, slashIndex);
  }

  // Bỏ port
  const colonIndex = normalized.indexOf(":");
  if (colonIndex !== -1) {
    normalized = normalized.slice(0, colonIndex);
  }

  return normalized;
}

/**
 * Tách tất cả URL từ một đoạn tin nhắn.
 * Trả về mảng ExtractedUrl đã deduplicate theo hostname.
 */
export function extractUrls(text: string): ExtractedUrl[] {
  const matches = text.match(URL_REGEX);

  if (!matches) {
    return [];
  }

  const seen = new Set<string>();
  const results: ExtractedUrl[] = [];

  for (const match of matches) {
    const raw = stripTrailingPunctuation(match);
    const hostname = extractHostname(raw);

    if (!hostname || seen.has(hostname)) {
      continue;
    }

    seen.add(hostname);
    results.push({ raw, hostname });
  }

  return results;
}

export type DetectiveResult = {
  riskLevel: "safe" | "warning" | "danger";
  scamSigns: {
    title: string;
    explanation: string;
    excerpt: string;
  }[];
  recommendedActions: string[];
  psychologyAdvice?: string;
  psychologyError?: string;
};

export type UrlAnalysisResult = {
  raw: string;
  hostname: string;
  isSuspicious: boolean;
  isShortened: boolean;
  isLegitimate: boolean;
  matchedOrg?: string;
  officialDomain?: string;
  reason?: string;
};

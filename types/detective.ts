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
  scenarios?: {
    key: "none" | "link" | "money" | "otp";
    label: string;
  }[];
};

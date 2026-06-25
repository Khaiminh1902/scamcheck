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

export type ScenarioKey = "none" | "link" | "money" | "otp";

export type ScamSign = {
  title: string;
  explanation: string;
  excerpt: string;
};

export type DetectiveScenario = {
  key: ScenarioKey;
  label: string;
};

export type ResponderStep = {
  stepNumber: number;
  action: string;
  quote: string;
};

export type DetectiveResult = {
  riskLevel: "safe" | "warning" | "danger";
  scamSigns: ScamSign[];
  recommendedActions: string[];
  psychologyAdvice?: string;
  psychologyError?: string;
  scenarios?: DetectiveScenario[];
};

export type SharePayload = {
  message: string;
  result: DetectiveResult;
};

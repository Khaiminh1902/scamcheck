type Props = {
  level: "safe" | "warning" | "danger";
};

const LEVEL_CONFIG = {
  safe: {
    label: "An toàn",
    className: "bg-green-600 text-white",
  },
  warning: {
    label: "Cảnh báo",
    className: "bg-amber-500 text-white",
  },
  danger: {
    label: "Nguy hiểm",
    className: "bg-red-600 text-white",
  },
} as const;

export default function Level({ level }: Props) {
  const item = LEVEL_CONFIG[level];

  return (
    <div
      className={`rounded-full px-4 py-2 text-sm font-bold ${item.className}`}
    >
      {item.label}
    </div>
  );
}

type Props = {
  level: "safe" | "warning" | "danger";
};

export default function level({ level }: Props) {
  const config = {
    safe: {
      label: "An toàn",
      color: "#22c55e",
    },
    warning: {
      label: "Nghi ngờ",
      color: "#eab308",
    },
    danger: {
      label: "Nguy hiểm",
      color: "#ef4444",
    },
  };

  return (
    <div
      className={`px-4 py-2 rounded font-bold`}
      style={{ backgroundColor: config[level].color, color: "#ffffff" }}
    >
      {config[level].label}
    </div>
  );
}

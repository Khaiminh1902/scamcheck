type Props = {
  level: "safe" | "warning" | "danger";
};

export default function level({ level }: Props) {
  const config = {
    safe: {
      label: "An toàn",
      color: "bg-green-500",
    },
    warning: {
      label: "Nghi ngờ",
      color: "bg-yellow-500",
    },
    danger: {
      label: "Nguy hiểm",
      color: "bg-red-500",
    },
  };

  return (
    <div
      className={`${config[level].color} text-white px-4 py-2 rounded font-bold`}
    >
      {config[level].label}
    </div>
  );
}

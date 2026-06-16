type Props = {
  level: "safe" | "warning" | "danger";
};

export default function Level({ level }: Props) {
  const config = {
    safe: {
      label: "An toàn",
      bgClass: "bg-emerald-50/60 text-emerald-800 border-emerald-200/60",
      icon: (
        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    },
    warning: {
      label: "Nghi ngờ",
      bgClass: "bg-orange-50/60 text-cosmos-terracotta border-orange-200/60",
      icon: (
        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )
    },
    danger: {
      label: "Nguy hiểm",
      bgClass: "bg-red-50/60 text-cosmos-error-red border-red-200/60",
      icon: (
        <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      )
    },
  };

  return (
    <div
      className={`inline-flex items-center px-4 py-1.5 rounded-full font-medium text-sm border shadow-xs transition-all duration-300 ${config[level].bgClass}`}
    >
      {config[level].icon}
      <span>{config[level].label}</span>
    </div>
  );
}

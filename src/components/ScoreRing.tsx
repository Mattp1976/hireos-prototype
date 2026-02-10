interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}

export function ScoreRing({
  score,
  size = 80,
  strokeWidth = 6,
  label,
  color,
}: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (score >= 85) return "#059669";
    if (score >= 70) return "#d97706";
    return "#dc2626";
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 0.8s ease-out",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-lg font-semibold tabular-nums"
            style={{ color: getColor() }}
          >
            {score}
          </span>
        </div>
      </div>
      {label && (
        <span className="text-[11px] text-gray-500 text-center leading-tight max-w-[80px]">
          {label}
        </span>
      )}
    </div>
  );
}

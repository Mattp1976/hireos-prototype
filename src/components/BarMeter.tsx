interface Props {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  showValue?: boolean;
}

export function BarMeter({
  label,
  value,
  maxValue = 100,
  color = "#1e40af",
  showValue = true,
}: Props) {
  const pct = (value / maxValue) * 100;
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-600 w-28 shrink-0 text-right">
        {label}
      </span>
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      {showValue && (
        <span className="text-xs font-medium text-gray-700 w-8 tabular-nums">
          {value}
        </span>
      )}
    </div>
  );
}

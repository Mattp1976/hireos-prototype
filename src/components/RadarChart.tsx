import {
  Radar,
  RadarChart as RechartsRadar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface RadarDataPoint {
  subject: string;
  A: number;
  B?: number;
}

interface Props {
  data: RadarDataPoint[];
  labelA?: string;
  labelB?: string;
  colorA?: string;
  colorB?: string;
  height?: number;
}

export function RadarChartComponent({
  data,
  labelA = "Candidate",
  labelB,
  colorA = "#1e40af",
  colorB = "#dc2626",
  height = 300,
}: Props) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsRadar cx="50%" cy="50%" outerRadius="72%" data={data}>
        <PolarGrid stroke="#e5e7eb" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 11, fill: "#6b7280" }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 100]}
          tick={{ fontSize: 9, fill: "#9ca3af" }}
        />
        <Radar
          name={labelA}
          dataKey="A"
          stroke={colorA}
          fill={colorA}
          fillOpacity={0.15}
          strokeWidth={2}
        />
        {labelB && (
          <Radar
            name={labelB}
            dataKey="B"
            stroke={colorB}
            fill={colorB}
            fillOpacity={0.1}
            strokeWidth={2}
            strokeDasharray="4 4"
          />
        )}
        {labelB && (
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
          />
        )}
      </RechartsRadar>
    </ResponsiveContainer>
  );
}

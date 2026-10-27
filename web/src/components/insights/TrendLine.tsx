import { Box, Typography } from "@mui/material";

type Point = { date: string; average: number | null };

type Props = {
  points: Point[];
};

const WIDTH = 300;
const HEIGHT = 80;
const MAX_INTENSITY = 10;

/**
 * Average intensity per day as a simple line (inline SVG, no chart library).
 * Days without entries are skipped, so the line connects only real data.
 */
const TrendLine = ({ points }: Props) => {
  const step = points.length > 1 ? WIDTH / (points.length - 1) : 0;
  const coordinates = points
    .map((point, index) => (point.average === null ? null : { x: index * step, y: HEIGHT - (point.average / MAX_INTENSITY) * HEIGHT }))
    .filter((coordinate): coordinate is { x: number; y: number } => coordinate !== null);

  const lastValue = [...points].reverse().find((point) => point.average !== null)?.average;
  const firstValue = points.find((point) => point.average !== null)?.average;

  return (
    <>
      <Box
        component="svg"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        aria-hidden
        sx={{ display: "block", width: "100%", height: 80, color: "text.primary", overflow: "visible" }}
      >
        {/* baseline + midline (5/10) */}
        <line x1={0} y1={HEIGHT} x2={WIDTH} y2={HEIGHT} stroke="var(--mui-palette-track)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <line x1={0} y1={HEIGHT / 2} x2={WIDTH} y2={HEIGHT / 2} stroke="var(--mui-palette-track)" strokeWidth={1} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
        {coordinates.length > 1 && (
          <polyline
            points={coordinates.map(({ x, y }) => `${x},${y}`).join(" ")}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        )}
        {coordinates.map(({ x, y }) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={2.5} fill="currentColor" />
        ))}
      </Box>
      {lastValue !== undefined && firstValue !== undefined && (
        <Typography sx={{ mt: 1, fontSize: 15, color: "text.secondary" }}>
          Laikotarpio pradžioje {firstValue.toFixed(1)}, paskutinį kartą {lastValue.toFixed(1)} iš 10
        </Typography>
      )}
    </>
  );
};

export default TrendLine;

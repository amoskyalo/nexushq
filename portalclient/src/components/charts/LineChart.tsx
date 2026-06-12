"use client";

import { Box } from "@mui/material";
import { LineChart as MUILineChart } from "@mui/x-charts/LineChart";

type Props = {
    labels: string[];
    data: number[];
    height?: number;
    color?: string;
    areaGradientId?: string;
};

export default function LineChart({ data, labels, height = 400, color = "#00A76F", areaGradientId }: Props) {
    return (
        <Box sx={{ flex: 1, minHeight: height, width: "100%" }}>
            <MUILineChart
                xAxis={[
                    {
                        data: labels,
                        scaleType: "point",
                        disableLine: true,
                        disableTicks: true,
                        tickLabelStyle: {
                            fontSize: 12,
                            fontStyle: "italic",
                        },
                    },
                ]}
                yAxis={[
                    {
                        valueFormatter: (value: number | null) => `${value ?? 0}`,
                        disableLine: true,
                        disableTicks: true,
                    },
                ]}
                series={[
                    {
                        data,
                        area: true,
                        color,
                        showMark: false,
                    },
                ]}
                grid={{ horizontal: true }}
                margin={{ bottom: 24, left: 0, right: 24, top: 10 }}
                sx={{
                    "& .MuiLineElement-root": {
                        strokeWidth: 2,
                        strokeLinecap: "round",
                    },
                    "& .MuiAreaElement-root": {
                        fill: areaGradientId ? `url(#${areaGradientId})` : undefined,
                        fillOpacity: areaGradientId ? 1 : 0.2,
                    },
                    "& .MuiChartsAxis-line": {
                        stroke: "transparent",
                    },
                    "& .MuiChartsAxis-tick": {
                        stroke: "transparent",
                    },
                    "& .MuiChartsGrid-line": {
                        stroke: "rgba(0, 0, 0, 0.08)",
                        strokeDasharray: "3 3",
                    },
                }}
                height={height}
            />
        </Box>
    );
}

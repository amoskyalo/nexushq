"use client";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BarChart as MUIBarChart } from "@mui/x-charts/BarChart";

type Props = {
    labels: string[];
    data: number[];
    height?: number;
    color?: string;
    xLabel?: string;
    yLabel?: string;
};

export default function BarChart({ labels, data, height = 300, color, xLabel, yLabel }: Props) {
    const theme = useTheme();
    const barColor = color ?? theme.palette.primary.main;

    return (
        <Box sx={{ flex: 1, minHeight: height, width: "100%" }}>
            <MUIBarChart
                layout="horizontal"
                height={height}
                yAxis={[
                    {
                        data: labels,
                        scaleType: "band",
                        width: 96,
                        label: yLabel,
                        categoryGapRatio: 0.3,
                        disableLine: true,
                        disableTicks: true,
                        labelStyle: { fontSize: 12, fill: theme.palette.text.secondary },
                        tickLabelStyle: { fontSize: 12, fontStyle: "italic" },
                    },
                ]}
                xAxis={[
                    {
                        label: xLabel,
                        height: 44,
                        disableLine: true,
                        disableTicks: true,
                        labelStyle: { fontSize: 12, fill: theme.palette.text.secondary },
                        tickLabelStyle: { fontSize: 12, fontStyle: "italic" },
                    },
                ]}
                series={[{ data, color: barColor }]}
                grid={{ vertical: true, horizontal: false }}
                margin={{ top: 10, right: 16, bottom: 10, left: 0 }}
                slotProps={{ legend: { sx: { display: "none" } } }}
                borderRadius={25}
                sx={{
                    "& .MuiLineElement-root": {
                        strokeWidth: 2,
                        strokeLinecap: "round",
                    },
                    "& .MuiAreaElement-root": {
                        fillOpacity: 0.2,
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
            />
        </Box>
    );
}

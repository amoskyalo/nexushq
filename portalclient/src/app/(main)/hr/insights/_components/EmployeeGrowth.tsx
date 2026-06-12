"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LineChart from "@/components/charts/LineChart";
import { INSIGHTS_CARD_SX } from "../_lib/insights.constants";
import { EMPLOYEE_GROWTH } from "../_lib/mock";

export const EmployeeGrowth = () => {
    const theme = useTheme();

    return (
        <Box sx={INSIGHTS_CARD_SX}>
            <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.2, fontSize: 15 }}>
                Employee Growth
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: 13 }}>
                Headcount month over month.
            </Typography>

            <Box>
                <svg width="0" height="0">
                    <defs>
                        <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor={theme.palette.primary.main} stopOpacity={0.4} />
                            <stop offset="100%" stopColor={theme.palette.primary.main} stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </svg>
                <LineChart
                    labels={EMPLOYEE_GROWTH.map((point) => point.month)}
                    data={EMPLOYEE_GROWTH.map((point) => point.count)}
                    color={theme.palette.primary.main}
                    areaGradientId="fade-gradient"
                    height={280}
                />
            </Box>
        </Box>
    );
};

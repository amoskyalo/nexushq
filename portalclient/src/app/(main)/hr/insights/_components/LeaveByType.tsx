"use client";

import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PieChart from "@/components/charts/PieChart";
import { INSIGHTS_CARD_SX } from "../_lib/insights.constants";
import { LEAVE_BY_TYPE } from "../_lib/mock";

export const LeaveByType = () => {
    const theme = useTheme();

    const palette = [
        theme.palette.primary.main,
        theme.palette.warning.main,
        theme.palette.secondary.main,
        theme.palette.info.main,
    ];

    const data = LEAVE_BY_TYPE.map((item, index) => ({ ...item, color: palette[index % palette.length] }));

    return (
        <Box sx={{ ...INSIGHTS_CARD_SX, display: "flex", flexDirection: "column" }}>
            <Box>
                <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.2, fontSize: 15 }}>
                    Leave Requests by Type
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: 13 }}>
                    Distribution of leave by category.
                </Typography>
            </Box>

            <PieChart data={data} height={220} />
        </Box>
    );
};

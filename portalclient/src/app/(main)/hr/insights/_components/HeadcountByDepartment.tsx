"use client";

import { Box, Typography } from "@mui/material";
import BarChart from "@/components/charts/BarChart";
import { INSIGHTS_CARD_SX } from "../_lib/insights.constants";
import { HEADCOUNT_BY_DEPARTMENT } from "../_lib/mock";

export const HeadcountByDepartment = () => {
    return (
        <Box sx={INSIGHTS_CARD_SX}>
            <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.2, fontSize: 15 }}>
                Headcount by Department
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 1, fontSize: 13 }}>
                Employees per department.
            </Typography>

            <BarChart
                labels={HEADCOUNT_BY_DEPARTMENT.map((row) => row.department)}
                data={HEADCOUNT_BY_DEPARTMENT.map((row) => row.count)}
                xLabel="Employee Count"
                yLabel="Department"
                height={280}
            />
        </Box>
    );
};

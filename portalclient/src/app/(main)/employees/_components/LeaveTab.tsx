"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { StatusButton } from "@/components/buttons";
import { useDataGrid } from "@/hooks/useDataGrid";
import { CARD_SX } from "../_lib/detail.constants";
import { LEAVE_BALANCES, LEAVE_HISTORY } from "../_lib/detail.mock";

export const LeaveTab = () => {
    const { render } = useDataGrid({
        url: "/api/employees/leaves",
        fallbackRows: LEAVE_HISTORY,
        grid: {
            columns: [
                {
                    field: "dateRange",
                    headerName: "Dates",
                    width: 180,
                    renderCell: ({ row }) => {
                        return (
                            <Box>
                                <Typography typography="body2">{row.type} leave</Typography>
                                <Typography typography="body2" color="text.secondary" sx={{ fontSize: 12 }}>
                                    {row.dateRange}
                                </Typography>
                            </Box>
                        );
                    },
                },
                { field: "justification", headerName: "Justification", flex: 1, minWidth: 200 },
                {
                    field: "status",
                    headerName: "Status",
                    width: 100,
                    renderCell: ({ row }) => <StatusButton status={row.status} />,
                },
            ],
            hasActions: true,
            checkboxSelection: false,
            showToolbar: false,
            hideFooter: true,
            actions: ["options"],
            options: [
                {
                    name: "Approve",
                    onClick: () => {},
                },
                {
                    name: "Reject",
                    onClick: () => {},
                },
            ],
        },
    });

    return (
        <Stack spacing={2}>
            <Grid container spacing={2}>
                {LEAVE_BALANCES.map((balance) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4 }} key={balance.id}>
                        <Box sx={CARD_SX}>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                {balance.type}
                            </Typography>
                            <Typography variant="h5" fontWeight={700} sx={{ mt: 0.5 }}>
                                {balance.remaining}
                                <Typography component="span" variant="body2" sx={{ color: "text.secondary" }}>
                                    {" "}
                                    / {balance.total} days
                                </Typography>
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>

            <Box sx={{}}>
                <Typography variant="body1" fontWeight={600} sx={{ mb: 1.5 }}>
                    Leave history
                </Typography>
                <Box>{render()}</Box>
            </Box>
        </Stack>
    );
};

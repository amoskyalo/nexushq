"use client";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppGrid } from "@/components/datagrid";
import { getInitials } from "@/utils";
import { INSIGHTS_CARD_SX } from "../_lib/insights.constants";
import { PENDING_LEAVE } from "../_lib/mock";

const columns: GridColDef[] = [
    {
        field: "name",
        headerName: "Employee",
        flex: 1,
        minWidth: 180,
        renderCell: ({ row }) => (
            <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ width: 28, height: 28, fontSize: 12 }}>{getInitials(row.name)}</Avatar>
                <Typography variant="body2">{row.name}</Typography>
            </Stack>
        ),
    },
    { field: "type", headerName: "Leave Type", flex: 1, minWidth: 140 },
    { field: "dates", headerName: "Dates", flex: 1, minWidth: 140 },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        minWidth: 190,
        renderCell: () => (
            <Stack direction="row" spacing={1}>
                <Button
                    size="small"
                    variant="contained"
                    sx={{
                        textTransform: "none",
                        color: "white",
                        minHeight: "28px !important",
                        maxHeight: "32px !important",
                        fontSize: 12,
                    }}
                >
                    Approve
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    sx={{
                        textTransform: "none",
                        minHeight: "32px !important",
                        maxHeight: "32px !important",
                        fontSize: 12,
                    }}
                >
                    Reject
                </Button>
            </Stack>
        ),
    },
];

export const PendingLeave = () => {
    return (
        <Box sx={INSIGHTS_CARD_SX}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Box>
                    <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.2, fontSize: 15 }}>
                        Pending Leave Requests
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: 13 }}>
                        Requests awaiting your review.
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    href="/leave"
                    size="small"
                    endIcon={<ArrowRight size={14} />}
                    sx={{
                        textTransform: "none",
                        flexShrink: 0,
                        minHeight: "32px !important",
                        maxHeight: "32px !important",
                    }}
                >
                    View all
                </Button>
            </Stack>

            <Box>
                <AppGrid
                    rows={PENDING_LEAVE}
                    columns={columns}
                    hideFooter
                    disableColumnMenu
                    disableRowSelectionOnClick
                    columnHeaderHeight={48}
                    rowHeight={56}
                    getRowId={(row) => row.id}
                />
            </Box>
        </Box>
    );
};

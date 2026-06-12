"use client";

import { Avatar, Box, Button, Stack, Typography } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AppGrid } from "@/components/datagrid";
import { getInitials } from "@/utils";
import { INSIGHTS_CARD_SX } from "../_lib/insights.constants";
import { RECENT_HIRES } from "../_lib/mock";

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
    { field: "email", headerName: "Company Email", flex: 1, minWidth: 200 },
    { field: "phone", headerName: "Phone", flex: 1, minWidth: 160 },
    { field: "department", headerName: "Department", flex: 1, minWidth: 140 },
    { field: "joined", headerName: "Joined", flex: 1, minWidth: 140 },
];

export const RecentHires = () => {
    return (
        <Box sx={INSIGHTS_CARD_SX}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                <Box>
                    <Typography variant="body1" fontWeight={500} sx={{ lineHeight: 1.2, fontSize: 15 }}>
                        Recent Hires
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: 13 }}>
                        Your newest team members.
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    href="/employees"
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
                    rows={RECENT_HIRES}
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

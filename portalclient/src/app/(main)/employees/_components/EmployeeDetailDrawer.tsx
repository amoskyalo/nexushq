"use client";

import { useState } from "react";
import { Box, Drawer, IconButton, Stack, Tab, Typography, Tabs } from "@mui/material";
import { X, FileText, CalendarDays } from "lucide-react";
import { EmployeeProfilePanel } from "./EmployeeProfilePanel";
import { DocumentsTab } from "./DocumentsTab";
import { LeaveTab } from "./LeaveTab";
import type { Employee } from "../_types/employee.types";
import { DatagridFooter } from "@/components/datagrid";

type EmployeeDetailDrawerProps = {
    employee: Employee | null;
    open: boolean;
    onClose: () => void;
};

const TAB_ITEMS = [
    { label: "Documents", value: "documents", icon: <FileText size={14} /> },
    { label: "Leave", value: "leave", icon: <CalendarDays size={14} /> },
];

export const EmployeeDetailDrawer = ({ employee, open, onClose }: EmployeeDetailDrawerProps) => {
    const [tab, setTab] = useState("documents");

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            sx={{
                backdropFilter: "blur(3px)",
            }}
            slotProps={{
                paper: {
                    sx: {
                        width: { xs: "100%", md: "75%", xl: "50%" },
                        maxWidth: "100%",
                        bgcolor: "transparent",
                        height: "100dvh",
                        overflow: "hidden",
                        padding: 1,
                        border: "none",
                        boxShadow: 0,
                    },
                },
            }}
        >
            <Box sx={{ bgcolor: "grey.200", height: "100%", borderRadius: 2, p: 1 }}>
                <Box sx={{ bgcolor: "#fff", height: "100%", borderRadius: 1 }}>
                    {employee && (
                        <Stack direction="column" sx={{ height: "100%" }}>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                sx={{ borderBottom: 1, borderColor: "divider", pl: 1.5, pr: 1 }}
                            >
                                <Typography variant="body1" fontWeight={700}>
                                    Employee details
                                </Typography>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <DatagridFooter pages={3} hideRowSizeSelector size="small" shape="circular" />
                                    <IconButton onClick={onClose} sx={{ color: "text.secondary" }} size="small">
                                        <X size={18} />
                                    </IconButton>
                                </Stack>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} alignItems="flex-start" sx={{ flex: 1 }}>
                                <Box
                                    sx={{
                                        width: { xs: "100%", md: 350, height: "100%" },
                                        flexShrink: 0,
                                    }}
                                >
                                    <EmployeeProfilePanel employee={employee} />
                                </Box>

                                <Box sx={{ flex: 1, width: "100%", minWidth: 0 }}>
                                    <Tabs
                                        value={tab}
                                        onChange={(_, value) => setTab(value)}
                                        sx={{
                                            borderBottom: 1,
                                            borderColor: "rgba(0, 0, 0, 0.08)",
                                            maxHeight: "35px !important",
                                            minHeight: "35px !important",
                                            height: "35px !important",
                                            px: 2,
                                            "& .MuiTabs-indicator": {
                                                height: "1px !important",
                                            },
                                        }}
                                    >
                                        {TAB_ITEMS.map((item) => (
                                            <Tab
                                                key={item.value}
                                                label={item.label}
                                                value={item.value}
                                                icon={item.icon}
                                                iconPosition="start"
                                                sx={{
                                                    textTransform: "none",
                                                    maxHeight: "35px !important",
                                                    minHeight: "35px !important",
                                                    height: "35px !important",
                                                    fontSize: 13,
                                                    minWidth: "max-content !important",
                                                    padding: "12px 8px !important",
                                                }}
                                            />
                                        ))}
                                    </Tabs>

                                    <Box sx={{ p: 2 }}>
                                        {tab === "documents" && <DocumentsTab />}
                                        {tab === "leave" && <LeaveTab />}
                                    </Box>
                                </Box>
                            </Stack>
                        </Stack>
                    )}
                </Box>
            </Box>
        </Drawer>
    );
};

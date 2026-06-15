"use client";

import { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { EllipsisVertical, Mail, Phone, Pencil, Trash2, UserCheck, UserX } from "lucide-react";
import { colorFromName, getInitials, formatters } from "@/utils";
import type { Employee } from "../_types/employee.types";

type EmployeeCardProps = {
    employee: Employee;
    onView: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onToggleStatus: (employee: Employee) => void;
    onDelete: (employee: Employee) => void;
};

export const EmployeeCard = ({ employee, onView, onEdit, onToggleStatus, onDelete }: EmployeeCardProps) => {
    const { formatDate } = formatters();
    const fullName = `${employee.firstName} ${employee.lastName}`;
    const isActive = employee.status === "ACTIVE";
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const closeMenu = () => setAnchorEl(null);

    return (
        <Box
            onClick={() => onView(employee)}
            sx={{
                border: 1,
                borderColor: "rgba(0, 0, 0, 0.08)",
                borderRadius: 3,
                height: "100%",
                cursor: "pointer",
                boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
                overflow: "hidden",
            }}
        >
            <Box sx={{ p: 2 }}>
                <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="space-between">
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            sx={{
                                width: 56,
                                height: 56,
                                fontWeight: 600,
                                bgcolor: colorFromName(fullName),
                                color: "text.primary",
                            }}
                        >
                            {getInitials(fullName)}
                        </Avatar>
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                border: "2px solid #fff",
                                bgcolor: isActive ? "success.main" : "error.main",
                            }}
                        />
                    </Box>
                    <IconButton
                        onClick={(event) => {
                            event.stopPropagation();
                            setAnchorEl(event.currentTarget);
                        }}
                    >
                        <EllipsisVertical />
                    </IconButton>
                </Stack>
                <Box sx={{ mt: 1 }}>
                    <Typography variant="body1" fontWeight={600} noWrap>
                        {fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
                        {employee.role}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ p: 2, bgcolor: "grey.50" }}>
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            Department
                        </Typography>
                        <Typography variant="body2" fontWeight={600} noWrap>
                            {employee.department?.name ?? "—"}
                        </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                        <Typography variant="caption" sx={{ color: "text.secondary" }}>
                            Hired Date
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                            {formatDate(employee.createdAt, true)}
                        </Typography>
                    </Box>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, color: "text.secondary" }}>
                    <Mail size={14} />
                    <Typography variant="body2" sx={{ color: "text.primary" }} noWrap>
                        {employee.email}
                    </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5, color: "text.secondary" }}>
                    <Phone size={14} />
                    <Typography variant="body2" sx={{ color: "text.primary" }} noWrap>
                        {employee.phoneNumber}
                    </Typography>
                </Stack>
            </Box>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{
                    paper: { sx: { minWidth: 130, borderRadius: 3.5, border: 1, borderColor: "rgba(0, 0, 0, 0.09)" } },
                }}
            >
                <MenuItem
                    onClick={() => {
                        closeMenu();
                        onEdit(employee);
                    }}
                    sx={{ gap: 1 }}
                >
                    <Pencil size={16} />
                    <Typography variant="body2">Edit</Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        closeMenu();
                        onToggleStatus(employee);
                    }}
                    sx={{ gap: 1 }}
                >
                    {isActive ? <UserX size={16} /> : <UserCheck size={16} />}
                    <Typography variant="body2">{isActive ? "Deactivate" : "Activate"}</Typography>
                </MenuItem>

                <MenuItem
                    onClick={() => {
                        closeMenu();
                        onDelete(employee);
                    }}
                    sx={{ gap: 1, color: "error.main" }}
                >
                    <Trash2 size={16} />
                    <Typography variant="body2">Delete</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

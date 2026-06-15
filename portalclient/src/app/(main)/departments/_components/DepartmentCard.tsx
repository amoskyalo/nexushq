"use client";

import { Box, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import Link from "next/link";
import { ArrowRight, Pencil, Trash2 } from "lucide-react";
import { colorFromName } from "@/utils";
import type { Department } from "../_types/department.types";

type DepartmentCardProps = {
    department: Department;
    onEdit: (department: Department) => void;
    onDelete: (department: Department) => void;
};

export const DepartmentCard = ({ department, onEdit, onDelete }: DepartmentCardProps) => {
    const panelColor = colorFromName(department.name);

    return (
        <Box
            sx={{
                border: 1,
                borderColor: "rgba(0, 0, 0, 0.05)",
                backgroundColor: "rgba(0, 0, 0, 0.01)",
                borderRadius: 4.5,
                p: 0.5,
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Box sx={{ flex: 1, bgcolor: panelColor, borderRadius: 3.5, p: 2.5, position: "relative" }}>
                <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary", lineHeight: 1.15, pr: 3 }}>
                    {department.name}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                    {department.description}
                </Typography>
            </Box>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    textDecoration: "none",
                    color: "text.primary",
                    px: 1,
                    py: 1.2,
                }}
            >
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={1}
                    component={Link}
                    href={`/departments/${department.id}`}
                >
                    <Typography variant="body2" fontWeight={600}>
                        View department
                    </Typography>
                    <ArrowRight size={16} />
                </Stack>

                <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
                    <Box
                        onClick={() => onEdit(department)}
                        sx={{
                            width: 28,
                            height: 28,
                            borderRadius: 16,
                            border: 1,
                            borderColor: (theme) => alpha(theme.palette.primary.main, 0.3),
                            color: "primary.main",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": { bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08) },
                        }}
                    >
                        <Pencil size={16} />
                    </Box>

                    <Box
                        onClick={() => onDelete(department)}
                        sx={{
                            width: 28,
                            height: 28,
                            borderRadius: 16,
                            border: 1,
                            borderColor: (theme) => alpha(theme.palette.error.main, 0.3),
                            color: "error.main",
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": { bgcolor: (theme) => alpha(theme.palette.error.main, 0.08) },
                        }}
                    >
                        <Trash2 size={16} />
                    </Box>
                </Stack>
            </Stack>
        </Box>
    );
};

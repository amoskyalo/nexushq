"use client";

import type { ReactNode } from "react";
import { Box, Stack, Typography, type SxProps, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

export type StatColor = "primary" | "secondary" | "success" | "warning" | "error" | "info";

export type StatCardProps = {
    label: string;
    value: string | number;
    subtext?: string;
    icon?: ReactNode;
    color?: StatColor;
    sx?: SxProps<Theme>;
};

export const StatCard = ({ label, value, subtext, icon, color = "primary", sx }: StatCardProps) => {
    return (
        <Box
            sx={{
                borderRadius: 4,
                p: 2.5,
                height: "100%",
                boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
                ...sx,
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {label}
                </Typography>

                {icon && (
                    <Box
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 34,
                            height: 34,
                            borderRadius: 16,
                            color: `${color}.main`,
                            bgcolor: (theme) => alpha(theme.palette[color].main, 0.1),
                        }}
                    >
                        {icon}
                    </Box>
                )}
            </Stack>

            <Typography variant="h5" fontWeight={600} sx={{ lineHeight: 1.1 }}>
                {value}
            </Typography>

            {subtext && (
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                    {subtext}
                </Typography>
            )}
        </Box>
    );
};

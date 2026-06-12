"use client";

import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import type { OrganizationType } from "@/context";
import { CARD_SX } from "../_lib/dashboard.constants";

export const SetupChecklist = ({ org }: { org: OrganizationType }) => {
    const items = [
        {
            label: "Create your organization",
            description: "Your workspace is ready to go.",
            href: "/organizations",
            done: true,
        },
        {
            label: "Enable modules",
            description: "Choose the tools your team needs.",
            href: "/organizations",
            done: org.modules.length > 0,
        },
        {
            label: "Add departments",
            description: "Group your people into teams.",
            href: "/departments",
            done: false,
        },
        {
            label: "Invite your team",
            description: "Bring your colleagues on board.",
            href: "/settings",
            done: false,
        },
        {
            label: "Add your first employee",
            description: "Start building your people directory.",
            href: "/employees",
            done: false,
        },
    ];

    const completed = items.filter((item) => item.done).length;
    const progress = Math.round((completed / items.length) * 100);

    return (
        <Box sx={CARD_SX}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                        Finish setting up
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary" }}>
                        Complete these steps to get your workspace ready.
                    </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500, whiteSpace: "nowrap" }}>
                    {completed}/{items.length}
                </Typography>
            </Stack>

            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: 6,
                    borderRadius: 3,
                    mb: 2,
                    bgcolor: "action.hover",
                    "& .MuiLinearProgress-bar": { borderRadius: 3 },
                }}
            />

            <Stack spacing={0.5}>
                {items.map((item) => (
                    <Stack
                        key={item.label}
                        component={Link}
                        href={item.href}
                        direction="row"
                        spacing={1.5}
                        alignItems="center"
                        sx={{
                            textDecoration: "none",
                            color: "inherit",
                            borderRadius: 2,
                            px: 1,
                            py: 1,
                            "&:hover": { bgcolor: "action.hover" },
                        }}
                    >
                        <Box
                            sx={{
                                width: 22,
                                height: 22,
                                flexShrink: 0,
                                borderRadius: "50%",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: item.done ? "white" : "text.disabled",
                                bgcolor: item.done ? "primary.main" : "transparent",
                                border: item.done ? 0 : 1,
                                borderColor: "divider",
                            }}
                        >
                            {item.done && <Check size={14} />}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    color: item.done ? "text.secondary" : "text.primary",
                                    textDecoration: item.done ? "line-through" : "none",
                                }}
                            >
                                {item.label}
                            </Typography>
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {item.description}
                            </Typography>
                        </Box>

                        {!item.done && (
                            <Box component="span" sx={{ display: "inline-flex", color: "text.disabled" }}>
                                <ChevronRight size={16} />
                            </Box>
                        )}
                    </Stack>
                ))}
            </Stack>
        </Box>
    );
};

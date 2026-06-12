"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { OrganizationModule } from "@/context";
import { MODULE_META, CARD_SX } from "../_lib/dashboard.constants";

export const ModuleOverview = ({ modules }: { modules: OrganizationModule[] }) => {
    if (!modules?.length) return null;

    return (
        <Box>
            <Box sx={{ mb: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                    Modules
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    The modules enabled for this organization.
                </Typography>
            </Box>

            <Grid container spacing={2}>
                {modules.map((module) => {
                    const meta = MODULE_META[module];
                    if (!meta) return null;

                    return (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={module}>
                            <Box
                                sx={{
                                    ...CARD_SX,
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 1,
                                    boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
                                }}
                            >
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "primary.main" }}>
                                    {meta.icon}
                                    <Typography variant="body2" fontWeight={600} sx={{ color: "text.primary" }}>
                                        {meta.label}
                                    </Typography>
                                </Stack>

                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 13, flex: 1 }}>
                                    {meta.description}
                                </Typography>

                                <Stack
                                    component={Link}
                                    href={meta.insightsHref}
                                    direction="row"
                                    spacing={0.5}
                                    alignItems="center"
                                    sx={{
                                        color: "primary.main",
                                        textDecoration: "none",
                                        fontSize: 13,
                                        fontWeight: 500,
                                    }}
                                >
                                    View insights <ArrowRight size={14} style={{ marginLeft: 4 }} />
                                </Stack>
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
};

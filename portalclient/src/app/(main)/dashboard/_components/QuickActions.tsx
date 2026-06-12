"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { QUICK_ACTIONS, CARD_SX } from "../_lib/dashboard.constants";

export const QuickActions = () => {
    return (
        <Box sx={CARD_SX}>
            <Box sx={{ mb: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                    Quick actions
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Jump straight into common tasks.
                </Typography>
            </Box>

            <Stack spacing={2}>
                {QUICK_ACTIONS.map((action) => (
                    <Box
                        key={action.title}
                        sx={{
                            borderRadius: 4,
                            p: 2.5,
                            boxShadow: "0 2px 16px rgba(0, 0, 0, 0.08)",
                        }}
                    >
                        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: "primary.main", mb: 0.5 }}>
                            {action.icon}
                            <Typography variant="body2" fontWeight={600} sx={{ color: "text.primary" }}>
                                {action.title}
                            </Typography>
                        </Stack>

                        <Typography variant="body2" sx={{ color: "text.secondary", fontSize: 13, mb: 1.5 }}>
                            {action.description}
                        </Typography>

                        <Button
                            component={Link}
                            href={action.href}
                            variant="outlined"
                            size="small"
                            sx={{
                                textTransform: "none",
                                borderRadius: "16px",
                                minHeight: "28px !important",
                                maxHeight: "28px !important",
                                fontSize: "12px !important",
                            }}
                        >
                            {action.buttonLabel}
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};

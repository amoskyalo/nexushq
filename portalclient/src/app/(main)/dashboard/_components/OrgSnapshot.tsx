"use client";

import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Building2 } from "lucide-react";
import type { OrganizationType } from "@/context";
import { StatusButton } from "@/components/buttons";
import { ModuleBadges } from "@/app/(main)/organizations/_components/ModuleBadges";
import { INDUSTRY_OPTIONS } from "@/app/onboarding/_lib/onboarding.constants";
import { formatters } from "@/utils";
import { CARD_SX } from "../_lib/dashboard.constants";

export const OrgSnapshot = ({ org }: { org: OrganizationType }) => {
    const { formatDate } = formatters();
    const industryLabel = INDUSTRY_OPTIONS.find((option) => option.value === org.industry)?.label ?? org.industry;

    return (
        <Box sx={CARD_SX}>
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems={{ sm: "center" }}
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                        variant="rounded"
                        sx={{ width: 48, height: 48, bgcolor: "primary.main", color: "primary.contrastText" }}
                    >
                        <Building2 size={24} />
                    </Avatar>
                    <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant="h6" fontWeight={600}>
                                {org.name}
                            </Typography>
                            <StatusButton status={org.status} />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                            {org.slug}.nexushq.org · {industryLabel} · Created {formatDate(org.createdAt, true)}
                        </Typography>
                    </Box>
                </Stack>

                <ModuleBadges modules={org.modules} />
            </Stack>
        </Box>
    );
};

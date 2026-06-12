"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import { useAuth, useOrganization } from "@/context";
import { formatters } from "@/utils";
import { ModuleOverview } from "./_components/ModuleOverview";
import { SetupChecklist } from "./_components/SetupChecklist";
import { QuickActions } from "./_components/QuickActions";

const DashboardPage = () => {
    const { me } = useAuth();
    const { selectedOrg } = useOrganization();
    const { getGreeting } = formatters();

    return (
        <Stack spacing={3}>
            <Box sx={{ p: 2, borderRadius: 3, backgroundColor: "action.hover" }}>
                <Typography variant="h5" fontWeight={600}>
                    {getGreeting()}, {me?.firstName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Here&apos;s an overview of {selectedOrg?.name}.
                </Typography>
            </Box>

            <ModuleOverview modules={selectedOrg?.modules} />

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <SetupChecklist org={selectedOrg} />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <QuickActions />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default DashboardPage;

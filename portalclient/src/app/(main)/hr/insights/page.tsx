"use client";

import { Grid, Stack } from "@mui/material";
import { PageContainer } from "@/components/containers";
import { StatCard } from "@/components/cards";
import { HeadcountByDepartment } from "./_components/HeadcountByDepartment";
import { EmployeeGrowth } from "./_components/EmployeeGrowth";
import { LeaveByType } from "./_components/LeaveByType";
import { RecentHires } from "./_components/RecentHires";
import { PendingLeave } from "./_components/PendingLeave";
import { HR_STATS } from "./_lib/mock";

const HrInsightsPage = () => {
    return (
        <PageContainer title="HR Insights" description="An overview of your people and HR activity.">
            <Stack spacing={3} sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                    {HR_STATS.map((stat) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
                            <StatCard {...stat} />
                        </Grid>
                    ))}
                </Grid>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <HeadcountByDepartment />
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <EmployeeGrowth />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <LeaveByType />
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <PendingLeave />
                    </Grid>
                </Grid>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12 }}>
                        <RecentHires />
                    </Grid>
                </Grid>
            </Stack>
        </PageContainer>
    );
};

export default HrInsightsPage;

"use client";

import type { ReactNode } from "react";
import { Avatar, Box, Divider, Stack, Typography, Grid } from "@mui/material";
import { StatusButton } from "@/components/buttons";
import { colorFromName, formatters, getInitials } from "@/utils";
import type { Employee } from "../_types/employee.types";

const mapEmploymentStatus = {
    FULL_TIME: "Full time",
    PART_TIME: "Part time",
    CONTRACT: "Contract",
    INTERNSHIP: "Internship",
};

const InfoRow = ({ label, value, children }: { label: string; value?: string; children?: ReactNode }) => (
    <Grid container spacing={1} sx={{ py: 1 }}>
        <Grid size={5}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {label}
            </Typography>
        </Grid>
        {children ?? (
            <Grid size={7}>
                <Typography variant="body2" fontWeight={500} sx={{ wordBreak: "break-word" }}>
                    : {value}
                </Typography>
            </Grid>
        )}
    </Grid>
);

const SectionTitle = ({ children }: { children: ReactNode }) => (
    <Typography variant="body2" fontWeight={600} sx={{ mb: 0.5 }}>
        {children}
    </Typography>
);

export const EmployeeProfilePanel = ({ employee }: { employee: Employee }) => {
    const { formatDate, employmentDurationInMonths } = formatters();
    const fullName = `${employee.firstName} ${employee.lastName}`;

    return (
        <Box sx={{ borderRight: 1, borderRightColor: "divider", height: "100%", overflow: "hidden", p: 2 }}>
            <Stack direction="row" spacing={1}>
                <Avatar
                    sx={{
                        width: 38,
                        height: 38,
                        fontSize: 14,
                        fontWeight: 600,
                        bgcolor: colorFromName(fullName),
                        color: "text.primary",
                    }}
                >
                    {getInitials(fullName)}
                </Avatar>
                <Box>
                    <Typography variant="body2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                        {fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "text.secondary", fontSize: 12, mt: 0.4 }}>
                        {employee.role} · {employee.department?.name ?? "—"}
                    </Typography>
                </Box>
                {/* <StatusButton status={employee.status} /> */}
            </Stack>

            <Divider sx={{ my: 2 }} />

            <SectionTitle>Personal Information</SectionTitle>
            <InfoRow label="Email" value={employee.email} />
            <InfoRow label="Phone number" value={employee.phoneNumber} />

            <Divider sx={{ my: 2 }} />

            <SectionTitle>Employment Information</SectionTitle>
            <InfoRow label="Department" value={employee.department?.name ?? "—"} />
            <InfoRow label="Job title" value={employee.role} />
            <InfoRow label="Employee ID" value={employee.employeeId} />
            <InfoRow
                label="Employment status"
                value={[
                    mapEmploymentStatus[employee.employmentStatus],
                    employmentDurationInMonths(employee.createdAt, employee.employmentEndDate),
                ]
                    .filter(Boolean)
                    .join(" ")}
            />
            <InfoRow label="Start date" value={formatDate(employee.createdAt, true)} />
            {employee.employmentEndDate && (
                <InfoRow label="End date" value={formatDate(employee.employmentEndDate, true)} />
            )}
        </Box>
    );
};

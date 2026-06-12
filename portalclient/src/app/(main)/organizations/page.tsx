"use client";

import { useState } from "react";
import { useDataGrid } from "@/hooks/useDataGrid";
import { PageContainer } from "@/components/containers";
import { OrgFormDialog } from "./_components/OrgFormDialog";
import { ModuleBadges } from "./_components/ModuleBadges";
import { StatusButton } from "@/components/buttons";
import { OrgConfirmDialog, type OrgConfirmState } from "./_components/OrgConfirmDialog";
import { useDeleteOrganization, useSetOrganizationStatus } from "./_lib/useOrganizationActions";
import type { OrganizationType } from "@/context";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Pencil, PauseCircle, PlayCircle, Trash2 } from "lucide-react";

const OrganizationPage = () => {
    const [open, setOpen] = useState(false);
    const [editingOrg, setEditingOrg] = useState<OrganizationType | undefined>(undefined);
    const [confirm, setConfirm] = useState<OrgConfirmState>(null);

    const openCreate = () => {
        setEditingOrg(undefined);
        setOpen(true);
    };

    const openEdit = (row: OrganizationType) => {
        setEditingOrg(row);
        setOpen(true);
    };

    const closeConfirm = () => setConfirm(null);

    const { render, refetch } = useDataGrid({
        url: "/api/organizations",
        onAdd: openCreate,
        grid: {
            actions: ["options"],
            options: [
                {
                    name: "Edit",
                    icon: <Pencil />,
                    onClick: (row) => openEdit(row),
                },
                {
                    name: "Suspend",
                    icon: <PauseCircle />,
                    hidden: (row) => row?.status !== "ACTIVE",
                    onClick: (row) => setConfirm({ action: "suspend", org: row }),
                },
                {
                    name: "Reactivate",
                    icon: <PlayCircle />,
                    hidden: (row) => row?.status !== "SUSPENDED",
                    onClick: (row) => setConfirm({ action: "activate", org: row }),
                },
                {
                    name: "Delete",
                    icon: <Trash2 />,
                    error: true,
                    onClick: (row) => setConfirm({ action: "delete", org: row }),
                },
            ],
            columns: [
                {
                    field: "name",
                    headerName: "Organization Name",
                    flex: 1,
                    minWidth: 250,
                    renderCell: ({ row }) => {
                        return (
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Avatar sx={{ height: 28, width: 28, fontSize: 12 }}>AO</Avatar>
                                <Box>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        {row.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ lineHeight: 1, fontSize: 12, color: "text.secondary" }}
                                    >
                                        {`${row.slug}.nexushq.org`}
                                    </Typography>
                                </Box>
                            </Stack>
                        );
                    },
                },
                { field: "employees", headerName: "Total employees", flex: 1, minWidth: 100 },
                { field: "industry", headerName: "Industry", flex: 1, minWidth: 100 },
                {
                    field: "modules",
                    headerName: "Modules",
                    flex: 1,
                    minWidth: 200,
                    sortable: false,
                    renderCell: ({ row }) => <ModuleBadges modules={row.modules ?? []} />,
                },
                {
                    field: "status",
                    headerName: "Status",
                    flex: 1,
                    minWidth: 120,
                    renderCell: ({ row }) => <StatusButton status={row.status} />,
                },
                { field: "departments", headerName: "Total departments", flex: 1, minWidth: 100 },
                {
                    field: "createdAt",
                    headerName: "Created At",
                    flex: 1,
                    minWidth: 150,
                    formatValueTo: "date",
                    showTime: false,
                },
            ],
        },
    });

    const { deleteOrganization, loading: deleting } = useDeleteOrganization({
        onSuccess: () => {
            refetch();
            closeConfirm();
        },
    });

    const { setStatus, loading: settingStatus } = useSetOrganizationStatus({
        onSuccess: () => {
            refetch();
            closeConfirm();
        },
    });

    const handleConfirm = () => {
        if (!confirm) return;
        if (confirm.action === "delete") {
            deleteOrganization(confirm.org.id);
        } else {
            setStatus(confirm.org.id, confirm.action === "suspend" ? "SUSPENDED" : "ACTIVE");
        }
    };

    return (
        <PageContainer
            title="Organizations"
            description="All your organizations, in one place. Create, manage, and keep track of every organization."
        >
            {render()}

            <OrgFormDialog
                open={open}
                editingOrg={editingOrg}
                onClose={() => setOpen(false)}
                onSubmitted={() => refetch()}
            />

            <OrgConfirmDialog
                state={confirm}
                loading={deleting || settingStatus}
                onCancel={closeConfirm}
                onConfirm={handleConfirm}
            />
        </PageContainer>
    );
};

export default OrganizationPage;

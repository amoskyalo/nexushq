"use client";

import { useState } from "react";
import { Avatar, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { Search } from "lucide-react";
import { PageContainer } from "@/components/containers";
import { ActionDialog } from "@/components/dialogs";
import { DatagridFooter } from "@/components/datagrid";
import { Searchbar } from "@/components/inputs";
import { CreateButton, FilterButton } from "@/components/buttons";
import { usePagination } from "@/hooks";
import { useOrganization } from "@/context";
import { useDepartments, useDeleteDepartment } from "./_lib/useDepartments";
import { DepartmentCard } from "./_components/DepartmentCard";
import { DepartmentFormDialog } from "./_components/DepartmentFormDialog";
import type { Department } from "./_types/department.types";

const DepartmentsPage = () => {
    const { selectedOrg } = useOrganization();
    const [open, setOpen] = useState(false);
    const [editingDepartment, setEditingDepartment] = useState<Department | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);
    const [search, setSearch] = useState("");
    const { departments, loading, refetch } = useDepartments(selectedOrg.id);

    const { deleteDepartment, loading: deleting } = useDeleteDepartment({
        onSuccess: () => {
            refetch();
            setDeleteTarget(null);
        },
    });

    const openCreate = () => {
        setEditingDepartment(undefined);
        setOpen(true);
    };

    const openEdit = (department: Department) => {
        setEditingDepartment(department);
        setOpen(true);
    };

    const query = search.trim().toLowerCase();
    const filteredDepartments = query
        ? departments.filter(
              (department) =>
                  department.name.toLowerCase().includes(query) || department.description.toLowerCase().includes(query),
          )
        : departments;

    const { pageItems, pages } = usePagination(filteredDepartments);

    return (
        <PageContainer title="Departments" description="Organize your people into teams.">
            <Stack spacing={2}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Searchbar value={search} onChange={setSearch} />
                    <FilterButton />
                    <CreateButton onClick={openCreate} />
                </Stack>

                {loading && (
                    <Stack alignItems="center" sx={{ py: 6 }}>
                        <CircularProgress size={22} />
                    </Stack>
                )}

                {!loading && departments.length === 0 && (
                    <Stack alignItems="center" sx={{ py: 6 }}>
                        <Avatar>
                            <Search />
                        </Avatar>
                        <Typography variant="body1" fontWeight={600} sx={{ mt: 1 }}>
                            No departments yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create your first department to start grouping employees.
                        </Typography>
                    </Stack>
                )}

                {!loading && departments.length > 0 && filteredDepartments.length === 0 && (
                    <Stack alignItems="center" sx={{ py: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                            No departments match your search.
                        </Typography>
                    </Stack>
                )}

                {!loading && filteredDepartments.length > 0 && (
                    <>
                        <Grid container spacing={2}>
                            {pageItems.map((department) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={department.id}>
                                    <DepartmentCard
                                        department={department}
                                        onEdit={openEdit}
                                        onDelete={setDeleteTarget}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <DatagridFooter pages={pages} />
                    </>
                )}
            </Stack>

            <DepartmentFormDialog
                open={open}
                orgId={selectedOrg.id}
                editingDepartment={editingDepartment}
                onClose={() => setOpen(false)}
                onSubmitted={() => refetch()}
            />

            <ActionDialog
                open={Boolean(deleteTarget)}
                loading={deleting}
                dialogTitle="Delete department?"
                contentText={
                    deleteTarget
                        ? `This permanently deletes "${deleteTarget.name}". This action cannot be undone.`
                        : undefined
                }
                onOkayButtonText="Delete"
                onCancelButtonText="Cancel"
                onCancel={() => setDeleteTarget(null)}
                onOkay={() => deleteTarget && deleteDepartment(deleteTarget.id)}
                blur
            />
        </PageContainer>
    );
};

export default DepartmentsPage;

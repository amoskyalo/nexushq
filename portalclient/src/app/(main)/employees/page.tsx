"use client";

import { useState } from "react";
import { Avatar, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { PageContainer } from "@/components/containers";
import { ActionDialog } from "@/components/dialogs";
import { DatagridFooter } from "@/components/datagrid";
import { Searchbar } from "@/components/inputs";
import { CreateButton } from "@/components/buttons";
import { usePagination } from "@/hooks";
import { useOrganization } from "@/context";
import { useEmployees, useDeleteEmployee, useSetEmployeeStatus } from "./_lib/useEmployees";
import { EmployeeCard } from "./_components/EmployeeCard";
import { EmployeeFormDialog } from "./_components/EmployeeFormDialog";
import { EmployeeDetailDrawer } from "./_components/EmployeeDetailDrawer";
import type { Employee } from "./_types/employee.types";
import { Search } from "lucide-react";

const EmployeesPage = () => {
    const { selectedOrg } = useOrganization();
    const [open, setOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>(undefined);
    const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
    const [statusTarget, setStatusTarget] = useState<Employee | null>(null);
    const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
    const [search, setSearch] = useState("");
    const { employees, loading, refetch } = useEmployees(selectedOrg.id);

    const { setStatus, loading: settingStatus } = useSetEmployeeStatus({
        onSuccess: () => {
            refetch();
            setStatusTarget(null);
        },
    });
    const { deleteEmployee, loading: deleting } = useDeleteEmployee({
        onSuccess: () => {
            refetch();
            setDeleteTarget(null);
        },
    });

    const openCreate = () => {
        setEditingEmployee(undefined);
        setOpen(true);
    };

    const openEdit = (employee: Employee) => {
        setEditingEmployee(employee);
        setOpen(true);
    };

    const confirmStatus = () => {
        if (!statusTarget) return;
        setStatus(statusTarget.id, statusTarget.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE");
    };

    const query = search.trim().toLowerCase();
    const filteredEmployees = query
        ? employees.filter(
              (employee) =>
                  `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(query) ||
                  employee.email.toLowerCase().includes(query) ||
                  employee.role.toLowerCase().includes(query),
          )
        : employees;

    const { pageItems, pages } = usePagination(filteredEmployees);

    return (
        <PageContainer title="Employees" description="Manage your organization's people.">
            <Stack spacing={2} sx={{ mt: 1 }}>
                <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                    <Searchbar value={search} onChange={setSearch} />
                    <CreateButton label="Add Employee" onClick={openCreate} />
                </Stack>

                {loading && (
                    <Stack alignItems="center" sx={{ py: 6 }}>
                        <CircularProgress size={22} />
                    </Stack>
                )}

                {!loading && employees.length === 0 && (
                    <Stack alignItems="center" sx={{ py: 6 }}>
                        <Avatar>
                            <Search />
                        </Avatar>
                        <Typography variant="body1" fontWeight={600}>
                            No employees yet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Onboard your first team member to get started.
                        </Typography>
                    </Stack>
                )}

                {!loading && employees.length > 0 && filteredEmployees.length === 0 && (
                    <Stack alignItems="center" sx={{ py: 6 }}>
                        <Typography variant="body2" color="text.secondary">
                            No employees match your search.
                        </Typography>
                    </Stack>
                )}

                {!loading && filteredEmployees.length > 0 && (
                    <>
                        <Grid container spacing={2}>
                            {pageItems.map((employee) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} key={employee.id}>
                                    <EmployeeCard
                                        employee={employee}
                                        onView={setViewEmployee}
                                        onEdit={openEdit}
                                        onToggleStatus={setStatusTarget}
                                        onDelete={setDeleteTarget}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                            <Typography variant="body2" color="text.secondary">
                                Showing 1 to 10 of 12 entries
                            </Typography>
                            <DatagridFooter pages={pages} />
                        </Stack>
                    </>
                )}
            </Stack>

            <EmployeeFormDialog
                open={open}
                orgId={selectedOrg.id}
                editingEmployee={editingEmployee}
                onClose={() => setOpen(false)}
                onSubmitted={() => refetch()}
            />

            <ActionDialog
                open={Boolean(deleteTarget)}
                loading={deleting}
                dialogTitle="Delete employee?"
                contentText={
                    deleteTarget
                        ? `This permanently deletes "${deleteTarget.firstName} ${deleteTarget.lastName}". This action cannot be undone.`
                        : undefined
                }
                onOkayButtonText="Delete"
                onCancelButtonText="Cancel"
                onCancel={() => setDeleteTarget(null)}
                onOkay={() => deleteTarget && deleteEmployee(deleteTarget.id)}
                blur
            />

            <ActionDialog
                open={Boolean(statusTarget)}
                loading={settingStatus}
                dialogTitle={statusTarget?.status === "ACTIVE" ? "Deactivate employee?" : "Activate employee?"}
                contentText={
                    statusTarget
                        ? statusTarget.status === "ACTIVE"
                            ? `"${statusTarget.firstName} ${statusTarget.lastName}" will be marked inactive and lose access.`
                            : `"${statusTarget.firstName} ${statusTarget.lastName}" will be reactivated and regain access.`
                        : undefined
                }
                onOkayButtonText={statusTarget?.status === "ACTIVE" ? "Deactivate" : "Activate"}
                onCancelButtonText="Cancel"
                color={statusTarget?.status === "ACTIVE" ? "error" : "primary"}
                onCancel={() => setStatusTarget(null)}
                onOkay={confirmStatus}
                blur
            />

            <EmployeeDetailDrawer
                employee={viewEmployee}
                open={Boolean(viewEmployee)}
                onClose={() => setViewEmployee(null)}
            />
        </PageContainer>
    );
};

export default EmployeesPage;

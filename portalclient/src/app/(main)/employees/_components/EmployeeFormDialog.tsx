"use client";

import { useMemo } from "react";
import { Grid, Stack } from "@mui/material";
import { Form, Formik } from "formik";
import dayjs from "dayjs";
import { FormDialog } from "@/components/dialogs";
import { TextInput } from "@/components/inputs/TextInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { DatePickerInput } from "@/components/inputs/DatePickerInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { getFormikFieldProps } from "@/utils/generateFieldProps";
import { useDepartments } from "@/app/(main)/departments/_lib/useDepartments";
import { useCreateEmployee, useUpdateEmployee } from "../_lib/useEmployees";
import { employeeValidationSchema } from "../_lib/createEmployeeValidation";
import { EMPLOYMENT_STATUS_OPTIONS, isTimeBound } from "../_lib/employment";
import type { DocumentType, Employee, EmployeeFormValues } from "../_types/employee.types";

type EmployeeFormDialogProps = {
    open: boolean;
    orgId: string;
    editingEmployee?: Employee;
    onClose: () => void;
    onSubmitted: () => void;
};

const DOC_OPTIONS = [
    { value: "ID_CARD", label: "ID Card" },
    { value: "PASSPORT", label: "Passport" },
    { value: "DRIVING_LICENSE", label: "Driving License" },
];

const emptyValues: EmployeeFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
    departmentId: "",
    docs: "",
    employmentStatus: "FULL_TIME",
    employmentEndDate: "",
};

export const EmployeeFormDialog = ({ open, orgId, editingEmployee, onClose, onSubmitted }: EmployeeFormDialogProps) => {
    const isEdit = Boolean(editingEmployee);
    const { departments, loading: loadingDepartments } = useDepartments(orgId);

    const onSuccess = () => {
        onSubmitted();
        onClose();
    };

    const { createEmployee, loading: creating } = useCreateEmployee({ onSuccess });
    const { updateEmployee, loading: updating } = useUpdateEmployee({ onSuccess });

    const departmentOptions = departments
        .filter((department) => department.status === "ACTIVE")
        .map((department) => ({ value: department.id, label: department.name }));

    const initialValues = useMemo<EmployeeFormValues>(() => {
        if (!editingEmployee) return emptyValues;
        return {
            firstName: editingEmployee.firstName,
            lastName: editingEmployee.lastName,
            email: editingEmployee.email,
            phoneNumber: editingEmployee.phoneNumber,
            role: editingEmployee.role,
            departmentId: editingEmployee.departmentId,
            docs: editingEmployee.docs ?? "",
            employmentStatus: editingEmployee.employmentStatus,
            employmentEndDate: editingEmployee.employmentEndDate
                ? dayjs(editingEmployee.employmentEndDate).format("YYYY-MM-DD")
                : "",
        };
    }, [editingEmployee]);

    const handleSubmit = (values: EmployeeFormValues) => {
        const { docs, employmentEndDate, ...rest } = values;
        const docsPayload = docs ? { docs: docs as DocumentType } : {};
        const employmentEndPayload = {
            employmentEndDate: isTimeBound(values.employmentStatus) ? employmentEndDate || null : null,
        };

        if (isEdit && editingEmployee) {
            updateEmployee(editingEmployee.id, { ...rest, ...docsPayload, ...employmentEndPayload });
        } else {
            createEmployee({ ...rest, orgId, ...docsPayload, ...employmentEndPayload });
        }
    };

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            dialogTitle={isEdit ? "Edit employee" : "Add employee"}
            dialogSubTitle={isEdit ? "Update this employee's details." : "Onboard a new team member."}
            maxWidth="sm"
        >
            <Formik
                initialValues={initialValues}
                validationSchema={employeeValidationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                enableReinitialize
            >
                {(formik) => (
                    <Form>
                        <Stack spacing={2.5} sx={{ pt: 1 }}>
                            <Grid container columnSpacing={2} rowSpacing={2.5}>
                                <Grid size={6}>
                                    <TextInput
                                        label="First name"
                                        placeholder="e.g. Jane"
                                        {...getFormikFieldProps({ formik, field: "firstName" })}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <TextInput
                                        label="Last name"
                                        placeholder="e.g. Doe"
                                        {...getFormikFieldProps({ formik, field: "lastName" })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <TextInput
                                        label="Email"
                                        placeholder="jane@company.com"
                                        {...getFormikFieldProps({ formik, field: "email" })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <TextInput
                                        label="Phone number"
                                        placeholder="e.g. +254 712 345 678"
                                        {...getFormikFieldProps({ formik, field: "phoneNumber" })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <TextInput
                                        label="Role"
                                        placeholder="e.g. Cashier"
                                        {...getFormikFieldProps({ formik, field: "role" })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <SelectInput
                                        label="Department"
                                        placeholder="Select a department"
                                        loading={loadingDepartments}
                                        options={departmentOptions}
                                        {...getFormikFieldProps({ formik, field: "departmentId", isSelect: true })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <SelectInput
                                        label="Document type (optional)"
                                        placeholder="Select a document type"
                                        options={DOC_OPTIONS}
                                        {...getFormikFieldProps({ formik, field: "docs", isSelect: true })}
                                    />
                                </Grid>

                                <Grid size={6}>
                                    <SelectInput
                                        label="Employment status"
                                        placeholder="Select an employment status"
                                        options={EMPLOYMENT_STATUS_OPTIONS}
                                        {...getFormikFieldProps({ formik, field: "employmentStatus", isSelect: true })}
                                        onChange={(value: string) => {
                                            formik.setFieldValue("employmentStatus", value);
                                            if (!isTimeBound(value)) formik.setFieldValue("employmentEndDate", "");
                                        }}
                                    />
                                </Grid>
                            </Grid>

                            {isTimeBound(formik.values.employmentStatus) && (
                                <DatePickerInput
                                    label="End date"
                                    minDate={dayjs().add(1, "day")}
                                    {...getFormikFieldProps({ formik, field: "employmentEndDate", isDatePicker: true })}
                                />
                            )}

                            <LoadingButton
                                type="submit"
                                loading={creating || updating}
                                variant="contained"
                                color="secondary"
                                sx={{ color: "white", marginTop: "32px !important" }}
                            >
                                {isEdit ? "Save changes" : "Add employee"}
                            </LoadingButton>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </FormDialog>
    );
};

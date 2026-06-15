"use client";

import { useMemo } from "react";
import { Stack } from "@mui/material";
import { Form, Formik } from "formik";
import { FormDialog } from "@/components/dialogs";
import { TextInput } from "@/components/inputs/TextInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { getFormikFieldProps } from "@/utils/generateFieldProps";
import { useCreateDepartment, useUpdateDepartment } from "../_lib/useDepartments";
import { departmentValidationSchema } from "../_lib/createDepartmentValidation";
import type { Department, DepartmentFormValues } from "../_types/department.types";

type DepartmentFormDialogProps = {
    open: boolean;
    orgId: string;
    editingDepartment?: Department;
    onClose: () => void;
    onSubmitted: () => void;
};

const emptyValues: DepartmentFormValues = { name: "", description: "" };

export const DepartmentFormDialog = ({
    open,
    orgId,
    editingDepartment,
    onClose,
    onSubmitted,
}: DepartmentFormDialogProps) => {
    const isEdit = Boolean(editingDepartment);

    const onSuccess = () => {
        onSubmitted();
        onClose();
    };

    const { createDepartment, loading: creating } = useCreateDepartment({ onSuccess });
    const { updateDepartment, loading: updating } = useUpdateDepartment({ onSuccess });

    const initialValues = useMemo<DepartmentFormValues>(() => {
        if (!editingDepartment) return emptyValues;
        return { name: editingDepartment.name, description: editingDepartment.description };
    }, [editingDepartment]);

    const handleSubmit = (values: DepartmentFormValues) => {
        if (isEdit && editingDepartment) {
            updateDepartment(editingDepartment.id, values);
        } else {
            createDepartment({ ...values, orgId });
        }
    };

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            dialogTitle={isEdit ? "Edit department" : "Create department"}
            dialogSubTitle={
                isEdit ? "Update this department's details." : "Add a new department to this organization."
            }
        >
            <Formik
                initialValues={initialValues}
                validationSchema={departmentValidationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                enableReinitialize
            >
                {(formik) => (
                    <Form>
                        <Stack spacing={2.5} sx={{ pt: 1 }}>
                            <TextInput
                                label="Department name"
                                placeholder="e.g. Engineering"
                                {...getFormikFieldProps({ formik, field: "name" })}
                            />
                            <TextInput
                                label="Description"
                                placeholder="What this department does"
                                multiline
                                rows={3}
                                {...getFormikFieldProps({ formik, field: "description" })}
                            />
                            <LoadingButton
                                type="submit"
                                loading={creating || updating}
                                variant="contained"
                                color="secondary"
                                sx={{ color: "white", marginTop: "24px !important" }}
                            >
                                {isEdit ? "Save changes" : "Create"}
                            </LoadingButton>
                        </Stack>
                    </Form>
                )}
            </Formik>
        </FormDialog>
    );
};

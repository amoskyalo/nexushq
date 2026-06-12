"use client";

import { useMemo } from "react";
import { Formik, type FormikHelpers } from "formik";
import { FormDialog } from "@/components/dialogs";
import { useCreateOrganization } from "../_lib/useCreateOrganization";
import { useUpdateOrganization } from "../_lib/useOrganizationActions";
import { createOrgValidationSchema } from "../_lib/createOrgValidation";
import { OrgFormFields } from "./OrgFormFields";
import { slugify } from "@/app/onboarding/_lib/onboarding.constants";
import type { OrgFormDialogProps, OrgFormValues } from "../_types/organization.types";

const emptyValues: OrgFormValues = {
    name: "",
    industry: "",
    modules: [],
    logo: null,
};

export const OrgFormDialog = ({ open, editingOrg, onClose, onSubmitted }: OrgFormDialogProps) => {
    const isEdit = Boolean(editingOrg);

    const onSuccess = () => {
        onSubmitted();
        onClose();
    };

    const { createOrganization, loading: creating } = useCreateOrganization({ onSuccess });
    const { updateOrganization, loading: updating } = useUpdateOrganization({ onSuccess });

    const initialValues = useMemo<OrgFormValues>(() => {
        if (!editingOrg) return emptyValues;
        return {
            name: editingOrg.name,
            industry: editingOrg.industry,
            modules: editingOrg.modules,
            logo: null,
        };
    }, [editingOrg]);

    const handleSubmit = (values: OrgFormValues, helpers: FormikHelpers<OrgFormValues>) => {
        const { logo: _logo, ...rest } = values;
        const payload = { ...rest, slug: slugify(rest.name) };

        if (isEdit && editingOrg) {
            updateOrganization(editingOrg.id, payload);
        } else {
            createOrganization(payload);
        }

        helpers.setSubmitting(false);
    };

    return (
        <FormDialog
            open={open}
            onClose={onClose}
            dialogTitle={isEdit ? "Edit organization" : "Create organization"}
            dialogSubTitle={
                isEdit ? "Update this organization's details." : "Add a new organization to your workspace."
            }
        >
            <Formik
                initialValues={initialValues}
                validationSchema={createOrgValidationSchema}
                onSubmit={handleSubmit}
                validateOnBlur={false}
                enableReinitialize
            >
                <OrgFormFields loading={creating || updating} submitLabel={isEdit ? "Save changes" : "Create"} />
            </Formik>
        </FormDialog>
    );
};

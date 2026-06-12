"use client";

import { Stack, Box, Typography } from "@mui/material";
import { Form, useFormikContext } from "formik";
import { TextInput } from "@/components/inputs/TextInput";
import { SelectInput } from "@/components/inputs/SelectInput";
import { AutocompleteField } from "@/components/inputs/AutoCompleteInput";
import { FileUploadInput } from "@/components/inputs/FileUploadInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { getFormikFieldProps } from "@/utils/generateFieldProps";
import { INDUSTRY_OPTIONS, slugify } from "@/app/onboarding/_lib/onboarding.constants";
import { MODULE_OPTIONS } from "../_lib/organization.constants";
import type { ModuleOption, OrgFormFieldsProps, OrgFormValues } from "../_types/organization.types";

export const OrgFormFields = ({ loading, submitLabel }: OrgFormFieldsProps) => {
    const formik = useFormikContext<OrgFormValues>();

    const previewSlug = slugify(formik.values.name);
    const selectedModules = MODULE_OPTIONS.filter((m) => formik.values.modules.includes(m.value));
    const modulesError = formik.submitCount > 0 && Boolean(formik.errors.modules);

    return (
        <Form noValidate>
            <Stack spacing={2.5} sx={{ pt: 1 }}>
                <FileUploadInput
                    label="Logo (optional)"
                    allowedFileTypes={["PNG", "JPG", "JPEG", "SVG"]}
                    {...getFormikFieldProps({ formik, field: "logo", isFile: true })}
                />

                <Box>
                    <TextInput
                        label="Organization name"
                        placeholder="e.g. Acme Corp"
                        {...getFormikFieldProps({ formik, field: "name" })}
                    />
                    {previewSlug && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 0.5, ml: 0.5 }}
                        >
                            {previewSlug}.nexushq.org
                        </Typography>
                    )}
                </Box>

                <SelectInput
                    label="Industry"
                    placeholder="Select your industry"
                    options={INDUSTRY_OPTIONS}
                    {...getFormikFieldProps({ formik, field: "industry", isSelect: true })}
                />

                <AutocompleteField
                    label="Modules"
                    placeholder="Pick the modules to enable"
                    multiple
                    options={MODULE_OPTIONS}
                    getOptionLabel={(option: ModuleOption) => option.label}
                    isOptionEqualToValue={(option: ModuleOption, value: ModuleOption) => option.value === value.value}
                    value={selectedModules}
                    onChange={(_, next: ModuleOption[]) =>
                        formik.setFieldValue(
                            "modules",
                            next.map((m) => m.value),
                        )
                    }
                    error={modulesError}
                    helperText={modulesError ? (formik.errors.modules as string) : undefined}
                />

                <LoadingButton
                    type="submit"
                    loading={loading}
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white", marginTop: "24px !important" }}
                >
                    {submitLabel}
                </LoadingButton>
            </Stack>
        </Form>
    );
};

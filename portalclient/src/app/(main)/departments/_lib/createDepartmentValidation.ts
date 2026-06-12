import type { StringSchema } from "yup";
import { getValidationSchema } from "@/utils";

export const departmentValidationSchema = getValidationSchema([
    {
        name: "name",
        type: "string",
        errorMessage: "Department name is required",
        extend: (schema) => (schema as StringSchema).trim().min(2, "Department name must be at least 2 characters"),
    },
    {
        name: "description",
        type: "string",
        errorMessage: "Description is required",
    },
]);

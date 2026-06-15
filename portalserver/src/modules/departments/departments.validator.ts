import * as z from "zod";

const departmentBody = z.object({
    name: z.string().trim().min(2, "Department name is required"),
    description: z.string().trim().min(1, "Description is required"),
    orgId: z.string().min(1, "Organization id is required"),
});

const updateDepartmentBody = z.object({
    name: z.string().trim().min(2, "Department name is required"),
    description: z.string().trim().min(1, "Description is required"),
});

const departmentParams = z.object({
    id: z.string().min(1, "Department id is required"),
});

export const createDepartmentValidator = z.object({
    body: departmentBody,
});

export const updateDepartmentValidator = z.object({
    body: updateDepartmentBody,
    params: departmentParams,
});

export const departmentIdValidator = z.object({
    params: departmentParams,
});

export type DepartmentType = z.infer<typeof departmentBody>;
export type UpdateDepartmentType = z.infer<typeof updateDepartmentBody>;

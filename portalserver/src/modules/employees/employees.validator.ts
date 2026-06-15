import * as z from "zod";

const TIME_BOUND_STATUSES = ["CONTRACT", "INTERNSHIP"];

const employmentFields = {
    employmentStatus: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]).default("FULL_TIME"),
    employmentEndDate: z.coerce.date().optional().nullable(),
};

const refineEmploymentEndDate = (
    body: { employmentStatus: string; employmentEndDate?: Date | null },
    ctx: z.RefinementCtx,
) => {
    const needsEndDate = TIME_BOUND_STATUSES.includes(body.employmentStatus);

    if (needsEndDate && !body.employmentEndDate) {
        ctx.addIssue({
            path: ["employmentEndDate"],
            code: "custom",
            message: "End date is required for contract and internship",
        });
        return;
    }

    if (!needsEndDate && body.employmentEndDate) {
        ctx.addIssue({
            path: ["employmentEndDate"],
            code: "custom",
            message: "End date only applies to contract and internship",
        });
        return;
    }

    if (needsEndDate && body.employmentEndDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (body.employmentEndDate <= today) {
            ctx.addIssue({
                path: ["employmentEndDate"],
                code: "custom",
                message: "End date must be in the future",
            });
        }
    }
};

const employeeBody = z
    .object({
        orgId: z.string().min(1, "Organization id is required"),
        departmentId: z.string().min(1, "Department is required"),
        firstName: z.string().trim().min(1, "First name is required"),
        lastName: z.string().trim().min(1, "Last name is required"),
        email: z.email("Invalid email address"),
        phoneNumber: z.string().trim().min(1, "Phone number is required"),
        role: z.string().trim().min(1, "Role is required"),
        docs: z.enum(["ID_CARD", "PASSPORT", "DRIVING_LICENSE"]).optional(),
        reportsTo: z.string().trim().optional().nullable(),
        ...employmentFields,
    })
    .superRefine(refineEmploymentEndDate);

const updateEmployeeBody = z
    .object({
        departmentId: z.string().min(1, "Department is required"),
        firstName: z.string().trim().min(1, "First name is required"),
        lastName: z.string().trim().min(1, "Last name is required"),
        email: z.email("Invalid email address"),
        phoneNumber: z.string().trim().min(1, "Phone number is required"),
        role: z.string().trim().min(1, "Role is required"),
        docs: z.enum(["ID_CARD", "PASSPORT", "DRIVING_LICENSE"]).optional(),
        reportsTo: z.string().trim().optional().nullable(),
        ...employmentFields,
    })
    .superRefine(refineEmploymentEndDate);

const employeeParams = z.object({
    id: z.string().min(1, "Employee id is required"),
});

export const createEmployeeValidator = z.object({
    body: employeeBody,
});

export const updateEmployeeValidator = z.object({
    body: updateEmployeeBody,
    params: employeeParams,
});

export const employeeIdValidator = z.object({
    params: employeeParams,
});

export type EmployeeType = z.infer<typeof employeeBody>;
export type UpdateEmployeeType = z.infer<typeof updateEmployeeBody>;

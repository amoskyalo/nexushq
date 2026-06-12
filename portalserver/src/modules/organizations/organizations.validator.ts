import * as z from "zod";

const organizationBody = z.object({
    name: z.string().trim().min(2, "Organization name is required"),
    slug: z.string().trim().min(1, "Organization slug is required"),
    modules: z.array(z.enum(["HR", "FINANCE", "TECH", "AGILE"])),
    industry: z.string().trim().min(1, "Industry category is required"),
});

const organizationParams = z.object({
    id: z.string().min(1, "Organization id is required"),
});

export const createOrganizationValidator = z.object({
    body: organizationBody,
});

export const updateOrganizationValidator = z.object({
    body: organizationBody,
    params: organizationParams,
});

export const organizationIdValidator = z.object({
    params: organizationParams,
});

export type OrganizationType = z.infer<typeof organizationBody>;

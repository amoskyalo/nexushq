import { prisma } from "../../shared/utils/prisma";
import { AppError } from "../../shared/utils/AppError";
import { DepartmentType, UpdateDepartmentType } from "./departments.validator";

const assertOwnedOrganization = async (orgId: string, userId: string) => {
    const organization = await prisma.organizations.findFirst({ where: { id: orgId, userId } });

    if (!organization) {
        throw new AppError("Organization not found", 404);
    }

    return organization;
};

const assertOwnedDepartment = async (id: string, userId: string) => {
    const department = await prisma.department.findUnique({ where: { id } });

    if (!department) {
        throw new AppError("Department not found", 404);
    }

    await assertOwnedOrganization(department.orgId, userId);
    return department;
};

export const getDepartmentsService = async (orgId: string, userId: string) => {
    await assertOwnedOrganization(orgId, userId);
    return prisma.department.findMany({ where: { orgId }, orderBy: { createdAt: "desc" } });
};

export const createDepartmentService = async (data: DepartmentType & { userId: string }) => {
    const { userId, ...department } = data;
    await assertOwnedOrganization(department.orgId, userId);
    return prisma.department.create({ data: department });
};

export const updateDepartmentService = async (id: string, userId: string, data: UpdateDepartmentType) => {
    await assertOwnedDepartment(id, userId);
    return prisma.department.update({ where: { id }, data });
};

export const deleteDepartmentService = async (id: string, userId: string) => {
    await assertOwnedDepartment(id, userId);
    return prisma.department.delete({ where: { id } });
};

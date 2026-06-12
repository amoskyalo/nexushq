import { prisma } from "../../shared/utils/prisma";
import { AppError } from "../../shared/utils/AppError";
import { OrganizationType } from "./organizations.validator";

const findOwnedOrganization = async (id: string, userId: string) => {
    const organization = await prisma.organizations.findFirst({ where: { id, userId } });

    if (!organization) {
        throw new AppError("Organization not found", 404);
    }

    return organization;
};

export const createOrganizationService = async (data: OrganizationType & { userId: string }) => {
    return prisma.organizations.create({ data });
};

export const getAllMyOrganizations = async (userId: string) => {
    return prisma.organizations.findMany({ where: { userId } });
};

export const updateOrganizationService = async (id: string, userId: string, data: OrganizationType) => {
    await findOwnedOrganization(id, userId);
    return prisma.organizations.update({ where: { id }, data });
};

export const deleteOrganizationService = async (id: string, userId: string) => {
    await findOwnedOrganization(id, userId);
    return prisma.organizations.delete({ where: { id } });
};

export const setOrganizationStatusService = async (id: string, userId: string, status: "ACTIVE" | "SUSPENDED") => {
    await findOwnedOrganization(id, userId);
    return prisma.organizations.update({ where: { id }, data: { status } });
};

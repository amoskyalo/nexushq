import { prisma } from "../../shared/utils/prisma";
import { AppError } from "../../shared/utils/AppError";
import { EmployeeType, UpdateEmployeeType } from "./employees.validator";

const assertOwnedOrganization = async (orgId: string, userId: string) => {
    const organization = await prisma.organizations.findFirst({ where: { id: orgId, userId } });

    if (!organization) {
        throw new AppError("Organization not found", 404);
    }

    return organization;
};

const EMPLOYEE_ID_PREFIX = "EMP-";

const generateEmployeeId = async () => {
    const last = await prisma.employee.findFirst({
        orderBy: { employeeId: "desc" },
        select: { employeeId: true },
    });

    const lastNumber = last ? Number.parseInt(last.employeeId.replace(EMPLOYEE_ID_PREFIX, ""), 10) : 0;
    const next = Number.isFinite(lastNumber) ? lastNumber + 1 : 1;

    return `${EMPLOYEE_ID_PREFIX}${String(next).padStart(3, "0")}`;
};

const assertOwnedEmployee = async (id: string, userId: string) => {
    const employee = await prisma.employee.findUnique({ where: { id } });

    if (!employee) {
        throw new AppError("Employee not found", 404);
    }

    await assertOwnedOrganization(employee.orgId, userId);
    return employee;
};

export const createEmployeeService = async (data: EmployeeType & { userId: string }) => {
    const { userId, ...employee } = data;
    await assertOwnedOrganization(employee.orgId, userId);

    const department = await prisma.department.findFirst({
        where: { id: employee.departmentId, orgId: employee.orgId },
    });

    if (!department) {
        throw new AppError("Department not found", 404);
    }

    const employeeId = await generateEmployeeId();

    return prisma.employee.create({ data: { ...employee, employeeId } });
};

export const getEmployeesService = async (orgId: string, userId: string) => {
    await assertOwnedOrganization(orgId, userId);
    return prisma.employee.findMany({
        where: { orgId },
        include: { department: true },
        orderBy: { createdAt: "desc" },
    });
};

export const updateEmployeeService = async (id: string, userId: string, data: UpdateEmployeeType) => {
    const employee = await assertOwnedEmployee(id, userId);

    const department = await prisma.department.findFirst({
        where: { id: data.departmentId, orgId: employee.orgId },
    });

    if (!department) {
        throw new AppError("Department not found", 404);
    }

    return prisma.employee.update({ where: { id }, data });
};

export const deleteEmployeeService = async (id: string, userId: string) => {
    await assertOwnedEmployee(id, userId);
    return prisma.employee.delete({ where: { id } });
};

export const setEmployeeStatusService = async (id: string, userId: string, status: "ACTIVE" | "SUSPENDED") => {
    await assertOwnedEmployee(id, userId);
    return prisma.employee.update({ where: { id }, data: { status } });
};

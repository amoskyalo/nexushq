import { Request, Response } from "express";
import {
    createEmployeeService,
    getEmployeesService,
    updateEmployeeService,
    deleteEmployeeService,
    setEmployeeStatusService,
} from "./employees.service";
import { sendResponse } from "../../shared/utils/response";

export const createEmployee = async (req: Request, res: Response) => {
    const result = await createEmployeeService({ ...req.body, userId: req.userId });

    return sendResponse({
        res,
        body: result,
        message: "Employee created successfully",
    });
};

export const getEmployeesController = async (req: Request, res: Response) => {
    const orgId = req.query.orgId as string;
    const employees = await getEmployeesService(orgId, req.userId);

    return sendResponse({
        res,
        body: employees,
        message: "Employees retrieved successfully",
    });
};

export const updateEmployee = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await updateEmployeeService(id, req.userId, req.body);

    return sendResponse({
        res,
        body: result,
        message: "Employee updated successfully",
    });
};

export const deleteEmployee = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await deleteEmployeeService(id, req.userId);

    return sendResponse({
        res,
        message: "Employee deleted successfully",
    });
};

export const deactivateEmployee = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await setEmployeeStatusService(id, req.userId, "SUSPENDED");

    return sendResponse({
        res,
        body: result,
        message: "Employee deactivated successfully",
    });
};

export const activateEmployee = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await setEmployeeStatusService(id, req.userId, "ACTIVE");

    return sendResponse({
        res,
        body: result,
        message: "Employee activated successfully",
    });
};

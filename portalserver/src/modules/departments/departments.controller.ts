import { Request, Response } from "express";
import {
    createDepartmentService,
    getDepartmentsService,
    updateDepartmentService,
    deleteDepartmentService,
} from "./departments.service";
import { sendResponse } from "../../shared/utils/response";

export const createDepartment = async (req: Request, res: Response) => {
    const result = await createDepartmentService({ ...req.body, userId: req.userId });

    return sendResponse({
        res,
        body: result,
        message: "Department created successfully",
    });
};

export const getDepartmentsController = async (req: Request, res: Response) => {
    const orgId = req.query.orgId as string;
    const departments = await getDepartmentsService(orgId, req.userId);

    return sendResponse({
        res,
        body: departments,
        message: "Departments retrieved successfully",
    });
};

export const updateDepartment = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await updateDepartmentService(id, req.userId, req.body);

    return sendResponse({
        res,
        body: result,
        message: "Department updated successfully",
    });
};

export const deleteDepartment = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await deleteDepartmentService(id, req.userId);

    return sendResponse({
        res,
        message: "Department deleted successfully",
    });
};

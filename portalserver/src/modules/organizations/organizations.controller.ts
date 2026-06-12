import { Request, Response } from "express";
import {
    createOrganizationService,
    getAllMyOrganizations,
    updateOrganizationService,
    deleteOrganizationService,
    setOrganizationStatusService,
} from "./organizations.service";
import { sendResponse } from "../../shared/utils/response";

export const createOrganization = async (req: Request, res: Response) => {
    const requestData = req.body;
    const userId = req.userId;
    const result = await createOrganizationService({ ...requestData, userId });

    return sendResponse({
        res,
        body: result,
        message: "Organization created successfully",
    });
};

export const getAllMyOrganizationsController = async (req: Request, res: Response) => {
    const userId = req.userId;
    const organizations = await getAllMyOrganizations(userId);

    return sendResponse({
        res,
        body: organizations,
        message: "Organizations retrieved successfully",
    });
};

export const updateOrganization = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await updateOrganizationService(id, req.userId, req.body);

    return sendResponse({
        res,
        body: result,
        message: "Organization updated successfully",
    });
};

export const deleteOrganization = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    await deleteOrganizationService(id, req.userId);

    return sendResponse({
        res,
        message: "Organization deleted successfully",
    });
};

export const suspendOrganization = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await setOrganizationStatusService(id, req.userId, "SUSPENDED");

    return sendResponse({
        res,
        body: result,
        message: "Organization suspended successfully",
    });
};

export const activateOrganization = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const result = await setOrganizationStatusService(id, req.userId, "ACTIVE");

    return sendResponse({
        res,
        body: result,
        message: "Organization reactivated successfully",
    });
};

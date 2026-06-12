import { Router } from "express";
import { validationHandler } from "../../shared/middleware/validationHandler";
import {
    createOrganizationValidator,
    updateOrganizationValidator,
    organizationIdValidator,
} from "./organizations.validator";
import {
    createOrganization,
    getAllMyOrganizationsController,
    updateOrganization,
    deleteOrganization,
    suspendOrganization,
    activateOrganization,
} from "./organizations.controller";

const router = Router();

router.get("/", getAllMyOrganizationsController);
router.post("/create", validationHandler(createOrganizationValidator), createOrganization);
router.patch("/edit/:id", validationHandler(updateOrganizationValidator), updateOrganization);
router.delete("/delete/:id", validationHandler(organizationIdValidator), deleteOrganization);
router.patch("/suspend/:id", validationHandler(organizationIdValidator), suspendOrganization);
router.patch("/activate/:id", validationHandler(organizationIdValidator), activateOrganization);

export default router;

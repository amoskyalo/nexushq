import { Router } from "express";
import { validationHandler } from "../../shared/middleware/validationHandler";
import {
    createDepartmentValidator,
    updateDepartmentValidator,
    departmentIdValidator,
} from "./departments.validator";
import {
    createDepartment,
    getDepartmentsController,
    updateDepartment,
    deleteDepartment,
} from "./departments.controller";

const router = Router();

router.get("/", getDepartmentsController);
router.post("/create", validationHandler(createDepartmentValidator), createDepartment);
router.patch("/edit/:id", validationHandler(updateDepartmentValidator), updateDepartment);
router.delete("/delete/:id", validationHandler(departmentIdValidator), deleteDepartment);

export default router;

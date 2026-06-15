import { Router } from "express";
import {
    createEmployee,
    getEmployeesController,
    updateEmployee,
    deleteEmployee,
    deactivateEmployee,
    activateEmployee,
} from "./employees.controller";
import { createEmployeeValidator, updateEmployeeValidator, employeeIdValidator } from "./employees.validator";
import { validationHandler } from "../../shared/middleware/validationHandler";

const router = Router();

router.get("/", getEmployeesController);
router.post("/create", validationHandler(createEmployeeValidator), createEmployee);
router.patch("/edit/:id", validationHandler(updateEmployeeValidator), updateEmployee);
router.delete("/delete/:id", validationHandler(employeeIdValidator), deleteEmployee);
router.patch("/deactivate/:id", validationHandler(employeeIdValidator), deactivateEmployee);
router.patch("/activate/:id", validationHandler(employeeIdValidator), activateEmployee);

export default router;

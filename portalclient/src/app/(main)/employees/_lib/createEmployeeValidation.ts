import dayjs from "dayjs";
import { getValidationSchema } from "@/utils";
import { isTimeBound } from "./employment";

export const employeeValidationSchema = getValidationSchema([
    { name: "firstName", type: "string", errorMessage: "First name is required" },
    { name: "lastName", type: "string", errorMessage: "Last name is required" },
    { name: "email", type: "email", errorMessage: "Email is required" },
    { name: "phoneNumber", type: "string", errorMessage: "Phone number is required" },
    { name: "role", type: "string", errorMessage: "Role is required" },
    { name: "departmentId", type: "string", errorMessage: "Department is required" },
    { name: "employmentStatus", type: "string", errorMessage: "Employment status is required" },
    {
        name: "employmentEndDate",
        type: "string",
        extend: (_schema, Yup) =>
            Yup.string().when("employmentStatus", {
                is: (status: string) => isTimeBound(status),
                then: (schema) =>
                    schema
                        .required("End date is required for contract and internship")
                        .test("future", "End date must be in the future", (value) =>
                            value ? dayjs(value).isAfter(dayjs().startOf("day")) : false,
                        ),
                otherwise: (schema) => schema.notRequired(),
            }),
    },
]);

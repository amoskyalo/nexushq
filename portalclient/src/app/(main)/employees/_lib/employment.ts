import type { EmploymentStatus } from "../_types/employee.types";

export const EMPLOYMENT_STATUS_OPTIONS: { value: EmploymentStatus; label: string }[] = [
    { value: "FULL_TIME", label: "Full-time" },
    { value: "PART_TIME", label: "Part-time" },
    { value: "CONTRACT", label: "Contract" },
    { value: "INTERNSHIP", label: "Internship" },
];

export const TIME_BOUND_STATUSES: EmploymentStatus[] = ["CONTRACT", "INTERNSHIP"];

export const isTimeBound = (status: string): status is EmploymentStatus =>
    TIME_BOUND_STATUSES.includes(status as EmploymentStatus);

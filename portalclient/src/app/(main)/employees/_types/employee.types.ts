export type EmployeeStatus = "ACTIVE" | "SUSPENDED";

export type EmploymentStatus = "FULL_TIME" | "PART_TIME" | "CONTRACT" | "INTERNSHIP";

export type DocumentType = "ID_CARD" | "PASSPORT" | "DRIVING_LICENSE";

export type Employee = {
    id: string;
    employeeId: string;
    orgId: string;
    departmentId: string;
    department?: { id: string; name: string };
    reportsTo?: string | null;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    docs: DocumentType;
    employmentStatus: EmploymentStatus;
    employmentEndDate?: string | null;
    status: EmployeeStatus;
    createdAt: string;
    updatedAt: string;
};

export type CreateEmployeePayload = {
    orgId: string;
    departmentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    docs?: DocumentType;
    reportsTo?: string | null;
    employmentStatus: EmploymentStatus;
    employmentEndDate?: string | null;
};

export type UpdateEmployeePayload = {
    departmentId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    docs?: DocumentType;
    reportsTo?: string | null;
    employmentStatus: EmploymentStatus;
    employmentEndDate?: string | null;
};

export type EmployeeFormValues = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    role: string;
    departmentId: string;
    docs: string;
    employmentStatus: EmploymentStatus;
    employmentEndDate: string;
};

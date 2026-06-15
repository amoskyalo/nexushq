export type DepartmentStatus = "ACTIVE" | "SUSPENDED";

export type Department = {
    id: string;
    orgId: string;
    name: string;
    description: string;
    status: DepartmentStatus;
    createdAt: string;
    updatedAt: string;
};

export type CreateDepartmentPayload = {
    name: string;
    description: string;
    orgId: string;
};

export type DepartmentFormValues = {
    name: string;
    description: string;
};

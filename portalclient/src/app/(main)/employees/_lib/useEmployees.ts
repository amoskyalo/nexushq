"use client";

import { useQueryGet } from "@/hooks/useQueryGet";
import { useQueryPost, useQueryPatch, useQueryDelete } from "@/hooks";
import { createMutationHandlers } from "@/utils";
import type {
    Employee,
    CreateEmployeePayload,
    UpdateEmployeePayload,
    EmployeeStatus,
} from "../_types/employee.types";

export const useEmployees = (orgId: string) => {
    const { data, isLoading, refetch } = useQueryGet<Employee[], { orgId: string }>({
        url: "/api/employees",
        params: { orgId },
    });

    return { employees: data?.body ?? [], loading: isLoading, refetch };
};

export const useCreateEmployee = ({ onSuccess }: { onSuccess: () => void }) => {
    const { mutate, isPending } = useQueryPost<CreateEmployeePayload, undefined>({
        options: createMutationHandlers({ successCallback: onSuccess }),
    });

    const createEmployee = (body: CreateEmployeePayload) => {
        mutate({ url: "/api/employees/create", body });
    };

    return { createEmployee, loading: isPending };
};

export const useUpdateEmployee = ({ onSuccess }: { onSuccess: () => void }) => {
    const { mutate, isPending } = useQueryPatch<UpdateEmployeePayload, undefined>();

    const updateEmployee = (id: string, body: UpdateEmployeePayload) => {
        mutate({ url: `/api/employees/edit/${id}`, body }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { updateEmployee, loading: isPending };
};

export const useDeleteEmployee = ({ onSuccess }: { onSuccess: () => void }) => {
    const { mutate, isPending } = useQueryDelete<undefined, undefined>();

    const deleteEmployee = (id: string) => {
        mutate({ url: `/api/employees/delete/${id}` }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { deleteEmployee, loading: isPending };
};

export const useSetEmployeeStatus = ({ onSuccess }: { onSuccess: () => void }) => {
    const { mutate, isPending } = useQueryPatch<undefined, undefined>();

    const setStatus = (id: string, status: EmployeeStatus) => {
        const action = status === "ACTIVE" ? "activate" : "deactivate";
        mutate({ url: `/api/employees/${action}/${id}` }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { setStatus, loading: isPending };
};

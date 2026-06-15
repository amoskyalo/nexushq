"use client";

import { useQueryGet } from "@/hooks/useQueryGet";
import { useQueryPost, useQueryPatch, useQueryDelete } from "@/hooks";
import { createMutationHandlers } from "@/utils";
import type { Department, CreateDepartmentPayload, DepartmentFormValues } from "../_types/department.types";

export const useDepartments = (orgId: string) => {
    const { data, isLoading, refetch } = useQueryGet<Department[], { orgId: string }>({
        url: "/api/departments",
        params: { orgId },
    });

    return { departments: data?.body ?? [], loading: isLoading, refetch };
};

export const useCreateDepartment = ({ onSuccess }: { onSuccess: () => void }) => {
    const { mutate, isPending } = useQueryPost<CreateDepartmentPayload, undefined>({
        options: createMutationHandlers({ successCallback: onSuccess }),
    });

    const createDepartment = (body: CreateDepartmentPayload) => {
        mutate({ url: "/api/departments/create", body });
    };

    return { createDepartment, loading: isPending };
};

export const useUpdateDepartment = ({ onSuccess }: { onSuccess: () => void }) => {
    const { mutate, isPending } = useQueryPatch<DepartmentFormValues, undefined>();

    const updateDepartment = (id: string, body: DepartmentFormValues) => {
        mutate({ url: `/api/departments/edit/${id}`, body }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { updateDepartment, loading: isPending };
};

export const useDeleteDepartment = ({ onSuccess }: { onSuccess: () => void }) => {
    const { mutate, isPending } = useQueryDelete<undefined, undefined>();

    const deleteDepartment = (id: string) => {
        mutate({ url: `/api/departments/delete/${id}` }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { deleteDepartment, loading: isPending };
};

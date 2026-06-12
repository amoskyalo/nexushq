"use client";

import { useQueryPatch, useQueryDelete } from "@/hooks";
import { createMutationHandlers } from "@/utils";
import type { OrganizationStatus } from "@/context";
import type { CreateOrganizationPayload } from "../_types/organization.types";

type ActionArgs = { onSuccess: () => void };

export const useUpdateOrganization = ({ onSuccess }: ActionArgs) => {
    const { mutate, isPending } = useQueryPatch<CreateOrganizationPayload, undefined>();

    const updateOrganization = (id: string, body: CreateOrganizationPayload) => {
        mutate({ url: `/api/organizations/edit/${id}`, body }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { updateOrganization, loading: isPending };
};

export const useDeleteOrganization = ({ onSuccess }: ActionArgs) => {
    const { mutate, isPending } = useQueryDelete<undefined, undefined>();

    const deleteOrganization = (id: string) => {
        mutate({ url: `/api/organizations/delete/${id}` }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { deleteOrganization, loading: isPending };
};

export const useSetOrganizationStatus = ({ onSuccess }: ActionArgs) => {
    const { mutate, isPending } = useQueryPatch<undefined, undefined>();

    const setStatus = (id: string, status: OrganizationStatus) => {
        const action = status === "SUSPENDED" ? "suspend" : "activate";
        mutate({ url: `/api/organizations/${action}/${id}` }, createMutationHandlers({ successCallback: onSuccess }));
    };

    return { setStatus, loading: isPending };
};

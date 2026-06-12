"use client";

import { useRouter } from "next/navigation";
import { useQueryPost } from "./useQueryPost";
import { queryClient } from "@/lib/axios";
import { createMutationHandlers } from "@/utils";

export const useLogout = () => {
    const router = useRouter();

    const { mutate, isPending } = useQueryPost({
        options: createMutationHandlers({
            successCallback: () => {
                queryClient.clear();
                router.push("/auth/signin");
            },
        }),
    });

    const handleLogout = () => {
        mutate({ url: "api/auth/logout" });
    };

    return { handleLogout, loading: isPending };
};

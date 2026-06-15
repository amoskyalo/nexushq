"use client";

import { useGridUrlState } from "./useGridUrlState";

export const usePagination = <T>(items: T[]) => {
    const { params } = useGridUrlState();
    const pageSize = params.page_size;
    const page = params.page;

    const pages = Math.max(1, Math.ceil(items.length / pageSize));
    const start = (page - 1) * pageSize;

    return { pageItems: items.slice(start, start + pageSize), pages };
};

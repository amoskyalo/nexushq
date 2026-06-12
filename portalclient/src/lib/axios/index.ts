import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
    if (config.data instanceof FormData) {
        delete config.headers["Content-Type"];
    }
    return config;
});

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 1,
            retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        },
        mutations: {
            retry: 0,
        },
    },
});

const forceLogout = () => {
    queryClient.clear();
    axiosInstance.post("/api/auth/logout").finally(() => {
        window.location.replace("/auth/signin");
    });
};

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const onAuthPage = typeof window !== "undefined" && window.location.pathname.startsWith("/auth");

        if (status === 401 && typeof window !== "undefined" && !onAuthPage) {
            forceLogout();
        }

        return Promise.reject(error);
    },
);

export { axiosInstance };

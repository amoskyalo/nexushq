import type { ReactNode } from "react";
import type { SxProps, Theme } from "@mui/material";
import { Users, DollarSign, Monitor, Rocket, Building2, Settings, UserPlus } from "lucide-react";
import type { OrganizationModule } from "@/context";

export const CARD_SX: SxProps<Theme> = {
    borderRadius: 3,
    p: 2,
    height: "100%",
};

export type ModuleMeta = {
    label: string;
    description: string;
    icon: ReactNode;
    insightsHref: string;
};

export const MODULE_META: Record<OrganizationModule, ModuleMeta> = {
    HR: {
        label: "Human Resources",
        description: "Employees, leave, recruitment and documents.",
        icon: <Users size={18} />,
        insightsHref: "/hr/insights",
    },
    FINANCE: {
        label: "Finance",
        description: "Payroll, expenses and payments.",
        icon: <DollarSign size={18} />,
        insightsHref: "/finance/insights",
    },
    TECH: {
        label: "Tech",
        description: "Devices, accounts, assets and access.",
        icon: <Monitor size={18} />,
        insightsHref: "/tech/insights",
    },
    AGILE: {
        label: "Agile",
        description: "Projects, sprints, tickets and time tracking.",
        icon: <Rocket size={18} />,
        insightsHref: "/agile/insights",
    },
};

export type QuickAction = {
    title: string;
    description: string;
    buttonLabel: string;
    href: string;
    icon: ReactNode;
};

export const QUICK_ACTIONS: QuickAction[] = [
    {
        title: "Manage organizations",
        description: "Create, edit, suspend, or remove your organizations.",
        buttonLabel: "Open organizations",
        href: "/organizations",
        icon: <Building2 size={16} />,
    },
    {
        title: "Workspace settings",
        description: "Update your org details, modules, and team roles.",
        buttonLabel: "Open settings",
        href: "/settings",
        icon: <Settings size={16} />,
    },
    {
        title: "Add an employee",
        description: "Onboard a new team member into your directory.",
        buttonLabel: "Add employee",
        href: "/employees",
        icon: <UserPlus size={16} />,
    },
];

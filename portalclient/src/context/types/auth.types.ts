export type OrganizationModule = "HR" | "FINANCE" | "TECH" | "AGILE";

export type OrganizationStatus = "ACTIVE" | "SUSPENDED";

export type OrganizationType = {
    id: string;
    userId: string;
    name: string;
    slug: string;
    industry: string;
    modules: OrganizationModule[];
    status: OrganizationStatus;
    createdAt: string;
    updatedAt: string;
};

export type UserType = {
    id: string;
    phoneNumber: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    organizations: OrganizationType[];
    firstName: string;
    lastName: string;
    displayName: string;
};

export type OrganizationContextProps = {
    selectedOrg: OrganizationType;
    setSelectedOrg: (org: OrganizationType) => void;
};

export type AuthStates = {
    loadingProfile: boolean;
};

export type AuthContextProps = {
    me?: UserType;
    state?: AuthStates;
    refetchProfile?: () => Promise<void>;
};

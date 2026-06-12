"use client";

import { ActionDialog } from "@/components/dialogs";
import type { OrganizationType } from "@/context";

export type OrgConfirmAction = "delete" | "suspend" | "activate";

export type OrgConfirmState = { action: OrgConfirmAction; org: OrganizationType } | null;

const CONFIRM_COPY: Record<
    OrgConfirmAction,
    { title: string; okay: string; color: "primary" | "error"; text: (name: string) => string }
> = {
    delete: {
        title: "Delete organization?",
        okay: "Delete",
        color: "primary",
        text: (name) =>
            `Are you sure you want to delete "${name}"? This permanently deletes the organization and all of its data. This action cannot be undone.`,
    },
    suspend: {
        title: "Suspend organization?",
        okay: "Suspend",
        color: "error",
        text: (name) => `Are you sure you want to suspend "${name}"? Members will lose access until you reactivate it.`,
    },
    activate: {
        title: "Reactivate organization?",
        okay: "Reactivate",
        color: "primary",
        text: (name) => `Are you sure you want to reactivate "${name}"? Members will regain access.`,
    },
};

type OrgConfirmDialogProps = {
    state: OrgConfirmState;
    loading: boolean;
    onCancel: () => void;
    onConfirm: () => void;
};

export const OrgConfirmDialog = ({ state, loading, onCancel, onConfirm }: OrgConfirmDialogProps) => {
    const copy = state ? CONFIRM_COPY[state.action] : null;

    return (
        <ActionDialog
            open={Boolean(state)}
            loading={loading}
            dialogTitle={copy?.title}
            contentText={state && copy ? copy.text(state.org.name) : undefined}
            onOkayButtonText={copy?.okay}
            onCancelButtonText="Cancel"
            color={copy?.color}
            onCancel={onCancel}
            onOkay={onConfirm}
            blur
        />
    );
};

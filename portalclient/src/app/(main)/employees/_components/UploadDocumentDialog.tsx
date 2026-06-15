"use client";

import { useState } from "react";
import { Stack } from "@mui/material";
import { FormDialog } from "@/components/dialogs";
import { SelectInput } from "@/components/inputs/SelectInput";
import { FileUploadInput } from "@/components/inputs/FileUploadInput";
import { LoadingButton } from "@/components/buttons/LoadingButton";
import { DOC_TYPE_OPTIONS } from "../_lib/detail.mock";

type UploadDocumentDialogProps = {
    open: boolean;
    onClose: () => void;
};

export const UploadDocumentDialog = ({ open, onClose }: UploadDocumentDialogProps) => {
    const [type, setType] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleClose = () => {
        setType("");
        setFile(null);
        onClose();
    };

    const handleUpload = () => {
        handleClose();
    };

    return (
        <FormDialog
            open={open}
            onClose={handleClose}
            dialogTitle="Upload document"
            dialogSubTitle="Attach a document to this employee."
        >
            <Stack spacing={2.5} sx={{ pt: 1 }}>
                <SelectInput
                    label="Document type"
                    placeholder="Select a document type"
                    options={DOC_TYPE_OPTIONS}
                    value={type}
                    onChange={(value: string) => setType(value)}
                />
                <FileUploadInput
                    label="File"
                    allowedFileTypes={["PDF", "JPG", "PNG"]}
                    value={file}
                    onChange={(event) => setFile(event.target.files?.[0] ?? null)}
                />
                <LoadingButton
                    onClick={handleUpload}
                    loading={false}
                    disabled={!type || !file}
                    variant="contained"
                    color="secondary"
                    sx={{ color: "white", marginTop: "16px !important" }}
                >
                    Upload
                </LoadingButton>
            </Stack>
        </FormDialog>
    );
};

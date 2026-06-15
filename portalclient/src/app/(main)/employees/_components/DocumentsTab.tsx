"use client";

import { useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { Searchbar } from "@/components/inputs";
import { CreateButton } from "@/components/buttons";
import { EMPLOYEE_DOCUMENTS } from "../_lib/detail.mock";
import { DocumentCard } from "./DocumentCard";
import { UploadDocumentDialog } from "./UploadDocumentDialog";

export const DocumentsTab = () => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const query = search.trim().toLowerCase();
    const documents = query
        ? EMPLOYEE_DOCUMENTS.filter(
              (document) =>
                  document.filename.toLowerCase().includes(query) || document.type.toLowerCase().includes(query),
          )
        : EMPLOYEE_DOCUMENTS;

    return (
        <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="flex-end">
                <Searchbar value={search} onChange={setSearch} />
                <CreateButton label="Add Document" onClick={() => setOpen(true)} />
            </Stack>

            {documents.length === 0 ? (
                <Stack alignItems="center" sx={{ py: 6 }}>
                    <Typography variant="body2" color="text.secondary">
                        No documents found.
                    </Typography>
                </Stack>
            ) : (
                <Grid container spacing={3}>
                    {documents.map((document) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={document.id}>
                            <DocumentCard document={document} />
                        </Grid>
                    ))}
                </Grid>
            )}

            <UploadDocumentDialog open={open} onClose={() => setOpen(false)} />
        </Stack>
    );
};

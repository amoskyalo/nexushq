"use client";

import { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { FileText, MoreVertical, Download, Trash2 } from "lucide-react";

type EmployeeDocument = {
    id: number;
    type: string;
    filename: string;
    size: string;
    pages: number;
    url?: string;
    thumbnailUrl?: string;
};

const DocumentPreview = ({ document }: { document: EmployeeDocument }) => {
    if (document.thumbnailUrl) {
        return (
            <Box
                component="img"
                src={document.thumbnailUrl}
                alt={document.filename}
                sx={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
            />
        );
    }

    return (
        <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "text.disabled" }}>
            <FileText size={36} />
        </Box>
    );
};

export const DocumentCard = ({ document }: { document: EmployeeDocument }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const closeMenu = () => setAnchorEl(null);

    return (
        <Box
            sx={{
                height: "100%",
                borderColor: "rgba(0, 0, 0, 0.08)",
                cursor: "pointer",
                boxShadow: "0 0px 3px rgba(0, 0, 0, 0.08)",
                borderRadius: 3,
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    height: 150,
                    bgcolor: "grey.100",
                    overflow: "hidden",
                    display: "flex",
                    p: 1,
                    width: "100%",
                }}
            >
                <DocumentPreview document={document} />
            </Box>

            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1} sx={{ p: 1 }}>
                <Box sx={{ minWidth: 0 }}>
                    <Typography variant="body2" fontWeight={600} noWrap>
                        {document.filename}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "text.secondary" }}>
                        {document.size} · {document.pages} {document.pages === 1 ? "Page" : "Pages"}
                    </Typography>
                </Box>
                <IconButton
                    size="small"
                    sx={{ color: "text.secondary" }}
                    onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                    <MoreVertical size={16} />
                </IconButton>
            </Stack>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={closeMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                slotProps={{ paper: { sx: { minWidth: 150, borderRadius: 2, border: 1, borderColor: "divider" } } }}
            >
                <MenuItem onClick={closeMenu} sx={{ gap: 1 }}>
                    <Download size={16} />
                    <Typography variant="body2">Download</Typography>
                </MenuItem>
                <MenuItem onClick={closeMenu} sx={{ gap: 1, color: "error.main" }}>
                    <Trash2 size={16} />
                    <Typography variant="body2">Delete</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
};

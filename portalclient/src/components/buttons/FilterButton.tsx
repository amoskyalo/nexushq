"use client";

import { Button, Typography } from "@mui/material";
import { ListFilter } from "lucide-react";

type FilterButtonProps = {
    onClick?: () => void;
    label?: string;
};

export const FilterButton = ({ onClick, label = "Filter" }: FilterButtonProps) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                color: "text.secondary",
                border: 1,
                borderColor: "divider",
                gap: 1,
                textTransform: "none",
                px: 1.3,
            }}
        >
            <ListFilter size={14} />
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: 13 }}>
                {label}
            </Typography>
        </Button>
    );
};

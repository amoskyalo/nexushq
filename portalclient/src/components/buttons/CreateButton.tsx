"use client";

import { Button, Typography } from "@mui/material";
import { Plus } from "lucide-react";

type CreateButtonProps = {
    onClick?: () => void;
    label?: string;
};

export const CreateButton = ({ onClick, label = "Create" }: CreateButtonProps) => {
    return (
        <Button
            onClick={onClick}
            variant="contained"
            sx={{
                gap: 0.5,
                textTransform: "none",
                pr: 1.3,
                pl: 1,
            }}
        >
            <Plus size={15} color="white" />
            <Typography variant="body2" sx={{ color: "white", fontSize: 13 }}>
                {label}
            </Typography>
        </Button>
    );
};

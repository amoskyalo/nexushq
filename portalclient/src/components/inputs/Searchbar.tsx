"use client";

import { InputAdornment, TextField, type SxProps, type Theme } from "@mui/material";
import { Search } from "lucide-react";

type SearchbarProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    fullWidth?: boolean;
    sx?: SxProps<Theme>;
};

export const Searchbar = ({ value, onChange, placeholder = "Search...", fullWidth, sx }: SearchbarProps) => {
    return (
        <TextField
            size="small"
            fullWidth={fullWidth}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            sx={{
                "& .MuiInputBase-root": {
                    height: "31px !important",
                    minHeight: "31px !important",
                    maxHeight: "31px !important",
                    paddingLeft: "10px !important",
                    fontSize: 14,
                },
                ...sx,
            }}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search size={16} style={{ opacity: 0.7 }} />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
};

import { TextField, InputAdornment, TextFieldProps } from "@mui/material";
import { Search } from "lucide-react";

export const SearchInput = ({ width = "250px", ...props }: TextFieldProps & { width?: string }) => {
    return (
        <TextField
            placeholder="Type to search..."
            variant="standard"
            size="small"
            slotProps={{
                input: {
                    style: {
                        width,
                        height: "26px",
                        fontSize: "14px",
                        fontWeight: 500,
                    },
                    startAdornment: (
                        <InputAdornment position="start" sx={{ color: "action.disabled" }}>
                            <Search size={16} />
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                },
                htmlInput: {
                    style: {
                        padding: 0,
                    },
                },
            }}
            sx={{
                border: 1,
                borderColor: "divider",
                py: 0.3,
                px: 1,
                borderRadius: 50,
            }}
            {...props}
        />
    );
};

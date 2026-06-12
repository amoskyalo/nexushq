"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Avatar, Menu, MenuItem, Divider, IconButton, Typography } from "@mui/material";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useAuth } from "@/context";
import { useLogout } from "@/hooks";
import { getInitials } from "@/utils";

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const { me } = useAuth();
    const { handleLogout, loading } = useLogout();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuItems = [
        { name: "Account Settings", onClick: () => router.push("/settings") },
        { name: "Support", onClick: () => {} },
    ];

    return (
        <>
            <IconButton
                onClick={handleClick}
                sx={{
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 16,
                    width: 38,
                    height: 38,
                    ":hover": {
                        transform: "none",
                    },
                }}
            >
                <Avatar
                    sx={{
                        width: 36,
                        height: 36,
                        fontSize: 13,
                        bgcolor: "transparent",
                        color: "text.secondary",
                        fontWeight: 600,
                    }}
                >
                    {getInitials(me?.displayName)}
                </Avatar>
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        sx: { minWidth: 220, overflow: "visible", border: 1, borderColor: "divider", mt: 0.5, borderRadius: 3 },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <Box sx={{ px: 2, borderBottom: 1, borderColor: "divider", pb: 1, mb: 1 }}>
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, fontSize: "14px", color: "text.primary", lineHeight: 1.2 }}
                    >
                        {me?.displayName}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ fontSize: "12px", color: "text.secondary", lineHeight: 1.2, mt: 0.5 }}
                    >
                        {me?.email}
                    </Typography>
                </Box>

                {menuItems.map((item) => (
                    <Box sx={{ px: 1 }} key={item.name}>
                        <MenuItem onClick={item.onClick} sx={{ px: 1, borderRadius: 2 }}>
                            <Typography variant="body2" fontWeight={500}>
                                {item.name}
                            </Typography>
                        </MenuItem>
                    </Box>
                ))}

                <Divider sx={{ my: 1 }} />

                <Box sx={{ px: 1 }}>
                    <MenuItem onClick={handleLogout} disabled={loading} sx={{ px: 1, borderRadius: 2 }}>
                        <LogoutOutlinedIcon sx={{ fontSize: 16, mr: 1 }} color="error" />
                        <Typography variant="body2" color="error" fontWeight={500}>
                            Log out
                        </Typography>
                    </MenuItem>
                </Box>
            </Menu>
        </>
    );
};

export default AccountMenu;

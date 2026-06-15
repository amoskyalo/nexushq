"use client";

import { useState } from "react";
import { Avatar, Box, ButtonBase, CircularProgress, Menu, MenuItem, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Building2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { useOrganization } from "@/context";
import type { OrganizationType } from "@/context";
import { useQueryGet } from "@/hooks/useQueryGet";
import { SearchInput } from "@/components/inputs";

const OrgSwitcher = () => {
    const { selectedOrg, setSelectedOrg } = useOrganization();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [search, setSearch] = useState("");
    const open = Boolean(anchorEl);

    const { data, isLoading } = useQueryGet<OrganizationType[], undefined>({
        url: "/api/organizations",
        options: { enabled: open },
    });
    const organizations = data?.body ?? [];

    const query = search.trim().toLowerCase();
    const filteredOrganizations = query
        ? organizations.filter(
              (org) => org.name.toLowerCase().includes(query) || org.slug.toLowerCase().includes(query),
          )
        : organizations;

    const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => {
        setAnchorEl(null);
        setSearch("");
    };

    const handleSelect = (org: OrganizationType) => {
        setSelectedOrg(org);
        handleClose();
    };

    return (
        <>
            <ButtonBase
                onClick={handleOpen}
                focusRipple
                sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    color: "text.secondary",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 2,
                    px: 1,
                    py: 0.4,
                    transition: (theme) =>
                        theme.transitions.create(["background-color", "border-color"], {
                            duration: theme.transitions.duration.shortest,
                        }),
                    "&:hover": {
                        backgroundColor: "action.hover",
                    },
                    "&.Mui-focusVisible": {
                        backgroundColor: "action.hover",
                    },
                }}
            >
                <Building2 size={20} />
                <Box sx={{ textAlign: "left" }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: 13, color: "text.primary" }}>
                        {selectedOrg?.name ?? "Select organization"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 11, mt: -0.5 }}>
                        {selectedOrg?.slug ?? "—"}
                    </Typography>
                </Box>
                <Stack direction="column" alignItems="center">
                    <ChevronUp size={12} style={{ marginBottom: "-0.1rem" }} />
                    <ChevronDown size={12} style={{ marginTop: "-0.1rem" }} />
                </Stack>
            </ButtonBase>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false}
                disableAutoFocusItem
                anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
                transformOrigin={{ horizontal: "left", vertical: "top" }}
                slotProps={{
                    paper: {
                        sx: {
                            mt: 1,
                            maxWidth: 380,
                            borderRadius: 2,
                            px: 1,
                        },
                    },
                }}
            >
                <Box sx={{ px: 1, pt: 0.5, pb: 0.5 }}>
                    <Typography variant="body2" fontWeight={600} sx={{ fontSize: 14 }}>
                        Switch organization
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, mt: 0.25 }}>
                        Sets the workspace context - the data you see is fetched for the selected organization.
                    </Typography>
                </Box>

                <Box
                    sx={{ px: 1, pb: isLoading || organizations.length === 0 ? 0 : 2, pt: 1 }}
                    onKeyDown={(event) => event.stopPropagation()}
                >
                    <SearchInput
                        autoFocus
                        placeholder="Search organization..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        fullWidth
                    />
                </Box>

                {isLoading && (
                    <Stack alignItems="center" sx={{ py: 2 }}>
                        <CircularProgress size={18} />
                    </Stack>
                )}

                {!isLoading && organizations.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1.5 }}>
                        No organizations found
                    </Typography>
                )}

                {!isLoading && organizations.length > 0 && filteredOrganizations.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ px: 2, py: 1.5 }}>
                        No matches found
                    </Typography>
                )}

                {!isLoading && filteredOrganizations.length > 0 && (
                    <Stack spacing={1} sx={{ px: 1, pb: 1 }}>
                        {filteredOrganizations.map((org) => {
                            const active = org.id === selectedOrg?.id;
                            return (
                                <MenuItem
                                    key={org.id}
                                    onClick={() => handleSelect(org)}
                                    selected={active}
                                    sx={{
                                        borderRadius: 2,
                                        pl: 0.5,
                                        pr: 1,
                                        py: 0.5,
                                        "&.Mui-selected": { bgcolor: "action.hover" },
                                    }}
                                >
                                    <Stack direction="row" alignItems="center" spacing={1} sx={{ width: "100%" }}>
                                        <Avatar
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                bgcolor: "transparent",
                                                color: "text.secondary",
                                            }}
                                        >
                                            <Building2 size={23} />
                                        </Avatar>
                                        <Box sx={{ flex: 1, minWidth: 0 }}>
                                            <Stack direction="row" alignItems="center" spacing={1}>
                                                <Typography
                                                    variant="body2"
                                                    fontWeight={600}
                                                    sx={{ fontSize: 14 }}
                                                    noWrap
                                                >
                                                    {org.name}
                                                </Typography>
                                                <Box
                                                    component="span"
                                                    sx={{
                                                        flexShrink: 0,
                                                        px: 0.7,
                                                        py: 0.1,
                                                        borderRadius: 6,
                                                        fontSize: 10,
                                                        lineHeight: 1.6,
                                                        color: org.status === "SUSPENDED" ? "error.main" : "success.main",
                                                        bgcolor: (theme) =>
                                                            alpha(
                                                                theme.palette[
                                                                    org.status === "SUSPENDED" ? "error" : "success"
                                                                ].main,
                                                                0.12,
                                                            ),
                                                    }}
                                                >
                                                    {org.status === "SUSPENDED" ? "Suspended" : "Active"}
                                                </Box>
                                            </Stack>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ fontSize: 12 }}
                                                noWrap
                                            >
                                                {org.slug}
                                            </Typography>
                                        </Box>
                                        {active && <Check size={16} />}
                                    </Stack>
                                </MenuItem>
                            );
                        })}
                    </Stack>
                )}
            </Menu>
        </>
    );
};

export default OrgSwitcher;

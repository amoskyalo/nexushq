"use client";

import { Breadcrumbs as MuiBreadcrumbs, Typography } from "@mui/material";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = {
    label: string;
    href?: string;
};

export const Breadcrumbs = ({ items }: { items: Crumb[] }) => {
    return (
        <MuiBreadcrumbs
            separator={<ChevronRight size={14} style={{ opacity: 0.5 }} />}
            sx={{ "& .MuiBreadcrumbs-separator": { mx: 0.75 } }}
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                if (item.href && !isLast) {
                    return (
                        <Typography
                            key={item.label}
                            component={Link}
                            href={item.href}
                            variant="body2"
                            sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "text.primary" } }}
                        >
                            {item.label}
                        </Typography>
                    );
                }

                return (
                    <Typography
                        key={item.label}
                        variant="body2"
                        sx={{ color: isLast ? "text.primary" : "text.secondary", fontWeight: isLast ? 600 : 400 }}
                    >
                        {item.label}
                    </Typography>
                );
            })}
        </MuiBreadcrumbs>
    );
};

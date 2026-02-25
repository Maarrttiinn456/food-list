import { Box, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    icon: ReactNode;
}

const PageHeader = ({ title, subtitle, icon }: PageHeaderProps) => {
    return (
        <Stack direction="row" alignItems="center" spacing={1.5} mb={4}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    bgcolor: "primary.main",
                    color: "white",
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="h6" fontWeight={700} lineHeight={1.2}>
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body2" color="text.secondary">
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Stack>
    );
};

export default PageHeader;

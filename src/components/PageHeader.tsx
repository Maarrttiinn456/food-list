import { Box, Stack, Typography, alpha } from "@mui/material";
import type { ReactNode } from "react";

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    icon: ReactNode;
}

const PageHeader = ({ title, subtitle, icon }: PageHeaderProps) => {
    return (
        <Stack direction="row" alignItems="center" spacing={2} mb={4}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 52,
                    height: 52,
                    borderRadius: "16px",
                    background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: "white",
                    boxShadow: (theme) => `0 4px 16px ${alpha(theme.palette.primary.main, 0.35)}`,
                    flexShrink: 0,
                }}
            >
                {icon}
            </Box>
            <Box>
                <Typography variant="h5" fontWeight={800} lineHeight={1.2} letterSpacing="-0.5px">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Stack>
    );
};

export default PageHeader;

import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button, Link as MuiLink } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import bgmaps from '../assets/bgmaps.png';

const linkStyles = { color: "rgb(119, 119, 119)", fontSize: "0.875rem" };

const SocialIcons = () => (
    <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton aria-label="Facebook" href="https://www.facebook.com" target="_blank" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
            <FacebookIcon />
        </IconButton>
        <IconButton aria-label="Twitter" href="https://www.twitter.com" target="_blank" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
            <TwitterIcon />
        </IconButton>
        <IconButton aria-label="Instagram" href="https://www.instagram.com" target="_blank" sx={{ color: "rgba(0, 0, 0, 0.6)" }}>
            <InstagramIcon />
        </IconButton>
    </Box>
);

const PrivacyLinks = () => (
    <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", justifyContent: "center" }}>
        <MuiLink href="#" underline="hover" sx={linkStyles}>Privacy Policy</MuiLink>
        <Typography sx={{ fontSize: "0.85rem", color: "rgb(119, 119, 119)" }}>|</Typography>
        <MuiLink href="#" underline="hover" sx={linkStyles}>Terms of Service</MuiLink>
        <Typography sx={{ fontSize: "0.85rem", color: "rgb(119, 119, 119)" }}>|</Typography>
        <MuiLink href="#" underline="hover" sx={linkStyles}>Cookie Policy</MuiLink>
    </Box>
);

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundImage: `url(${bgmaps})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "rgba(0, 0, 0, 0.6)",
                fontFamily: "Arial, sans-serif",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    maxWidth: { xs: 300, sm: 400, md: 600 },
                    mb: 2,
                }}
            >
                <Paper
                    component="form"
                    aria-label="Branch search form"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        padding: "4px 8px",
                        borderRadius: 10,
                    }}
                >
                    <IconButton aria-label="search">
                        <SearchIcon />
                    </IconButton>
                    <InputBase
                        placeholder="Find your branch..."
                        aria-label="Branch search input"
                        sx={{ flex: 1, marginLeft: 1 }}
                    />
                    <Button
                        type="submit"
                        sx={{
                            padding: "8px 16px",
                            fontWeight: "bold",
                            textTransform: "none",
                            color: "#0070C0"
                        }}
                    >
                        Search
                    </Button>
                </Paper>
            </Box>

            <Typography sx={{ color: "rgb(51, 51, 51)" }}>
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            <SocialIcons />
            <PrivacyLinks />
        </Box>
    );
};

export default Footer;

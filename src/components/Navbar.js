import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Drawer,
    Box,
    Button,
    Badge,
    List,
    ListItem,
    ListItemText,
    Typography,
    Divider,
    Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { authStore, logout } from "../stores/authStore";
import caixabankIcon from "../assets/caixabank-icon-blue.png";

const buttonStyles = {
    color: "black",
    mr: 2,
    padding: "10px 25px",
    "&:hover": {
        backgroundColor: "#e0e0e0",
    },
};

const navLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Transactions", path: "/transactions" },
    { label: "Analysis", path: "/analysis" },
    { label: "Settings", path: "/settings" },
    { label: "Support", path: "/support" },
];

const NavigationLinks = ({ isAuthenticated }) => (
    <>
        {isAuthenticated
            ? navLinks.map((link) => (
                <Link key={link.path} to={link.path} style={{ textDecoration: "none" }}>
                    <Button sx={buttonStyles}>{link.label}</Button>
                </Link>
            ))
            : (
                <>
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button sx={buttonStyles}>Login</Button>
                    </Link>
                    <Link to="/register" style={{ textDecoration: "none" }}>
                        <Button sx={buttonStyles}>Register</Button>
                    </Link>
                </>
            )}
    </>
);

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated } = useStore(authStore);
    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        aria-label="Open navigation menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: "block", md: "none" }, mt: 1 }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                            flexGrow: { xs: 1, md: 0 },
                        }}
                    >
                        <Box component="span" sx={{ display: { xs: "none", md: "block" } }}>
                            <img
                                src={caixabankIcon}
                                alt="CaixaBank Logo"
                                style={{ width: 40, height: "auto", marginRight: 20, marginTop: 5 }}
                            />
                        </Box>
                        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
                            CaixaBankNow
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            justifyContent: "flex-end",
                            ml: "auto"
                        }}
                    >
                        <NavigationLinks isAuthenticated={isAuthenticated} />

                        {isAuthenticated && (
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ mx: 1, height: 28, alignSelf: "center", bgcolor: "rgba(0, 0, 0, 0.12)" }}
                            />
                        )}

                        {isAuthenticated && (
                            <Button
                                onClick={handleLogout}
                                sx={buttonStyles}
                            >
                                Logout
                            </Button>
                        )}
                    </Box>

                    <IconButton aria-label="Notifications" sx={{ display: { xs: "block", md: "block" }, mr: 1.25 }}>
                        <Badge color="error" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>

                    {isAuthenticated && (
                        <IconButton sx={{ display: { xs: "none", md: "block" } }}>
                            <Avatar
                                src="/namine.jpg"
                                alt="User Avatar"
                                sx={{ width: 40, height: 40 }}
                            />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                    sx={{ width: 250 }}
                >
                    <List>
                        {isAuthenticated ? (
                            navLinks.map((link) => (
                                <Link key={link.path} to={link.path} style={{ textDecoration: "none" }}>
                                    <ListItem button sx={{ mb: 2 }}>
                                        <ListItemText primary={link.label} />
                                    </ListItem>
                                </Link>
                            ))
                        ) : (
                            <>
                                <Link to="/login" style={{ textDecoration: "none" }}>
                                    <ListItem button sx={{ mb: 1 }}>
                                        <ListItemText primary="Login" />
                                    </ListItem>
                                </Link>
                                <Link to="/register" style={{ textDecoration: "none" }}>
                                    <ListItem button sx={{ mb: 1 }}>
                                        <ListItemText primary="Register" />
                                    </ListItem>
                                </Link>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Navbar;

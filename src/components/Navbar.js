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
    Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";
import { useStore } from "@nanostores/react";
import { authStore } from "../stores/authStore";
import caixabankIcon from "../assets/caixabank-icon-blue.png";

const Navbar = ({ toggleTheme, isDarkMode }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { isAuthenticated } = useStore(authStore);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}
            >
                <Toolbar>
                    <IconButton
                        edge="start"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Logo en la esquina superior izquierda */}
                    <Link
                        to="/"
                        style={{
                            textDecoration: "none",
                            color: "black",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={caixabankIcon}
                            alt="CaixaBank Logo"
                            style={{ width: 40, height: "auto", marginRight: 6 }}
                        />
                        <Typography
                            variant="h6"
                            sx={{
                                fontStyle: "italic",
                                marginRight: { xs: 2, sm: 10, md: 20, lg: 60 },
                            }}
                        >
                            CaixaBankNow
                        </Typography>
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "black" }}>Dashboard</Button>
                        </Link>
                        <Link to="/transactions" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "black" }}>Transactions</Button>
                        </Link>
                        <Link to="/analysis" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "black" }}>Analysis</Button>
                        </Link>
                        <Link to="/settings" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "black" }}>Settings</Button>
                        </Link>
                        <Link to="/support" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "black" }}>Support</Button>
                        </Link>
                        <Link to="/logout" style={{ textDecoration: "none" }}>
                            <Button sx={{ color: "black" }}>Logout</Button>
                        </Link>
                    </Box>


                    {!isAuthenticated ? ( // Si no está autenticado, muestra los botones de Login y Register
                        <>
                            <Link to="/login" style={{ textDecoration: 'none' }}>
                                <Button sx={{ color: 'black', marginRight: 2 }}>Login</Button>
                            </Link>
                            <Link to="/register" style={{ textDecoration: 'none' }}>
                                <Button sx={{ color: 'black' }}>Register</Button>
                            </Link>
                        </>
                    ) : (
                        <IconButton>
                            <Avatar
                                src="/namine.jpg" // Ruta correcta a la imagen del Avatar
                                alt="User Avatar"
                                sx={{ width: 40, height: 40 }}
                            />
                        </IconButton>
                    )}
                    <IconButton>
                        <Badge color="error" variant="dot">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
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
                            <>
                                <Link to="/dashboard" style={{ textDecoration: "none" }}>
                                    <ListItem button>
                                        <ListItemText primary="Dashboard" />
                                    </ListItem>
                                </Link>
                                <Link to="/transactions" style={{ textDecoration: "none" }}>
                                    <ListItem button>
                                        <ListItemText primary="Transactions" />
                                    </ListItem>
                                </Link>
                                <Link to="/analysis" style={{ textDecoration: "none" }}>
                                    <ListItem button>
                                        <ListItemText primary="Analysis" />
                                    </ListItem>
                                </Link>
                                <Link to="/settings" style={{ textDecoration: "none" }}>
                                    <ListItem button>
                                        <ListItemText primary="Settings" />
                                    </ListItem>
                                </Link>
                                <Link to="/logout" style={{ textDecoration: "none" }}>
                                    <ListItem button>
                                        <ListItemText primary="Logout" />
                                    </ListItem>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{ textDecoration: "none" }}>
                                    <ListItem button>
                                        <ListItemText primary="Login" />
                                    </ListItem>
                                </Link>
                                <Link to="/register" style={{ textDecoration: "none" }}>
                                    <ListItem button>
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

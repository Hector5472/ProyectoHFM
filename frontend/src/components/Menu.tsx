// frontend/src/components/Menu.tsx
import { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/index";
import { authActions } from "../store/authSlice";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function Menu() {
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state: RootState) => state.authentication);

    const toggleDrawer = (value: boolean) => () => setOpen(value);

    const handleLogout = () => {
        dispatch(authActions.logout());
        navigate("/");
    };

    // Evita entrar sin estar autenticado
    useEffect(() => {
        if (!userData.isAutenticated){
            navigate("/");
        } 
    }, [userData.isAutenticated, navigate]);

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>

                
                <Link to="/home" style={{textDecoration: "none", color: "white" }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Inicio" />
                        </ListItemButton>
                    </ListItem>
                </Link>

                {/* sólo cuando el rol sea admin se muestra Informes */}
                {userData.userRol === "admin" && (
                <Link to="/reports" style={{textDecoration: "none", color: "white" }}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AssessmentIcon />
                            </ListItemIcon>
                            <ListItemText primary="Informes" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                )}

                
                <ListItem disablePadding onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Salir" />
                    </ListItemButton>
                </ListItem>

            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>

                    {/* Botón menú */}
                    <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>

                    {/* Usuario centrado */}
                    <Typography sx={{ flexGrow: 1 }} variant="h6" align="center">
                        {userData.userName}
                    </Typography>

                    {/* Icono de usuario */}
                    <Typography>{userData.userRol} </Typography>
                    {userData.userRol === "user" && (
                    <AccountCircleIcon fontSize="large" />
                    )}
                    {userData.userRol === "admin" && (
                    <AdminPanelSettingsIcon fontSize="large" color="secondary" />
                    )}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
        </>
    );
}

// frontend/src/components/Menu.tsx
import { useEffect, useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Drawer, Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
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
        if (!userData.isAutenticated) {
            navigate("/");
        }
    }, [userData.isAutenticated, navigate]);

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>


                <Tooltip title="Ir a la página principal" placement="right" arrow>
                    <Link to="/home" style={{ textDecoration: "none", color: "white" }}>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon><HomeIcon /></ListItemIcon>
                                <ListItemText primary="Inicio" />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </Tooltip>

                {userData.userRol === "admin" && (
                    <Tooltip title="Ver informes de la colección (solo admin)" placement="right" arrow>
                        <Link to="/reports" style={{ textDecoration: "none", color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon><AssessmentIcon /></ListItemIcon>
                                    <ListItemText primary="Informes" />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    </Tooltip>
                )}

                <Tooltip title="Cerrar sesión y volver al login" placement="right" arrow>
                    <ListItem disablePadding onClick={handleLogout}>
                        <ListItemButton>
                            <ListItemIcon><LogoutIcon /></ListItemIcon>
                            <ListItemText primary="Salir" />
                        </ListItemButton>
                    </ListItem>
                </Tooltip>

            </List>
        </Box>
    );

    return (
        <>
            <AppBar position="static">
                <Toolbar>

                    {/* Botón menú */}
                    <Tooltip title="Abrir menú de navegación" placement="bottom" arrow>
                        <IconButton color="inherit" edge="start" onClick={toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>
                    </Tooltip>

                    {/* Usuario centrado */}
                    <Typography sx={{ flexGrow: 1 }} variant="h6" align="center">
                        {userData.userName}
                    </Typography>

                    {/* Icono de usuario */}
                    <Tooltip title={`Rol: ${userData.userRol}`} placement="bottom" arrow>
                        <Typography>{userData.userRol} </Typography>
                    </Tooltip>
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

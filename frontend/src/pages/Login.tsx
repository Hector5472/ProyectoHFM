import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/authSlice";



export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState("");
    const [passwd, setPasswd] = useState("");
    const [alerta, setAlerta] = useState<{ tipo: "success" | "error" | ""; mensaje: string }>({
        tipo: "",
        mensaje: "",
    });

    async function isVerifiedUser() {
        fetch(`http://localhost:3030/login?user=${user}&password=${passwd}`)
            .then(response => response.json())
            .then(response => {
                console.log('Lo que nos llega de la base de datos: ')
                console.log(response.data)
                if (response.data.length !== 0) {

                    dispatch(
                        authActions.login({
                            name: response.data.nombre,
                            rol: response.data.rol
                        })
                    );

                    navigate("/home");

                } else {
                    setAlerta({ tipo: "error", mensaje: "Usuario o contraseña incorrectos" });
                }
            })
    }


    const handleSubmit = (e: any) => {
        e.preventDefault();
        isVerifiedUser();
    };

    return (
        <>
            <header>
                <Typography variant="h4" align="center">
                    Página Login de Héctor Fleitas Martín
                </Typography>
            </header>

            <main>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2
                    }}
                >
                    <Typography variant="h5" color="primary" align="center">
                        Sistema de acceso
                    </Typography>
                    <LockIcon sx={{ alignSelf: "center" }} />

                    <TextField
                        label="Usuario"
                        variant="outlined"
                        required
                        fullWidth
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />

                    <TextField
                        label="Contraseña"
                        variant="outlined"
                        type="password"
                        required
                        fullWidth
                        value={passwd}
                        onChange={(e) => setPasswd(e.target.value)}
                    />

                    <Button variant="contained" fullWidth type="submit">
                        Acceder
                    </Button>


                    {alerta.tipo && (
                        <Alert severity={alerta.tipo}>
                            {alerta.mensaje}
                        </Alert>
                    )}
                </Box>
            </main>
        </>
    );
}

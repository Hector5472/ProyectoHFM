import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";

export default function Login() {
    const bduser = "Héctor";
    const bdpasswd = "merequetenge";

    const [user, setUser] = useState("");
    const [passwd, setPasswd] = useState("");
    const [alerta, setAlerta] = useState<{ tipo: "success" | "error" | ""; mensaje: string }>({
        tipo: "",
        mensaje: "",
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();

        console.log("Usuario introducido:", user);
        console.log("Contraseña introducida:", passwd);

        if (bduser === user && bdpasswd === passwd) {
            setAlerta({ tipo: "success", mensaje: "Acceso concedido" });
        } else {
            setAlerta({ tipo: "error", mensaje: "Usuario o contraseña incorrectos" });
        }
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

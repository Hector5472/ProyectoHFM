import { Button, Container, Typography } from "@mui/material";

export default function Login() {
    return (
        <>
            <header>
                <Typography variant="h1">Página Login de Héctor Fleitas Martín</Typography>
            </header>
            <main>
                <Container>
                    <Typography variant="h1" color="primary">Ejemplo H1</Typography>
                    <Typography variant="h2" color="secondary">Ejemplo H2</Typography>
                    <Typography variant="h3" color="error">Ejemplo H3</Typography>
                    <Typography variant="subtitle1">Subtítulo ejemplo</Typography>
                    <Typography variant="body1">Texto de ejemplo para el body1. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Typography>
                    <Typography variant="caption">Texto de ejemplo para el caption.</Typography>
                </Container>
            </main>
            
            <footer>
                <Container>
                    <Button variant="text" color="primary">Botón Texto</Button>
                    <Button variant="contained" color="primary">Botón Contenido</Button>
                    <Button variant="outlined" color="primary">Botón Contorneado</Button>
                    <br />
                    <Button variant="contained" color="primary">Botón Primario</Button>
                    <Button variant="contained" color="secondary">Botón Secundario</Button>
                    <Button variant="contained" color="error">Botón Error</Button>
                    <Button variant="contained" color="success">Botón Éxito</Button>
                    <Button variant="contained" color="warning">Botón Advertencia</Button>
                </Container>
            </footer>
        </>
    );
}

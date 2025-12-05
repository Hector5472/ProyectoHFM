import { Typography } from "@mui/material";

export default function InformeColeccion({data}: {data: any}) {
    return (
        <ul>
            {data && data.length > 0 ? (
                data.map((item: any, index: number) => (
                    <li key={index}>
                        <Typography variant="h6">
                            Nombre: {item.nombre}, Marca: {item.marca}, Tipo: {item.tipo}, Precio: {item.precio}
                        </Typography>
                    </li>
                ))
            ) : (
                <Typography variant="h6">No hay datos disponibles</Typography>
            )}
        </ul>
    );
}
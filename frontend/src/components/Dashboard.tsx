import { useState, useEffect } from "react";
import {
    Box,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface itemtype {
    id?: number;
    nombre: string;
    marca: string;
    tipo: string;
    precio: number;
}

const itemInitialState: itemtype = {
    nombre: "",
    marca: "",
    tipo: "",
    precio: 0
};

export default function Dashboard() {
    const [item, setItem] = useState<itemtype>(itemInitialState);
    const [tableData, setTableData] = useState<itemtype[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setItem({
            ...item,
            [name]: name === "precio" ? Number(value) : value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        fetch(
            `http://localhost:3030/addItem?nombre=${item.nombre}&marca=${item.marca}&tipo=${item.tipo}&precio=${item.precio}`
        )
            .then(res => res.json())
            .then(result => {
                if (result > 0) {
                    alert("Datos guardados con éxito");
                    setItem(itemInitialState);
                    loadTableData();
                }
            });
    };

    const loadTableData = () => {
        fetch("http://localhost:3030/getItems")
            .then(res => res.json())
            .then(data => {
                setTableData(data.data);
            });
    };

    useEffect(() => {
        loadTableData();
    }, []);

    const handleDeleteItem = (row: itemtype) => {
        fetch(`http://localhost:3030/deleteItem?id=${row.id}`)
            .then(res => res.json())
            .then(result => {
                if (result > 0) {
                    alert("Registro eliminado");
                    loadTableData();
                }
            });
    };

    return (
        <Box sx={{ p: 3 }}>

            
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    maxWidth: "400px",
                    marginBottom: "40px"
                }}
            >
                <TextField
                    label="Nombre"
                    name="nombre"
                    value={item.nombre}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Marca"
                    name="marca"
                    value={item.marca}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Tipo"
                    name="tipo"
                    value={item.tipo}
                    onChange={handleChange}
                    required
                />

                <TextField
                    label="Precio"
                    name="precio"
                    type="number"
                    value={item.precio}
                    onChange={handleChange}
                    required
                />

                <Button variant="contained" type="submit">
                    + INSERTAR DATOS
                </Button>
            </form>

            
            <TableContainer component={Paper}>
                <Table aria-label="tabla coleccion">
                    <TableHead>
                        <TableRow>
                            <TableCell>Borrar</TableCell>
                            <TableCell>ID</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Precio</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tableData.map((row: itemtype) => (
                            <TableRow key={row.id}>
                                <TableCell>
                                    <Button
                                        color="error"
                                        onClick={() => handleDeleteItem(row)}
                                    >
                                        <DeleteForeverIcon />
                                    </Button>
                                </TableCell>

                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.nombre}</TableCell>
                                <TableCell>{row.marca}</TableCell>
                                <TableCell>{row.tipo}</TableCell>
                                <TableCell>{row.precio}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}

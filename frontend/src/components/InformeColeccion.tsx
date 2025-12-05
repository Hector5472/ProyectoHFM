import MaterialTable from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";

export default function InformeColeccion({ data }: { data: any[] }) {
    return (
        <MaterialTable
            title="Informe de Colección"
            columns={[
                // Una tabla con las columnas nombre, marca, tipo y precio. Solo filtro en marca y tipo
                { title: "Nombre", field: "nombre", filtering: false },
                { title: "Marca", field: "marca", filtering: true },
                { title: "Tipo", field: "tipo", filtering: true },
                { title: "Precio", field: "precio", type: "numeric", filtering: false }
            ]}
            data={data}

            options={{
                filtering: true,
                columnsButton: true,    // Para mostrar las columnas que queramos            
                draggable: true,    // Mover las columnas a nuestro antojo        

                // Exportar a CSV y PDF
                exportMenu: [
                    {
                        label: "Exportar CSV",
                        exportFunc: (cols, datas) =>
                            ExportCsv(cols, datas, "informe_coleccion")
                    },
                    {
                        label: "Exportar PDF",
                        exportFunc: (cols, datas) =>
                            ExportPdf(cols, datas, "informe_coleccion")
                    }
                ],
                headerStyle: {
                    backgroundColor: "#ff5100ff",   // Unos colores chulos que pegan con la app
                    color: "#fff"
                }
            }}
            components={{
                // Y ya por último, un footer que sume el total de los precios
                Pagination: () => {
                    const total = data.reduce((acc, item) => acc + Number(item.precio), 0);
                    return (
                        <div style={{ padding: 16, fontWeight: "bold" }}>
                            Total precios: {total.toFixed(2)} €
                        </div>

                    );
                }
            }}
        />
    );
}
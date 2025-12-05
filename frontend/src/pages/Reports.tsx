import { Button } from "@mui/material";
import Menu from "../components/Menu";
import InformeColeccion from "../components/InformeColeccion";
import { useState, type FormEvent } from "react";

export default function Reports() {

  const [buttonClicked, setButtonClicked] = useState(false);
  const [coleccionData, setColeccionData] = useState<any[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch("http://localhost:3030/getItems")
      .then((res) => res.json())
      .then((data) => {
        setColeccionData(data.data);
        setButtonClicked(true);
      });


  };

  return (
    <>
      <Menu />
      <form
        style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}
        onSubmit={handleSubmit}
      >
        <Button type="submit" variant="contained" color="primary">
          Informe Colección
        </Button>
      </form>

      {buttonClicked && (
        <InformeColeccion data={coleccionData} />
      )}
    </>
  );
}
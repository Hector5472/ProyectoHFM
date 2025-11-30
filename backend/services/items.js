const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function insertData(req, res) {
    const data = req.query;

    const result = await db.query(
        `
        INSERT INTO coleccion (nombre, marca, tipo, precio)
        VALUES ('${data.nombre}', '${data.marca}', '${data.tipo}', ${data.precio});
        `
    );

    return result.affectedRows;
}

async function getData(req, res) {
    const rows = await db.query(`
        SELECT id, nombre, marca, tipo, precio
        FROM coleccion;
    `);

    const data = helper.emptyOrRows(rows);

    return { data };
}

async function deleteData(req, res) {
    const data = req.query;

    const result = await db.query(`
        DELETE FROM coleccion
        WHERE id = ${data.id};
    `);

    return result.affectedRows;
}

module.exports = {
    insertData,
    getData,
    deleteData
};

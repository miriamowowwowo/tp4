import { conn } from "../db.js";

const getArtistas = async (_, res) => {
    const [rows, fields] = await conn.query('SELECT * from artistas');
    res.json(rows);
};

const getArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query('SELECT id,nombre from artistas WHERE id = ?',[id]);
    res.json(rows[0]);
};

const createArtista = async (req, res) => {
    const nombre = req.body.nombre;
    const [rows, fields] = await conn.query('INSERT INTO artistas (nombre) VALUES (?)',[nombre]);
    res.send(`Se pudo agregar a ${nombre} de forma correcta`);
};

const updateArtista = async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const [rows, fields] = await conn.query(`UPDATE artistas SET nombre = ? WHERE id = ?`,[nombre,id]);
    res.send(`Se logro actualizar de forma correcta`);
};

const deleteArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query(`DELETE FROM artistas WHERE id = ?`,[id]);
    res.send(`Se pudo eliminar el artista de forma correcta`);
};

const getAlbumesByArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT albumes.id,albumes.nombre,artista.nombre AS nombre_artista from albumes
    JOIN artistas on artistas.id=albumes.artista
    WHERE artistas.id= ?`,[id]);
    res.json(rows);
};

const getCancionesByArtista = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones from canciones
    JOIN albumes on canciones.album = albumes.id
    JOIN artistas on albumes.artista = artistas.id
    WHERE artistas.id = ?`,[id]);
    res.json(rows);
};

const artistas = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};

export default artistas;

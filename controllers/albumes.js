import { conn } from "../db.js";

const getAlbumes = async (_, res) => {
    const[rows,fields] = await conn.query(`
    SELECT albumes.id, albumes.nombre, artistas.nombre AS nombre_artista from albumes
    JOIN aristas on artistas.id=albumes.artista`);
    res.json(rows);
};

const getAlbum = async (req, res) => {   
    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT albumes.id,albumes.nombre,artistas.nombre AS nombre_artista from albumes
    JOIN artistas on artistas.id=AL.artista
    WHERE albumes.id= ?`,[id]);
    res.json(rows[0]);
};

const createAlbum = async (req, res) => {
    const nombre = req.body.nombre;
    const artista = req.body.artista;
    const [rows, fields] = await conn.query('INSERT INTO albumes (nombre,artista) VALUES (?,?)',[nombre,artista]);
    res.send(`Se pudo agregar ${nombre} de forma correcta`);
};

const updateAlbum = async (req, res) => {
    const id = req.params.id;
    const nombre = req.body.nombre;
    const artista = req.body.artista;
    const [rows, fields] = await conn.query(`UPDATE albumes SET nombre = ?, artista =?
    WHERE id = ?`,[nombre,artista,id]);
    res.send(`Se pudo actualizar de forma correcta`);
};

const deleteAlbum = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query(`DELETE FROM albumes WHERE id = ?`,[id]);
    res.send(`Se puedo eliminar el album de forma correcta`);
};

const getCancionesByAlbum = async (req, res) => {
    const id = req.params.id;
    const [rows, fields] = await conn.query(`
    SELECT canciones.id, canciones.nombre, artistas.nombre AS nombre_artista, albumes.nombre AS nombre_album, canciones.duracion, canciones.reproducciones from canciones
    JOIN albumes on canciones.album = albumes.id
    JOIN artistas on albumes.artista = artistas.id
    WHERE albumes.id = ?`,[id]);
    res.json(rows);
};

const albumes = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};

export default albumes;

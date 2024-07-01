import mysql from "mysql2/promise";

export const conn = await mysql.createConnection({
    user : 'root',
    password: 'rootroot',
    host: 'localhost',
    database: 'tp4'
});

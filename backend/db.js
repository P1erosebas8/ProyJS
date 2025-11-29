const mysql = require("mysql2/promise");

async function createConnection() {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: ""
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS login_db`);
    await connection.end();
}

async function createTables(pool) {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
        )
    `);

    await pool.query(`
        INSERT INTO usuarios (email, password)
        SELECT * FROM (SELECT 'admin@admin.com', 'admin123') AS tmp
        WHERE NOT EXISTS (
            SELECT email FROM usuarios WHERE email = 'admin@admin.com'
        ) LIMIT 1;
    `);
}

(async () => {
    await createConnection();
})();

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_db"
});

createTables(pool);

module.exports = pool;

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
    
    await pool.query("DROP TABLE IF EXISTS inscripciones");
    await pool.query("DROP TABLE IF EXISTS lecciones");
    await pool.query("DROP TABLE IF EXISTS cursos");
    await pool.query("DROP TABLE IF EXISTS usuarios");
    

   
    await pool.query(`
        CREATE TABLE usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            rol ENUM('administrador', 'estudiante') DEFAULT 'estudiante'
        )
    `);

    await pool.query(`
        CREATE TABLE cursos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            descripcion TEXT,
            imagen VARCHAR(255),
            precio DECIMAL(10, 2) DEFAULT 0.00
        )
    `);

    await pool.query(`
        CREATE TABLE inscripciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            curso_id INT NOT NULL,
            fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
        )
    `);

    await pool.query(`
        CREATE TABLE lecciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            curso_id INT NOT NULL,
            titulo VARCHAR(255) NOT NULL,
            contenido TEXT,
            video_url VARCHAR(255),
            orden INT DEFAULT 0,
            FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
        )
    `);

    
    await pool.query(`
        INSERT INTO usuarios (email, password, rol) VALUES ('admin@admin.com', 'admin123', 'administrador')
    `);

    
    await pool.query(`
        INSERT INTO usuarios (email, password, rol) VALUES ('estudiante@ejemplo.com', 'estudiante123', 'estudiante')
    `);

    
    const [courses] = await pool.query("SELECT * FROM cursos");
    if (courses.length === 0) {
        await pool.query(`
            INSERT INTO cursos (titulo, descripcion, imagen, precio) VALUES
            ('Introducción a React', 'Aprende los fundamentos de React, componentes y hooks.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png', 0.00),
            ('Node.js y Express', 'Construye APIs RESTful robustas con Node.js.', 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg', 10.00)
        `);

        await pool.query(`
            INSERT INTO lecciones (curso_id, titulo, contenido, video_url, orden) VALUES
            (1, 'Bienvenida', 'Introducción al curso de React.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1),
            (1, 'Componentes', 'Qué son los componentes.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 2),
            (2, 'Setup Inicial', 'Instalando Node.js.', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 1)
        `);
    }
}

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_db"
});

(async () => {
    try {
        await createConnection();
        await createTables(pool);
        console.log("Base de datos y tablas inicializadas correctamente.");
    } catch (error) {
        console.error("Error inicializando la base de datos:", error);
    }
})();

module.exports = pool;
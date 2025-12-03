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
    // BORRAR SOLO EN DESARROLLO
    if (process.env.RECREATE_DB === "true") {
        await pool.query("DROP TABLE IF EXISTS inscripciones");
        await pool.query("DROP TABLE IF EXISTS lecciones");
        await pool.query("DROP TABLE IF EXISTS cursos");
        await pool.query("DROP TABLE IF EXISTS usuarios");
        await pool.query("DROP TABLE IF EXISTS progreso_lecciones");
    }

    await pool.query(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            rol ENUM('administrador', 'estudiante') DEFAULT 'estudiante'
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS cursos (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            descripcion TEXT,
            imagen VARCHAR(255),
            precio DECIMAL(10, 2) DEFAULT 0.00
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS inscripciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            curso_id INT NOT NULL,
            fecha_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY (curso_id) REFERENCES cursos(id) ON DELETE CASCADE
        )
    `);

    await pool.query(`
        CREATE TABLE IF NOT EXISTS lecciones (
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
        CREATE TABLE IF NOT EXISTS progreso_lecciones (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            leccion_id INT NOT NULL,
            completado TINYINT(1) DEFAULT 1,
            fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
            FOREIGN KEY (leccion_id) REFERENCES lecciones(id) ON DELETE CASCADE
        )
    `);

    await pool.query(`
        INSERT IGNORE INTO usuarios (email, password, rol)
        VALUES
        ('admin@admin.com', 'admin123', 'administrador'),
        ('estudiante@ejemplo.com', 'estudiante123', 'estudiante')
    `);

    const [courses] = await pool.query("SELECT * FROM cursos");
    if (courses.length === 0) {
        await pool.query(`
            INSERT INTO cursos (titulo, descripcion, imagen, precio) VALUES
            ('Introducción a React', 'Aprende bases de React.', '', 0),
            ('Node.js y Express', 'Construye APIs', '', 10)
        `);

        await pool.query(`
            INSERT INTO lecciones (curso_id, titulo, contenido, orden) VALUES
            (1, 'Bienvenida', 'Introducción', 1),
            (1, 'Componentes', 'Componentes en React', 2),
            (2, 'Setup', 'Instalación Node.js', 1)
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
        console.log("Base de datos y tablas OK");
    } catch (err) {
        console.error("Error DB:", err);
    }
})();

module.exports = pool;

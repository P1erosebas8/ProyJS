const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all courses
router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM cursos");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener cursos" });
    }
});

// Get course details with lessons
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const [courseRows] = await pool.query("SELECT * FROM cursos WHERE id = ?", [id]);

        if (courseRows.length === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        const [lessonRows] = await pool.query(
            "SELECT * FROM lecciones WHERE curso_id = ? ORDER BY orden ASC",
            [id]
        );

        // 👇 AGREGAR ESTO
        const progreso = { completadas: [] };

        res.json({
            ...courseRows[0],
            lecciones: lessonRows,
            progreso // 👈 agregarlo aquí
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener detalles del curso" });
    }
});
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Obtener curso
        const [courseRows] = await pool.query(
            "SELECT * FROM cursos WHERE id = ?",
            [id]
        );

        if (courseRows.length === 0) {
            return res.status(404).json({ error: "Curso no encontrado" });
        }

        // Obtener lecciones
        const [lessonRows] = await pool.query(
            "SELECT * FROM lecciones WHERE curso_id = ? ORDER BY orden ASC",
            [id]
        );

        // 👇 PROGRESO DEFAULT (vacío)
        const progreso = { completadas: [] };

        // Retornamos todo junto
        res.json({
            ...courseRows[0],
            lecciones: lessonRows,
            progreso: progreso   // 👈 asegurarse que esté aquí
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener detalles del curso" });
    }
});

// Enroll in a course
router.post("/enroll", async (req, res) => {
    try {
        const { usuario_id, curso_id } = req.body;

        // Check if already enrolled
        const [existing] = await pool.query(
            "SELECT * FROM inscripciones WHERE usuario_id = ? AND curso_id = ?",
            [usuario_id, curso_id]
        );

        if (existing.length > 0) {
            return res.status(400).json({ error: "Ya estás inscrito en este curso" });
        }

        await pool.query(
            "INSERT INTO inscripciones (usuario_id, curso_id) VALUES (?, ?)",
            [usuario_id, curso_id]
        );

        res.json({ message: "Inscripción exitosa" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al inscribirse" });
    }
});

module.exports = router;

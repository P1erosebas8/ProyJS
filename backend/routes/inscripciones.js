const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                i.id,
                i.usuario_id,
                i.curso_id,
                i.fecha_inscripcion,
                u.email,
                c.titulo,
                c.descripcion,
                c.precio
            FROM inscripciones i
            JOIN usuarios u ON u.id = i.usuario_id
            JOIN cursos c ON c.id = i.curso_id
        `);

        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo inscripciones" });
    }
});

router.get("/usuario/:usuarioId", async (req, res) => {
    try {
        const { usuarioId } = req.params;

        const [rows] = await pool.query(
            `
            SELECT 
                i.id,
                i.fecha_inscripcion,
                c.id AS curso_id,
                c.titulo,
                c.descripcion,
                c.precio
            FROM inscripciones i
            JOIN cursos c ON c.id = i.curso_id
            WHERE i.usuario_id = ?
            `,
            [usuarioId]
        );

        const result = rows.map(r => ({
            id: r.id,
            fecha_inscripcion: r.fecha_inscripcion,
            curso: {
                id: r.curso_id,
                titulo: r.titulo,
                descripcion: r.descripcion,
                precio: r.precio
            }
        }));

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error obteniendo inscripciones del usuario" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { usuario_id, curso_id } = req.body;

        const fecha = new Date();

        const [result] = await pool.query(
            "INSERT INTO inscripciones (usuario_id, curso_id, fecha_inscripcion) VALUES (?, ?, ?)",
            [usuario_id, curso_id, fecha]
        );

        res.json({
            id: result.insertId,
            usuario_id,
            curso_id,
            fecha_inscripcion: fecha
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creando inscripción" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM inscripciones WHERE id=?", [req.params.id]);
        res.json({ message: "Inscripción eliminada" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error eliminando inscripción" });
    }
});


module.exports = router;

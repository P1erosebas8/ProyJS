const express = require("express");
const router = express.Router();
const pool = require("../db");
const verificarToken = require("./auth");

router.post("/completar", verificarToken, async (req, res) => {
    try {
        const { leccion_id } = req.body;
        const usuario_id = req.usuario.id;

        if (!leccion_id) {
            return res.status(400).json({ error: "Falta leccion_id" });
        }

        await pool.query(`
            INSERT INTO progreso_lecciones (usuario_id, leccion_id, completado)
            VALUES (?, ?, 1)
            ON DUPLICATE KEY UPDATE completado = 1
        `, [usuario_id, leccion_id]);

        res.json({ message: "Progreso guardado" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al guardar progreso" });
    }
});

// OBTENER PROGRESO DE UN CURSO
// router.get("/curso/:cursoId", verificarToken, async (req, res) => {
router.get("/curso/:cursoId", async (req, res) => {
    try {
        const { cursoId } = req.params;
        const usuario_id = 1; // usuario de prueba

        const [total] = await pool.query(
            "SELECT COUNT(*) AS total FROM lecciones WHERE curso_id = ?",
            [cursoId]
        );

        const [completadas] = await pool.query(
            `SELECT leccion_id 
             FROM progreso_lecciones 
             WHERE usuario_id = ? 
             AND leccion_id IN (SELECT id FROM lecciones WHERE curso_id = ?)`,
            [usuario_id, cursoId]
        );

        res.json({
            total: total[0].total,
            completadas: completadas.map(l => l.leccion_id),
            porcentaje: total[0].total > 0
                ? Math.round((completadas.length / total[0].total) * 100)
                : 0
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al obtener progreso" });
    }
});




module.exports = router;

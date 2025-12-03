const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    const [rows] = await pool.query("SELECT * FROM cursos");
    res.json(rows);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const [curso] = await pool.query("SELECT * FROM cursos WHERE id=?", [id]);

    if (curso.length === 0) {
        return res.status(404).json({ error: "Curso no encontrado" });
    }

    const [lecciones] = await pool.query(
        "SELECT * FROM lecciones WHERE curso_id=? ORDER BY orden ASC",
        [id]
    );

    res.json({ ...curso[0], lecciones });
});

router.post("/", async (req, res) => {
    const { titulo, descripcion, imagen, precio } = req.body;

    const [result] = await pool.query(
        "INSERT INTO cursos (titulo, descripcion, imagen, precio) VALUES (?, ?, ?, ?)",
        [titulo, descripcion, imagen, precio]
    );

    res.json({
        id: result.insertId,
        titulo,
        descripcion,
        imagen,
        precio
    });
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, imagen, precio } = req.body;

    await pool.query(
        "UPDATE cursos SET titulo=?, descripcion=?, imagen=?, precio=? WHERE id=?",
        [titulo, descripcion, imagen, precio, id]
    );

    res.json({ message: "Curso actualizado" });
});


router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM cursos WHERE id=?", [req.params.id]);
    res.json({ message: "Curso eliminado" });
});

module.exports = router;

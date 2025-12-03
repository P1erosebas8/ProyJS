const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error consultando usuarios" });
    }
});

router.post("/", async (req, res) => {
    const { email, password, rol } = req.body;

    const [result] = await pool.query(
        "INSERT INTO usuarios (email, password, rol) VALUES (?, ?, ?)",
        [email, password, rol]
    );

    res.json({
        id: result.insertId,
        email,
        rol
    });
});


router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { email, password, rol } = req.body;

    await pool.query(
        "UPDATE usuarios SET email=?, password=?, rol=? WHERE id=?",
        [email, password, rol, id]
    );

    res.json({ message: "Usuario actualizado" });
});


router.delete("/:id", async (req, res) => {
    await pool.query("DELETE FROM usuarios WHERE id=?", [req.params.id]);
    res.json({ message: "Usuario eliminado" });
});

module.exports = router;

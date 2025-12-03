const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");
const cursosRoutes = require("./routes/cursos");
const inscripcionesRoutes = require("./routes/inscripciones");
const coursesRoutes = require("./routes/courses");
const progresoRoutes = require("./routes/progreso");

app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/cursos", cursosRoutes);
app.use("/api/inscripciones", inscripcionesRoutes);
app.use("/api/courses", coursesRoutes);
app.use("/api/progreso", progresoRoutes);


app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

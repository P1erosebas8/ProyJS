const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/auth");
const coursesRoutes = require("./routes/courses");

app.use("/api/auth", authRoutes);
app.use("/api/courses", coursesRoutes);

app.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});

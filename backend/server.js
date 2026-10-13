const express = require("express");
const cors = require("cors");

const app = express();


// ========================================
// CONFIGURACIONES
// ========================================

app.use(cors());
app.use(express.json());


// ========================================
// RUTA DE RESERVAS
// ========================================

const reservasRoutes = require("./reservas");

app.use("/reservas", reservasRoutes);


// ========================================
// RUTA PRINCIPAL
// ========================================

app.get("/", (req, res) => {
    res.json({
        mensaje: "Servidor funcionando correctamente"
    });
});


// ========================================
// INICIAR SERVIDOR
// ========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
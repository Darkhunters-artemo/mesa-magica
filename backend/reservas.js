const express = require("express");
const router = express.Router();


// ========================================
// CREAR RESERVA
// ========================================

router.post("/", (req, res) => {

    const {
        mesa,
        nombre,
        telefono,
        fecha,
        hora,
        personas,
        observaciones
    } = req.body;


    // Verificar datos obligatorios
    if (
        !mesa ||
        !nombre ||
        !telefono ||
        !fecha ||
        !hora ||
        !personas
    ) {
        return res.status(400).json({
            mensaje: "Faltan datos para realizar la reserva."
        });
    }


    console.log("Nueva reserva:");

    console.log({
        mesa,
        nombre,
        telefono,
        fecha,
        hora,
        personas,
        observaciones
    });


    res.status(201).json({
        mensaje: "Reserva creada correctamente.",
        reserva: {
            mesa,
            nombre,
            telefono,
            fecha,
            hora,
            personas,
            observaciones
        }
    });

});


module.exports = router;

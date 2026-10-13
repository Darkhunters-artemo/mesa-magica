let selectedTable = null;

// MODAL DE RESERVA
const modalElement = document.getElementById("reservationModal");
const reservationModal = new bootstrap.Modal(modalElement);

// MESAS
const tables = document.querySelectorAll(".restaurant-table");


// ==============================
// SELECCIONAR MESA
// ==============================

tables.forEach((table) => {

    table.addEventListener("click", () => {

        // Si la mesa está ocupada
        if (table.classList.contains("occupied")) {
            alert("Esta mesa está ocupada.");
            return;
        }

        // Quitar selección anterior
        tables.forEach((t) => {
            t.classList.remove("selected");
        });

        // Seleccionar nueva mesa
        table.classList.add("selected");

        selectedTable = table.dataset.table;

        // Mostrar información de la mesa seleccionada
        document.getElementById("selectedMessage").textContent =
            `Mesa ${selectedTable} seleccionada`;

        // Mostrar número de mesa en el modal
        document.getElementById("modalTable").textContent =
            `#${selectedTable}`;

        // Abrir modal
        reservationModal.show();
    });

});


// ==============================
// FORMULARIO DE RESERVA
// ==============================

const form = document.getElementById("reservationForm");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    // Verificar que haya una mesa seleccionada
    if (!selectedTable) {
        alert("Selecciona una mesa.");
        return;
    }

    // Obtener datos del formulario
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;
    const personas = document.getElementById("personas").value;
    const observaciones =
        document.getElementById("observaciones").value;

    // Mostrar datos en consola
    console.log({
        mesa: selectedTable,
        nombre: nombre,
        telefono: telefono,
        fecha: fecha,
        hora: hora,
        personas: personas,
        observaciones: observaciones
    });

    // Mensaje de confirmación
    alert(
        `¡Reserva realizada!

Mesa: ${selectedTable}
Cliente: ${nombre}
Teléfono: ${telefono}
Fecha: ${fecha}
Hora: ${hora}
Personas: ${personas}`
    );

    // Cambiar la mesa a ocupada
    const table = document.querySelector(
        `[data-table="${selectedTable}"]`
    );

    if (table) {
        table.classList.remove("available");
        table.classList.remove("selected");
        table.classList.add("occupied");
    }

    // Cerrar modal
    reservationModal.hide();

    // Limpiar formulario
    form.reset();

    // Quitar mesa seleccionada
    selectedTable = null;

    // Actualizar mensaje
    document.getElementById("selectedMessage").textContent =
        "Ninguna mesa seleccionada";

});
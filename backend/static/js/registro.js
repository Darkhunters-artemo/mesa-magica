const registroForm = document.getElementById("registerForm");

registroForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const nombre =
        document.getElementById("nombre").value;

    const apellido =
        document.getElementById("apellido").value;

    const correo =
        document.getElementById("correo").value;

    const telefono =
        document.getElementById("telefono").value;

    const password =
        document.getElementById("password").value;


    try {

        const respuesta =
            await fetch("/registro", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    nombre,
                    apellido,
                    correo,
                    telefono,
                    password

                })

            });


        const resultado =
            await respuesta.json();


        alert(resultado.mensaje);


        if (resultado.success) {

            window.location.href =
                "/login";

        }


    } catch (error) {

        console.error(error);

        alert(
            "Error al conectar con el servidor."
        );

    }

});

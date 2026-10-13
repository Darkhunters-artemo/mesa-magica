const passwordInput = document.getElementById("password");

const showPassword = document.getElementById("showPassword");

showPassword.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";

        showPassword.innerHTML =
            '<i class="fa-regular fa-eye-slash"></i>';

    } else {

        passwordInput.type = "password";

        showPassword.innerHTML =
            '<i class="fa-regular fa-eye"></i>';

    }

});


const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const correo = document.getElementById("correo").value;

    const password = document.getElementById("password").value;


    try {

        const respuesta = await fetch("/login", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                correo: correo,
                password: password
            })

        });


        const resultado = await respuesta.json();


        alert(resultado.mensaje);


        if (resultado.success) {

            window.location.href = "/reservas.html";

        }


    } catch (error) {

        console.error(error);

        alert("Error al conectar con el servidor.");

    }

});

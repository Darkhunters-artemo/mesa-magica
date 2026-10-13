<?php

header("Content-Type: application/json");

include "conexion.php";

$datos = json_decode(
    file_get_contents("php://input"),
    true
);

$correo = $datos["correo"];

$password = $datos["password"];


$sql = "SELECT * FROM usuarios WHERE correo = ?";

$stmt = $conexion->prepare($sql);

$stmt->bind_param(
    "s",
    $correo
);

$stmt->execute();

$resultado = $stmt->get_result();


if ($resultado->num_rows > 0) {

    $usuario = $resultado->fetch_assoc();


    if (password_verify($password, $usuario["password"])) {

        echo json_encode([
            "success" => true,
            "mensaje" => "Inicio de sesión correcto"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "mensaje" => "Contraseña incorrecta"
        ]);

    }

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => "El usuario no existe"
    ]);

}


$stmt->close();

$conexion->close();

?>
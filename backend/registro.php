<?php

header("Content-Type: application/json");

include "conexion.php";


$datos = json_decode(
    file_get_contents("php://input"),
    true
);


$nombre = $datos["nombre"];
$apellido = $datos["apellido"];
$correo = $datos["correo"];
$telefono = $datos["telefono"];
$password = $datos["password"];


$passwordHash = password_hash(
    $password,
    PASSWORD_DEFAULT
);


$sql = "INSERT INTO usuarios
(
    nombre,
    apellido,
    correo,
    telefono,
    password
)
VALUES
(
    ?,
    ?,
    ?,
    ?,
    ?
)";


$stmt = $conexion->prepare($sql);


$stmt->bind_param(
    "sssss",
    $nombre,
    $apellido,
    $correo,
    $telefono,
    $passwordHash
);


if ($stmt->execute()) {

    echo json_encode([
        "success" => true,
        "mensaje" => "Usuario registrado correctamente"
    ]);

} else {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error al registrar usuario"
    ]);

}


$stmt->close();

$conexion->close();

?>
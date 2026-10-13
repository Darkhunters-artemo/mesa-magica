<?php
$host = "127.0.0.1";
$usuario = "root";
$contrasena = "";
$base_datos = "restaurante_reservas"; // cambia esto por el nombre real de tu base

$conexion = new mysqli($host, $usuario, $contrasena, $base_datos);

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
?>
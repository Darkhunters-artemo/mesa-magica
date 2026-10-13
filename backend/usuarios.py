from sqlalchemy import text
from conexion import engine

def registrar_usuario(nombre, correo, contrasena, rol="administrador"):
    with engine.connect() as conexion:
        query = text("""
            INSERT INTO usuarios (nombre, correo, contrasena, rol) 
            VALUES (:nombre, :correo, :contrasena, :rol)
        """)
        conexion.execute(query, {
            "nombre": nombre,
            "correo": correo,
            "contrasena": contrasena,
            "rol": rol
        })
        conexion.commit()
        print("Usuario registrado exitosamente")
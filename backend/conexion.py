from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from database import engine


def registrar_usuario(nombre, apellido, correo, telefono, password, rol="cliente"):
    with engine.connect() as conexion:
        query = text("""
            INSERT INTO usuarios (nombre, apellido, correo, telefono, password, rol)
            VALUES (:nombre, :apellido, :correo, :telefono, :password, :rol)
        """)
        try:
            conexion.execute(query, {
                "nombre": nombre,
                "apellido": apellido,
                "correo": correo,
                "telefono": telefono,
                "password": password,
                "rol": rol
            })
            conexion.commit()
            return True, "Usuario registrado exitosamente"
        except IntegrityError:
            return False, "Ese correo ya está registrado"


def buscar_usuario_por_correo(correo):
    with engine.connect() as conexion:
        query = text("SELECT * FROM usuarios WHERE correo = :correo")
        resultado = conexion.execute(query, {"correo": correo}).mappings().first()
        return resultado

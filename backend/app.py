from flask import Flask, request, jsonify, render_template
from database import engine
from conexion import registrar_usuario, buscar_usuario_por_correo

app = Flask(__name__)

try:
    with engine.connect():
        print(f"Conectado a MySQL: {engine.url}")
except Exception as e:
    print(f"No se pudo conectar a MySQL: {e}")


# ---------- PÁGINAS ----------

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/login")
def login_page():
    return render_template("login.html")


@app.route("/registro-page")
def registro_page():
    return render_template("registro.html")


@app.route("/reservas.html")
def reservas_page():
    return render_template("reservas.html")


# ---------- API ----------

@app.route("/registro", methods=["POST"])
def registro():
    datos = request.get_json()
    if not datos:
        return jsonify({"success": False, "mensaje": "No se recibieron datos"}), 400

    nombre = datos.get("nombre")
    apellido = datos.get("apellido")
    correo = datos.get("correo")
    telefono = datos.get("telefono")
    password = datos.get("password")

    if not all([nombre, apellido, correo, password]):
        return jsonify({"success": False, "mensaje": "Faltan campos obligatorios"}), 400

    exito, mensaje = registrar_usuario(nombre, apellido, correo, telefono, password)
    return jsonify({"success": exito, "mensaje": mensaje})


@app.route("/login", methods=["POST"])
def login():
    datos = request.get_json()
    if not datos:
        return jsonify({"success": False, "mensaje": "No se recibieron datos"}), 400

    correo = datos.get("correo")
    password = datos.get("password")

    usuario = buscar_usuario_por_correo(correo)

    if usuario and usuario["password"] == password:
        return jsonify({"success": True, "mensaje": "Inicio de sesión exitoso"})
    else:
        return jsonify({"success": False, "mensaje": "Correo o contraseña incorrectos"})


if __name__ == "__main__":
    app.run(debug=True)

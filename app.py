from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

# Conexión con MySQL
app.config["MYSQL_HOST"] = "localhost"
app.config["MYSQL_USER"] = "root"
app.config["MYSQL_PASSWORD"] = ""
app.config["MYSQL_DB"] = "mesa_magica"
app.config["MYSQL_PORT"] = 3306

mysql = MySQL(app)

@app.route("/")
def inicio():
    try:
        cur = mysql.connection.cursor()
        cur.execute("SELECT 1")
        cur.close()
        return "Mesa Mágica - Conectado correctamente a MySQL"
    except Exception as e:
        return f"Error de conexión: {e}"

if __name__ == "__main__":
    app.run(debug=True)
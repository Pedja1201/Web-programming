import flask
from flask import Flask

from utils.db import mysql

from blueprints.igrice import igrica_blueprint
from blueprints.konzole import konzola_blueprint
from blueprints.korpa import korpa_blueprint
from blueprints.login import login_blueprint
from blueprints.logout_blueprint import logout_blueprint

from blueprints.korisnici import korisnik_blueprint


app = Flask(__name__, static_url_path="")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "video_game"
app.config["SECRET_KEY"] = "ta WJoir29$"

app.register_blueprint(igrica_blueprint, url_prefix="/api/igrice")
app.register_blueprint(konzola_blueprint, url_prefix="/api/konzole")
app.register_blueprint(korpa_blueprint, url_prefix="/api/korpe")

app.register_blueprint(login_blueprint, url_prefix="/api/login")
app.register_blueprint(logout_blueprint, url_prefix="/api/logout")
app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

mysql.init_app(app)

5

@app.route("/")
def home():
    return app.send_static_file("index.html")




if __name__ == "__main__":
    app.run()
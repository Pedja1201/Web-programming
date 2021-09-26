import flask
from flask import Flask
from flask import session


from utils.db import mysql

from blueprints.login_blueprint import login_blueprint
from blueprints.logout_blueprint import logout_blueprint

from blueprints.korisnik_blueprint import korisnik_blueprint

from blueprints.turisti_blueprint import turista_blueprint
from blueprints.aranzman_blueprint import aranzman_blueprint
from blueprints.smestaj_blueprint import smestaj_blueprint
from blueprints.prodaja_blueprint import prodaja_blueprint


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "turisticka_agencija"
app.secret_key = "PR.12.rp.dr/Pr"



app.register_blueprint(login_blueprint, url_prefix="/api/login")
app.register_blueprint(logout_blueprint, url_prefix="/api/logout")
app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

app.register_blueprint(turista_blueprint, url_prefix="/api/turisti")
app.register_blueprint(aranzman_blueprint, url_prefix="/api/aranzmani")
app.register_blueprint(smestaj_blueprint, url_prefix="/api/smestaji")
app.register_blueprint(prodaja_blueprint, url_prefix="/api/prodaje")


mysql.init_app(app)


@app.route("/")
def home():
    return app.send_static_file("index.html")




if __name__ == "__main__":
    app.run()
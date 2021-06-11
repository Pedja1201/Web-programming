import flask
from flask import Flask
from flask import session

from utils.db import mysql

from blueprints.login_blueprint import login_blueprint
from blueprints.login_blueprint import loginBibliotekar_blueprint
from blueprints.logout_blueprint import logout_blueprint
from blueprints.logout_blueprint import logoutBibliotekar_blueprint

from blueprints.bibliotekar_blueprint import bibliotekar_blueprint
from blueprints.korisnik_blueprint import korisnik_blueprint
from blueprints.kupac_blueprint import kupac_blueprint
from blueprints.knjiga_blueprint import knjiga_blueprint
from blueprints.biblioteka_blueprint import biblioteka_blueprint
from blueprints.porudzbina_blueprint import porudzbina_blueprint
from blueprints.iznajmljivanje_blueprint import iznajmljivanje_blueprint

app = Flask(__name__, static_url_path="/")

###TODO: Uradi search filtriranje

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "prodaja_knjiga"
app.secret_key = "PR.12.rp.sr/mr"

app.register_blueprint(login_blueprint, url_prefix="/api/login")
app.register_blueprint(loginBibliotekar_blueprint, url_prefix="/api/loginBibliotekar")
app.register_blueprint(logout_blueprint, url_prefix="/api/logout")
app.register_blueprint(logoutBibliotekar_blueprint, url_prefix="/api/logoutBibliotekar")

app.register_blueprint(bibliotekar_blueprint, url_prefix="/api/bibliotekari")
app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")
app.register_blueprint(kupac_blueprint, url_prefix="/api/kupci")
app.register_blueprint(knjiga_blueprint, url_prefix="/api/knjige")
app.register_blueprint(biblioteka_blueprint, url_prefix="/api/biblioteke")
app.register_blueprint(porudzbina_blueprint, url_prefix="/api/porudzbine")
app.register_blueprint(iznajmljivanje_blueprint, url_prefix="/api/iznajmljivanje")


mysql.init_app(app)


####Pocetna strana
@app.route("/")
def home():
    return app.send_static_file("index.html")



if __name__ == "__main__":
    app.run()
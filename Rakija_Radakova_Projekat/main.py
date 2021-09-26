import flask
from flask import Flask
from flask import session


from utils.db import mysql

from blueprints.login_blueprint import login_blueprint
from blueprints.logout_blueprint import logout_blueprint

from blueprints.korisnik_blueprint import korisnik_blueprint

from blueprints.kupci_blueprint import kupci_blueprint
from blueprints.rakija_blueprint import rakija_blueprint
from blueprints.porudzbina_blueprint import porudzbina_blueprint


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "prodaja_rakije"
app.secret_key = "R.a.d.a.k.o.v.a.1.0"



app.register_blueprint(login_blueprint, url_prefix="/api/login")
app.register_blueprint(logout_blueprint, url_prefix="/api/logout")
app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

app.register_blueprint(kupci_blueprint, url_prefix="/api/kupci")
app.register_blueprint(rakija_blueprint, url_prefix="/api/rakije")
app.register_blueprint(porudzbina_blueprint, url_prefix="/api/porudzbine")


mysql.init_app(app)


@app.route("/")
def home():
    return app.send_static_file("index.html")




if __name__ == "__main__":
    app.run()
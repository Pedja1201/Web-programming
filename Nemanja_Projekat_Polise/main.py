import flask
from flask import Flask
from flask import session


from utils.db import mysql

from blueprints.login_blueprint import login_blueprint
from blueprints.logout_blueprint import logout_blueprint

from blueprints.korisnik_blueprint import korisnik_blueprint

from blueprints.automobil_blueprint import automobil_blueprint
from blueprints.osiguravajuca_kuca_blueprint import osiguravajuca_kuca_blueprint
from blueprints.polisa_blueprint import polisa_blueprint


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "polisa_osiguranja"
app.secret_key = "Nem.Il.20"



app.register_blueprint(login_blueprint, url_prefix="/api/login")
app.register_blueprint(logout_blueprint, url_prefix="/api/logout")
app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

app.register_blueprint(automobil_blueprint, url_prefix="/api/automobili")
app.register_blueprint(osiguravajuca_kuca_blueprint, url_prefix="/api/osiguravajuceKuce")
app.register_blueprint(polisa_blueprint, url_prefix="/api/polise")



mysql.init_app(app)


@app.route("/")
def home():
    return app.send_static_file("index.html")




if __name__ == "__main__":
    app.run()
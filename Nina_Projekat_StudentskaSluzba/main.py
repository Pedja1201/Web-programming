import flask
from flask import Flask
from flask import session

from utils.db import mysql

from blueprints.login_blueprint import login_blueprint
from blueprints.logout_blueprint import logout_blueprint

from blueprints.korisnik_blueprint import korisnik_blueprint

from blueprints.student_blueprint import student_blueprint
from blueprints.predmet_blueprint import predmet_blueprint
from blueprints.polaganje_blueprint import polaganje_blueprint
from blueprints.profesor_blueprint import profesor_blueprint



app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "studentska_sluzba"
app.secret_key = "NI.p.19A.stDrr"

app.register_blueprint(login_blueprint, url_prefix="/api/login")
app.register_blueprint(logout_blueprint, url_prefix="/api/logout")
app.register_blueprint(korisnik_blueprint, url_prefix="/api/korisnici")

app.register_blueprint(student_blueprint, url_prefix="/api/studenti")
app.register_blueprint(predmet_blueprint, url_prefix="/api/predmeti")
app.register_blueprint(polaganje_blueprint, url_prefix="/api/polaganja")
app.register_blueprint(profesor_blueprint, url_prefix="/api/profesori")




mysql.init_app(app)

@app.route("/")
def home():
    return app.send_static_file("index.html")






if __name__ == "__main__":
    app.run()
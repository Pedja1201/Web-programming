import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

#TODO: Probaj dodatne zadatke (Validacija, select..., prikaz pojedinca)


app = Flask(__name__, static_url_path="")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "skola"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM  nastavnik")
    return flask.render_template("nastavnik.tpl.html", nastavnik=cursor.fetchall())


@app.route("/dodajNastavnika", methods=["POST"])
def dodajNastavnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO nastavnik(licni_id, ime, prezime, email, br_telefona) VALUES(%(licni_id)s, %(ime)s, %(prezime)s, %(email)s, %(br_telefona)s)", flask.request.form)
    db.commit()
    return flask.redirect("/")

@app.route("/ukloniNastavnika", methods=["GET"])
def ukloniNastavnika():
    licni_id = flask.request.args["licni_id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM nastavnik WHERE licni_id=%s", (licni_id, ))
    db.commit()
    return flask.redirect("/")

@app.route("/izmenaNastavnika", methods=["GET"])
def izmenaNastavnikaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nastavnik WHERE licni_id=%s",(flask.request.args["licni_id"], ))
    return flask.render_template("izmenaNastavnik.tpl.html", nastavnik=cursor.fetchone())

@app.route("/izmenaNastavnika", methods=["POST"])
def izmenaNastavnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE nastavnik SET licni_id=%(licni_id)s, ime=%(ime)s, prezime=%(prezime)s, email=%(email)s, br_telefona=%(br_telefona)s WHERE licni_id=%(licni_id)s", flask.request.form)
    db.commit()
    return flask.redirect("/")


#Predmet
@app.route("/predmet")
def predmet():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM  predmet")
    return flask.render_template("predmet.tpl.html", predmet=cursor.fetchall())


@app.route("/dodajPredmet", methods=["POST"])
def dodajPredmet():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO predmet(id, ime_predmeta, razred) VALUES(%(id)s, %(ime_predmeta)s, %(razred)s)", flask.request.form)
    db.commit()
    return flask.redirect("/predmet")

@app.route("/ukloniPredmet", methods=["GET"])
def ukloniPredmet():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM predmet WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/predmet")

@app.route("/izmeniPredmet", methods=["GET"])
def izmeniPredmetForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet WHERE id=%s",(flask.request.args["id"], ))
    return flask.render_template("izmenaPredmeta.tpl.html", predmet=cursor.fetchone())

@app.route("/izmeniPredmet", methods=["POST"])
def izmeniPredmet():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE predmet SET id=%(id)s, ime_predmeta=%(ime_predmeta)s, razred=%(razred)s WHERE id=%(id)s", flask.request.form)
    db.commit(

    )
    return flask.redirect("/predmet")



#Skola
@app.route("/skola")
def skola():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM  skola")
    return flask.render_template("skola.tpl.html", skola=cursor.fetchall())


@app.route("/dodajSkolu", methods=["POST"])
def dodajSkolu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO skola(id, ime_skole, adresa, nastavnik_licni_id, predmet_id) VALUES(%(id)s, %(ime_skole)s, %(adresa)s, %(nastavnik_licni_id)s, %(predmet_id)s)", flask.request.form)
    db.commit()
    return flask.redirect("/skola")

#Dodavanje tabele skola sa selektovanim nastavnikom i predmetom!!!
@app.route("/skolaDodavanje", methods=["GET"])
def skolaDodavanje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nastavnik")
    nastavnik = cursor.fetchall()
    cursor.execute("SELECT * FROM predmet")
    predmet = cursor.fetchall()
    return flask.render_template("skolaDodavanje.tpl.html", nastavnik=nastavnik, predmet=predmet)


@app.route("/ukloniSkolu", methods=["GET"])
def ukloniSkolu():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM skola WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/skola")

@app.route("/izmenaSkole", methods=["GET"])
def izmeniSkoluForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM skola WHERE id=%s",(flask.request.args["id"], ))
    return flask.render_template("izmenaSkole.tpl.html", skola=cursor.fetchone())

@app.route("/izmenaSkole", methods=["POST"])
def izmeniSkolu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE skola SET id=%(id)s, ime_skole=%(ime_skole)s, adresa=%(adresa)s, nastavnik_licni_id=%(nastavnik_licni_id)s, predmet_id=%(predmet_id)s WHERE id=%(id)s", flask.request.form)
    db.commit()
    return flask.redirect("/skola")




if __name__ == "__main__":
    app.run()
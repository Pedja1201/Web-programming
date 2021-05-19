#Moja baza za dodavanje korisnika

import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

app = Flask(__name__, static_url_path="")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "moja_baza"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)


#Korisnik
@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/api/korisnici")
def getAllKorisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.jsonify(korisnik)


@app.route("/api/korisnici/<string:korisnik_oznaka>")
def getRadnik(korisnik_oznaka):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE oznaka=%s", (korisnik_oznaka, ))
    korisnik = cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)

    return "", 404


@app.route("/api/korisnici", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(oznaka, ime, prezime, br_telefona) VALUES (%(oznaka)s, %(ime)s, %(prezime)s, %(br_telefona)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201



@app.route("/api/korisnici/<string:korisnik_oznaka>", methods=["DELETE"])
def ukloniKorisnika(korisnik_oznaka):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE oznaka=%s", (korisnik_oznaka, ))
    db.commit()
    return ""


@app.route("/api/korisnici/<string:korisnik_oznaka>", methods=["PUT"])
def izmenaKorisnika(korisnik_oznaka):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_oznaka"] = korisnik_oznaka
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET oznaka=%(oznaka)s, ime=%(ime)s, prezime=%(prezime)s, br_telefona=%(br_telefona)s WHERE oznaka=%(korisnik_oznaka)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE oznaka=%s", (korisnik_oznaka, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)


##Prijava
@app.route("/api/prijave")
def getAllPrijave():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM prijava")
    prijava = cursor.fetchall()
    return flask.jsonify(prijava)


@app.route("/api/prijave/<int:prijava_id>")
def getPrijava(prijava_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM prijava WHERE id=%s", (prijava_id, ))
    prijava = cursor.fetchone()
    if prijava is not None:
        return flask.jsonify(prijava)

    return "", 404



@app.route("/api/prijave", methods=["POST"])
def dodajPrijavu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO prijava(korisnik_oznaka) VALUES (%(korisnik_oznaka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201



@app.route("/api/prijave/<int:prijava_id>", methods=["DELETE"])
def ukloniPrijavu(prijava_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM prijava WHERE id=%s", (prijava_id, ))
    db.commit()
    return ""


@app.route("/api/prijave/<int:prijava_id>", methods=["PUT"])
def izmenaPrijave(prijava_id):
    prijava = dict(flask.request.json)
    prijava["prijava_id"] = prijava_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE prijava SET korisnik_oznaka=%(korisnik_oznaka)s WHERE id=%(prijava_id)s", prijava)
    db.commit()
    cursor.execute("SELECT * FROM prijava WHERE id=%s", (prijava_id, ))
    prijava = cursor.fetchone()
    return flask.jsonify(prijava)



if __name__ == "__main__":
        app.run()
    
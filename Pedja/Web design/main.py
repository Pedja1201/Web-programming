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
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    return flask.render_template("index.tpl.html", korisnici=cursor.fetchall())

@app.route("/dodajKorisnika", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db() 
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(oznaka, ime, prezime, br_telefona) VALUES(%(oznaka)s, %(ime)s, %(prezime)s, %(br_telefona)s)", flask.request.form)
    db.commit()
    return flask.redirect("/")

@app.route("/ukloniKorisnika", methods=["GET"])
def ukloniKorisnika():
    oznaka = flask.request.args["oznaka"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE oznaka=%s", (oznaka, ))
    db.commit()
    return flask.redirect("/")

@app.route("/izmenaKorisnika", methods=["GET"])
def izmenaKorisnikaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE oznaka=%s", (flask.request.args["oznaka"], ))
    return flask.render_template("izmeniKorisnika.tpl.html", korisnici=cursor.fetchone())



@app.route("/izmenaKorisnika", methods=["POST"])
def izmenaStudenta():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET oznaka=%(oznaka)s, ime=%(ime)s, prezime=%(prezime)s, br_telefona=%(br_telefona)s WHERE oznaka=%(oznaka)s", flask.request.form)
    db.commit()
    return flask.redirect("/")


##Prijava
@app.route("/prijava")
def prijava():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM prijava")
    return flask.render_template("indexPrijava.tpl.html", prijava=cursor.fetchall())

@app.route("/dodajPrijavu", methods=["POST"])
def dodajPrijavu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO prijava(id, korisnik_oznaka) VALUES(%(id)s, %(korisnik_oznaka)s)", flask.request.form)
    db.commit()
    return flask.redirect("/prijava")

###NOVOO####Spajanje tabela selectom
@app.route("/dodavanjePrijave")
def dodavanjePrijave():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.render_template("dodavanjePrijave.tpl.html", korisnik=korisnik)

###Proba selectIzmene za prijavu
# @app.route("/menjanjePrijave")
# def menjanjePrijave():
#     cursor = mysql.get_db().cursor()
#     cursor.execute("SELECT * FROM korisnik")
#     korisnik = cursor.fetchall()
#     return flask.render_template("izmeniSelectPrijavu.tpl.html", korisnik=korisnik)


@app.route("/ukloniPrijavu", methods=["GET"])
def ukloniPrijavu():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM prijava WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/prijava")

@app.route("/izmenaPrijave", methods=["GET"])
def izmenaPrijaveForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM prijava WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("izmenaPrijave.tpl.html", prijava=cursor.fetchone())

@app.route("/izmenaPrijave", methods=["POST"])
def izmenaPrijave():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE prijava SET id=%(id)s, korisnik_oznaka=%(korisnik_oznaka)s WHERE id=%(id)s", flask.request.form)
    db.commit()
    return flask.redirect("/prijava")


if __name__ == "__main__":
        app.run()
    
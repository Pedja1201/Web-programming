##TODO: Odvoji ovde CRUD operacije i uvezi u 'main.py'
import json
from flask import request

connection = None

def init(app, _connection):
    global connection
    connection = _connection
    app.add_url_rule("/api/korisnici", view_fun=dodajKorisnika , methods=["POST"])
    app.add_url_rule("/api/korisnici", view_fun=getAllKorisnici , methods=["GET"])
    app.add_url_rule("/api/korisnici/<int:korisnik_IDKorisnik>", view_fun=izmeniKorisnika , methods=["PUT"])
    app.add_url_rule("/api/korisnici/<int:korisnik_IDKorisnik>", view_fun=ukloniKorisnika , methods=["DELETE"])

def getAllKorisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.jsonify(korisnik)

# ########Prikaz liste###########
def getKorisnik(korisnik_IDKorisnik):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik,))
    korisnik=cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)

    return "", 404

#################################


def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(ime, email, lozinka) VALUES (%(ime)s, %(email)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201




def ukloniKorisnika(korisnik_IDKorisnik):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik, ))
    db.commit()
    return ""


def izmeniKorisnika(korisnik_IDKorisnik):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_IDKorisnik"] = korisnik_IDKorisnik
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET ime=%(ime)s, email=%(email)s, lozinka=%(lozinka)s WHERE IDKorisnik=%(IDKorisnik)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)
 
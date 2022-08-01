import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


korisnik_blueprint=Blueprint("korisnik_blueprint", __name__)


#KORISNIK
@korisnik_blueprint.route("")
def getAllKorisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.jsonify(korisnik)

########Prikaz liste###########
@korisnik_blueprint.route("<int:korisnik_id>")
def getKorisnik(korisnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
    korisnik=cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)
    return "", 404
#################################

@korisnik_blueprint.route("", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(email, lozinka) VALUES (%(email)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@korisnik_blueprint.route("<int:korisnik_id>", methods=["DELETE"])
def ukloniKorisnika(korisnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE id=%s", (korisnik_id, ))
    db.commit()
    return ""

@korisnik_blueprint.route("<int:korisnik_id>", methods=["PUT"])
def izmeniKorisnika(korisnik_id):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_id"] = korisnik_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET email=%(email)s, lozinka=%(lozinka)s WHERE id=%(korisnik_id)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)

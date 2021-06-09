import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


kupac_blueprint=Blueprint("kupac_blueprint", __name__)


####Kupac
@kupac_blueprint.route("")
def getAllKupci():
    if session.get("korisnik") is not None:  #Login za prikaz kupaca (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()       ##Ovako sa if session mozes sve entitete
        cursor.execute("SELECT * FROM kupac")
        kupac = cursor.fetchall()
        return flask.jsonify(kupac)
    return "", 401   #Login return od ifa

########Prikaz liste###########
@kupac_blueprint.route("<int:kupac_IDKupac>")
def getKupac(kupac_IDKupac):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac WHERE IDKupac=%s", (kupac_IDKupac,))
    kupac=cursor.fetchone()
    if kupac is not None:
        return flask.jsonify(kupac)
    return "", 404
#################################

@kupac_blueprint.route("", methods=["POST"])
def dodajKupca():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupac(ime, prezime, datumRodjenja, email, telefon, mesto, adresa) VALUES (%(ime)s, %(prezime)s, %(datumRodjenja)s, %(email)s, %(telefon)s, %(mesto)s, %(adresa)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@kupac_blueprint.route("<int:kupac_IDKupac>", methods=["DELETE"])
def ukloniKupca(kupac_IDKupac):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM kupac WHERE IDKupac=%s", (kupac_IDKupac, ))
    db.commit()
    return ""

@kupac_blueprint.route("<int:kupac_IDKupac>", methods=["PUT"])
def izmeniKupca(kupac_IDKupac):
    kupac = dict(flask.request.json)
    kupac["kupac_IDKupac"] = kupac_IDKupac
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE kupac SET ime=%(ime)s, prezime=%(prezime)s, datumRodjenja=%(datumRodjenja)s, email=%(email)s, telefon=%(telefon)s, mesto=%(mesto)s, adresa=%(adresa)s WHERE IDKupac=%(kupac_IDKupac)s", kupac)
    db.commit()
    cursor.execute("SELECT * FROM kupac WHERE IDKupac=%s", (kupac_IDKupac, ))
    kupac = cursor.fetchone()
    return flask.jsonify(kupac)


import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


kupci_blueprint=Blueprint("kupci_blueprint", __name__)


#Turisti
@kupci_blueprint.route("")
def getAllKupac():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac")
    kupac = cursor.fetchall()
    return flask.jsonify(kupac)
    
########
@kupci_blueprint.route("<int:kupac_id>")
def getKupac(kupac_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac WHERE id=%s", (kupac_id,))
    kupac = cursor.fetchone()
    if kupac is not None:
        return flask.jsonify(kupac)

    return "", 404
# #################################


@kupci_blueprint.route("", methods=["POST"])
def dodajKupca():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupac(ime, prezime, adresa,telefon, korisnik_id) VALUES (%(ime)s, %(prezime)s, %(adresa)s,%(telefon)s, %(korisnik_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@kupci_blueprint.route("<int:kupac_id>", methods=["DELETE"])
def ukloniKupca(kupac_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM kupac WHERE id=%s", (kupac_id, ))
    db.commit()
    return ""

@kupci_blueprint.route("<int:kupac_id>", methods=["PUT"])
def izmeniKupca(kupac_id):
    kupac = dict(flask.request.json)
    kupac["kupac_id"] = kupac_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE kupac SET ime=%(ime)s, prezime=%(prezime)s, adresa=%(adresa)s,telefon=%(telefon)s, korisnik_id=%(korisnik_id)s WHERE id=%(kupac_id)s", kupac)
    db.commit()
    cursor.execute("SELECT * FROM kupac WHERE id=%s", (kupac_id, ))
    kupac = cursor.fetchone()
    return flask.jsonify(kupac)

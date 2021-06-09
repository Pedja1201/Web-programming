import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


iznajmljivanje_blueprint=Blueprint("iznajmljivanje_blueprint", __name__)


##Iznajmljivanje
@iznajmljivanje_blueprint.route("")
def getAllIznajmljivanje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM iznajmljivanje")
    iznajmiti = cursor.fetchall()
    return flask.jsonify(iznajmiti)

########Prikaz liste###########
@iznajmljivanje_blueprint.route("<int:iznajmljivanje_IDIznajmljivanje>")
def getIznajmljivanje(iznajmljivanje_IDIznajmljivanje):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM iznajmljivanje WHERE IDIznajmljivanje=%s", (iznajmljivanje_IDIznajmljivanje,))
    iznajmiti=cursor.fetchone()
    if iznajmiti is not None:
        return flask.jsonify(iznajmiti)
    return "", 404
#################################

@iznajmljivanje_blueprint.route("", methods=["POST"])
def dodajIznajmljivanje():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO iznajmljivanje(IDKupac, IDKnjiga, kolicina, nacinPlacanja, valuta, periodIznajmljivanja, datumPorudzbine) VALUES (%(IDKupac)s, %(IDKnjiga)s, %(kolicina)s, %(nacinPlacanja)s, %(valuta)s, %(periodIznajmljivanja)s, %(datumPorudzbine)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@iznajmljivanje_blueprint.route("<int:iznajmljivanje_IDIznajmljivanje>", methods=["DELETE"])
def ukloniIznajmljivanje(iznajmljivanje_IDIznajmljivanje):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM iznajmljivanje WHERE IDIznajmljivanje=%s", (iznajmljivanje_IDIznajmljivanje, ))
    db.commit()
    return ""

@iznajmljivanje_blueprint.route("<int:iznajmljivanje_IDIznajmljivanje>", methods=["PUT"])
def izmeniIznajmljivanje(iznajmljivanje_IDIznajmljivanje):
    iznajmiti = dict(flask.request.json)
    iznajmiti["iznajmljivanje_IDIznajmljivanje"] = iznajmljivanje_IDIznajmljivanje
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE iznajmljivanje SET IDKupac=%(IDKupac)s, IDKnjiga=%(IDKnjiga)s, kolicina=%(kolicina)s, nacinPlacanja=%(nacinPlacanja)s, valuta=%(valuta)s, periodIznajmljivanja=%(periodIznajmljivanja)s, datumPorudzbine=%(datumPorudzbine)s WHERE IDIznajmljivanje=%(iznajmljivanje_IDIznajmljivanje)s", iznajmiti)
    db.commit()
    cursor.execute("SELECT * FROM porudzbina WHERE IDPorudzbina=%s", (iznajmljivanje_IDIznajmljivanje, ))
    iznajmiti = cursor.fetchone()
    return flask.jsonify(iznajmiti)

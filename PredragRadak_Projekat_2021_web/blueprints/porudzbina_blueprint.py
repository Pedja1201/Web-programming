import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


porudzbina_blueprint=Blueprint("porudzbina_blueprint", __name__)


####Porudzbina
@porudzbina_blueprint.route("")
def getAllPorudzbine():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM porudzbina")
    poruceno = cursor.fetchall()
    return flask.jsonify(poruceno)

########Prikaz liste###########
@porudzbina_blueprint.route("<int:porudzbina_IDPorudzbina>")
def getPorudzbina(porudzbina_IDPorudzbina):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM porudzbina WHERE IDPorudzbina=%s", (porudzbina_IDPorudzbina,))
    poruceno=cursor.fetchone()
    if poruceno is not None:
        return flask.jsonify(poruceno)
    return "", 404
#################################

@porudzbina_blueprint.route("", methods=["POST"])
def dodajPorudzbinu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO porudzbina(IDKnjiga, IDKupac, kolicina, nacinPlacanja, valuta, datumPorudzbine) VALUES (%(IDKnjiga)s, %(IDKupac)s, %(kolicina)s, %(nacinPlacanja)s, %(valuta)s, %(datumPorudzbine)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@porudzbina_blueprint.route("<int:porudzbina_IDPorudzbina>", methods=["DELETE"])
def ukloniPorudzbinu(porudzbina_IDPorudzbina):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM porudzbina WHERE IDPorudzbina=%s", (porudzbina_IDPorudzbina, ))
    db.commit()
    return ""

@porudzbina_blueprint.route("<int:porudzbina_IDPorudzbina>", methods=["PUT"])
def izmeniPorudzbinu(porudzbina_IDPorudzbina):
    poruceno = dict(flask.request.json)
    poruceno["porudzbina_IDPorudzbina"] = porudzbina_IDPorudzbina
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE porudzbina SET IDKnjiga=%(IDKnjiga)s, IDKupac=%(IDKupac)s, kolicina=%(kolicina)s, nacinPlacanja=%(nacinPlacanja)s, valuta=%(valuta)s, datumPorudzbine=%(datumPorudzbine)s WHERE IDPorudzbina=%(porudzbina_IDPorudzbina)s", poruceno)
    db.commit()
    cursor.execute("SELECT * FROM porudzbina WHERE IDPorudzbina=%s", (porudzbina_IDPorudzbina, ))
    poruceno = cursor.fetchone()
    return flask.jsonify(poruceno)

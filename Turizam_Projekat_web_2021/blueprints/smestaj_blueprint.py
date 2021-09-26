import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


smestaj_blueprint=Blueprint("smestaj_blueprint", __name__)


#KORISNIK
@smestaj_blueprint.route("")
def getAllSmestaj():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM smestaj")
    smestaj = cursor.fetchall()
    return flask.jsonify(smestaj)

########Prikaz liste###########
@smestaj_blueprint.route("<int:smestaj_id>")
def getSmestaj(smestaj_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM smestaj WHERE id=%s", (smestaj_id,))
    smestaj=cursor.fetchone()
    if smestaj is not None:
        return flask.jsonify(smestaj)
    return "", 404
#################################

@smestaj_blueprint.route("", methods=["POST"])
def dodajSmestaj():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO smestaj(naziv, mesto) VALUES (%(naziv)s, %(mesto)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@smestaj_blueprint.route("<int:smestaj_id>", methods=["DELETE"])
def ukloniSmestaj(smestaj_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM smestaj WHERE id=%s", (smestaj_id, ))
    db.commit()
    return ""

@smestaj_blueprint.route("<int:smestaj_id>", methods=["PUT"])
def izmeniSmestaj(smestaj_id):
    smestaj = dict(flask.request.json)
    smestaj["smestaj_id"] = smestaj_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE smestaj SET naziv=%(naziv)s, mesto=%(mesto)s WHERE id=%(smestaj_id)s", smestaj)
    db.commit()
    cursor.execute("SELECT * FROM smestaj WHERE id=%s", (smestaj_id, ))
    smestaj = cursor.fetchone()
    return flask.jsonify(smestaj)



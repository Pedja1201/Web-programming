import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


predmet_blueprint=Blueprint("predmet_blueprint", __name__)


##Predmet
@predmet_blueprint.route("")
def getAllPredmeti():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet")
    predmet = cursor.fetchall()
    for p in predmet:                ######MySql
        p["espb"] = float(p["espb"])  ##Za decimal u bazi
    return flask.jsonify(predmet)
    
#########
@predmet_blueprint.route("<int:predmet_id>")
def getPredmet(predmet_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmet_id,))
    predmet = cursor.fetchone()
    if predmet is not None:
        predmet["espb"] = float(predmet["espb"]) ##Decimal
        return flask.jsonify(predmet)

    return "", 404
##################################


@predmet_blueprint.route("", methods=["POST"])
def dodajPredmet():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO predmet(naziv, profesor_id, espb) VALUES (%(naziv)s, %(profesor_id)s, %(espb)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@predmet_blueprint.route("<int:predmet_id>", methods=["DELETE"])
def ukloniPredmet(predmet_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM predmet WHERE id=%s", (predmet_id, ))
    db.commit()
    return ""

@predmet_blueprint.route("<int:predmet_id>", methods=["PUT"])
def izmeniPredmet(predmet_id):
    predmet = dict(flask.request.json)
    predmet["predmet_id"] = predmet_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE predmet SET naziv=%(naziv)s, profesor_id=%(profesor_id)s, espb=%(espb)s WHERE id=%(predmet_id)s", predmet)
    db.commit()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmet_id, ))
    predmet = cursor.fetchone()
    predmet["espb"] = float(predmet["espb"]) ###Za Decimal u bazi
    return flask.jsonify(predmet)



import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


igrica_blueprint=Blueprint("igrica_blueprint", __name__)


@igrica_blueprint.route("")
def getAllIgrice():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM igrica")
    igrica = cursor.fetchall()
    for i in igrica:
        i["cena"] = float(i["cena"])
    return flask.jsonify(igrica)
    
########
@igrica_blueprint.route("<int:igrica_id>")
def getIgrice(igrica_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM igrica WHERE id=%s", (igrica_id,))
    igrica = cursor.fetchone()
    if igrica is not None:
        igrica["cena"] = float(igrica["cena"])
        return flask.jsonify(igrica)

    return "", 404
# #################################


@igrica_blueprint.route("", methods=["POST"])
def dodajIgricu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO igrica(naziv, cena, zanr,konzola_id) VALUES (%(naziv)s, %(cena)s, %(zanr)s,%(konzola_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@igrica_blueprint.route("<int:igrica_id>", methods=["DELETE"])
def ukloniIgricu(igrica_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM igrica WHERE id=%s", (igrica_id, ))
    db.commit()
    return ""

@igrica_blueprint.route("<int:igrica_id>", methods=["PUT"])
def izmeniIgricu(igrica_id):
    igrica = dict(flask.request.json)
    igrica["igrica_id"] = igrica_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE igrica SET naziv=%(naziv)s, cena=%(cena)s, zanr=%(zanr)s,konzola_id=%(konzola_id)s WHERE id=%(igrica_id)s", igrica)
    db.commit()
    cursor.execute("SELECT * FROM igrica WHERE id=%s", (igrica_id, ))
    igrica = cursor.fetchone()
    igrica["cena"] = float(igrica["cena"])
    return flask.jsonify(igrica)

import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


konzola_blueprint=Blueprint("konzola_blueprint", __name__)


@konzola_blueprint.route("")
def getAllKonzole():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM konzola")
    konzola = cursor.fetchall()
    return flask.jsonify(konzola)


@konzola_blueprint.route("<int:konzola_id>")
def getKonzola(konzola_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM konzola WHERE id=%s", (konzola_id,))
    konzola=cursor.fetchone()
    if konzola is not None:
        return flask.jsonify(konzola)
    return "", 404

@konzola_blueprint.route("", methods=["POST"])
def dodajKonzolu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO konzola(naziv) VALUES (%(naziv)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@konzola_blueprint.route("<int:konzola_id>", methods=["DELETE"])
def ukloniKonzolu(konzola_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM konzola WHERE id=%s", (konzola_id, ))
    db.commit()
    return ""

@konzola_blueprint.route("<int:konzola_id>", methods=["PUT"])
def izmeniKonzolu(konzola_id):
    konzola = dict(flask.request.json)
    konzola["konzola_id"] = konzola_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE konzola SET naziv=%(naziv)s WHERE id=%(konzola_id)s", konzola)
    db.commit()
    cursor.execute("SELECT * FROM konzola WHERE id=%s", (konzola_id, ))
    konzola = cursor.fetchone()
    return flask.jsonify(konzola)

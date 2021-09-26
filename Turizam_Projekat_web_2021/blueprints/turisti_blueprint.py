import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


turista_blueprint=Blueprint("turista_blueprint", __name__)


#Turisti
@turista_blueprint.route("")
def getAllTuriste():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM turista")
    turista = cursor.fetchall()
    for t in turista:
        t["maticni_broj"] = float(t["maticni_broj"])
    return flask.jsonify(turista)
    
########
@turista_blueprint.route("<int:turista_id>")
def getTurista(turista_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM turista WHERE id=%s", (turista_id,))
    turista = cursor.fetchone()
    if turista is not None:
        turista["maticni_broj"] = float(turista["maticni_broj"])
        return flask.jsonify(turista)

    return "", 404
# #################################


@turista_blueprint.route("", methods=["POST"])
def dodajTuristu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO turista(ime, prezime, datum_rodjenja, maticni_broj) VALUES (%(ime)s, %(prezime)s, %(datum_rodjenja)s, %(maticni_broj)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@turista_blueprint.route("<int:turista_id>", methods=["DELETE"])
def ukloniTuristu(turista_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM turista WHERE id=%s", (turista_id, ))
    db.commit()
    return ""

@turista_blueprint.route("<int:turista_id>", methods=["PUT"])
def izmeniTuristu(turista_id):
    turista = dict(flask.request.json)
    turista["turista_id"] = turista_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE turista SET ime=%(ime)s, prezime=%(prezime)s, datum_rodjenja=%(datum_rodjenja)s, maticni_broj=%(maticni_broj)s WHERE id=%(turista_id)s", turista)
    db.commit()
    cursor.execute("SELECT * FROM turista WHERE id=%s", (turista_id, ))
    turista = cursor.fetchone()
    turista["maticni_broj"] = float(turista["maticni_broj"])
    return flask.jsonify(turista)

import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


profesor_blueprint=Blueprint("profesor_blueprint", __name__)



##Student
@profesor_blueprint.route("")
def getAllProfesori():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM profesor")
    profesor = cursor.fetchall()
    return flask.jsonify(profesor)
    
########
@profesor_blueprint.route("<int:profesor_id>")
def getProfesor(profesor_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM profesor WHERE id=%s", (profesor_id,))
    profesor = cursor.fetchone()
    if profesor is not None:
        return flask.jsonify(profesor)

    return "", 404
# #################################


@profesor_blueprint.route("", methods=["POST"])
def dodajProfesora():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO profesor(ime, prezime, email) VALUES (%(ime)s, %(prezime)s, %(email)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@profesor_blueprint.route("<int:profesor_id>", methods=["DELETE"])
def ukloniProfesora(profesor_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM profesor WHERE id=%s", (profesor_id, ))
    db.commit()
    return ""

@profesor_blueprint.route("<int:profesor_id>", methods=["PUT"])
def izmeniProfesora(profesor_id):
    profesor = dict(flask.request.json)
    profesor["profesor_id"] = profesor_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE profesor SET ime=%(ime)s, prezime=%(prezime)s, email=%(email)s WHERE id=%(profesor_id)s", profesor)
    db.commit()
    cursor.execute("SELECT * FROM profesor WHERE id=%s", (profesor_id, ))
    profesor = cursor.fetchone()
    return flask.jsonify(profesor)

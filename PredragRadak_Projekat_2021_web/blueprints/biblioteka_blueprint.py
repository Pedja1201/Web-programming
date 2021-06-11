import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


biblioteka_blueprint=Blueprint("biblioteka_blueprint", __name__)


####Biblioteka
@biblioteka_blueprint.route("")
def getAllBiblioteka():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM biblioteka")
    biblioteka = cursor.fetchall()
    return flask.jsonify(biblioteka)

 ########Prikaz liste###########
@biblioteka_blueprint.route("<int:biblioteka_id>")
def getBiblioteka(biblioteka_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM biblioteka WHERE id=%s", (biblioteka_id,))
    biblioteka = cursor.fetchone()
    if biblioteka is not None:
        return flask.jsonify(biblioteka)
    return "", 404
#################################

@biblioteka_blueprint.route("", methods=["POST"])
def dodajBiblioteku():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO biblioteka(naziv, adresa, telefon, email) VALUES (%(naziv)s, %(adresa)s, %(telefon)s, %(email)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@biblioteka_blueprint.route("<int:biblioteka_id>", methods=["DELETE"])
def ukloniBiblioteku(biblioteka_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM biblioteka WHERE id=%s", (biblioteka_id, ))
    db.commit()
    return ""

@biblioteka_blueprint.route("<int:biblioteka_id>", methods=["PUT"])
def izmeniBiblioteku(biblioteka_id):
    biblioteka = dict(flask.request.json)
    biblioteka["biblioteka_id"] = biblioteka_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE biblioteka SET naziv=%(naziv)s, adresa=%(adresa)s, telefon=%(telefon)s, email=%(email)s WHERE id=%(biblioteka_id)s", biblioteka)
    db.commit()
    cursor.execute("SELECT * FROM biblioteka WHERE id=%s", (biblioteka_id, ))
    biblioteka = cursor.fetchone()
    return flask.jsonify(biblioteka)

import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


bibliotekar_blueprint=Blueprint("bibliotekar_blueprint", __name__)


#Bibliotekar
@bibliotekar_blueprint.route("")
def getAllBibliotekar():
    if session.get("bibliotekar") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM bibliotekar")
        bibliotekar = cursor.fetchall()
        return flask.jsonify(bibliotekar)
    return "", 401   #Login return od ifa

########Prikaz liste###########
@bibliotekar_blueprint.route("<int:bibliotekar_id>")
def getBibliotekar(bibliotekar_id):
    if session.get("bibliotekar") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM bibliotekar WHERE id=%s", (bibliotekar_id,))
        bibliotekar=cursor.fetchone()
        if bibliotekar is not None:
            return flask.jsonify(bibliotekar)
        return "", 404
    return "", 401   #Login return od ifa
#################################

@bibliotekar_blueprint.route("", methods=["POST"])
def dodajBibliotekara():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO bibliotekar(korisnicko_ime, lozinka) VALUES (%(korisnicko_ime)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201
    

@bibliotekar_blueprint.route("<int:bibliotekar_id>", methods=["DELETE"])
def ukloniBibliotekara(bibliotekar_id):
    if session.get("bibliotekar") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM bibliotekar WHERE id=%s", (bibliotekar_id, ))
        db.commit()
        return ""
    return "", 401   #Login return od ifa

@bibliotekar_blueprint.route("<int:bibliotekar_id>", methods=["PUT"])
def izmeniBibliotekara(bibliotekar_id):
    if session.get("bibliotekar") is not None:
        bibliotekar = dict(flask.request.json)
        bibliotekar["bibliotekar_id"] = bibliotekar_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE bibliotekar SET korisnicko_ime=%(korisnicko_ime)s, lozinka=%(lozinka)s WHERE id=%(bibliotekar_id)s", bibliotekar)
        db.commit()
        cursor.execute("SELECT * FROM bibliotekar WHERE id=%s", (bibliotekar_id, ))
        bibliotekar = cursor.fetchone()
        return flask.jsonify(bibliotekar)
    return "", 401   #Login return od ifa

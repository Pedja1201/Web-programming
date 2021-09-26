import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


aranzman_blueprint=Blueprint("aranzman_blueprint", __name__)

##Aranzman
@aranzman_blueprint.route("")
def getAllAranzman():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM aranzman")
        aranzman = cursor.fetchall()
        for a in aranzman:
            a["cena"] = float(a["cena"])
        return flask.jsonify(aranzman)
    return "", 401   #Login return od ifa

    
########
@aranzman_blueprint.route("<int:aranzman_id>")
def getAranzman(aranzman_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM aranzman WHERE id=%s", (aranzman_id,))
        aranzman = cursor.fetchone()
        if aranzman is not None:
            aranzman["cena"] = float(aranzman["cena"])
            return flask.jsonify(aranzman)
        return "", 404
    return "", 401
# #################################


@aranzman_blueprint.route("", methods=["POST"])
def dodajAranzman():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO aranzman(smestaj_id, cena, datum_polaska, broj_dana) VALUES (%(smestaj_id)s, %(cena)s, %(datum_polaska)s, %(broj_dana)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401

@aranzman_blueprint.route("<int:aranzman_id>", methods=["DELETE"])
def ukloniAranzman(aranzman_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM aranzman WHERE id=%s", (aranzman_id, ))
        db.commit()
        return ""
    return "", 401

@aranzman_blueprint.route("<int:aranzman_id>", methods=["PUT"])
def izmeniAranzman(aranzman_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        aranzman = dict(flask.request.json)
        aranzman["aranzman_id"] = aranzman_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE aranzman SET smestaj_id=%(smestaj_id)s, cena=%(cena)s, datum_polaska=%(datum_polaska)s, broj_dana=%(broj_dana)s WHERE id=%(aranzman_id)s", aranzman)
        db.commit()
        cursor.execute("SELECT * FROM aranzman WHERE id=%s", (aranzman_id, ))
        aranzman = cursor.fetchone()
        aranzman["cena"] = float(aranzman["cena"])
        return flask.jsonify(aranzman)
    return "", 401
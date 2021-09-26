import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


rakija_blueprint=Blueprint("rakija_blueprint", __name__)


###Prodaja
@rakija_blueprint.route("")
def getAllrakija():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM rakija")
        rakija = cursor.fetchall()
        for r in rakija:
            r["cena"] = float(r["cena"])
        return flask.jsonify(rakija)
    return "", 401   #Login return od ifa
    
########
@rakija_blueprint.route("<int:rakija_id>")
def getRakija(rakija_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM rakija WHERE id=%s", (rakija_id,))
        rakija = cursor.fetchone()
        if rakija is not None:
            rakija["cena"] = float(rakija["cena"])
            return flask.jsonify(rakija)

        return "", 404
    return "", 401   #Login return od ifa
# #################################


@rakija_blueprint.route("", methods=["POST"])
def dodajRakiju():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO rakija(naziv, sorta, cena, godina) VALUES (%(naziv)s, %(sorta)s, %(cena)s, %(godina)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401   #Login return od ifa


@rakija_blueprint.route("<int:rakija_id>", methods=["DELETE"])
def ukloniRakiju(rakija_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM rakija WHERE id=%s", (rakija_id, ))
        db.commit()
        return ""
    return "", 401    #Login return od ifa

@rakija_blueprint.route("<int:rakija_id>", methods=["PUT"])
def izmeniRakiju(rakija_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        rakija = dict(flask.request.json)
        rakija["rakija_id"] = rakija_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE rakija SET naziv=%(naziv)s, sorta=%(sorta)s, cena=%(cena)s, godina=%(godina)s WHERE id=%(rakija_id)s", rakija)
        db.commit()
        cursor.execute("SELECT * FROM rakija WHERE id=%s", (rakija_id, ))
        rakija = cursor.fetchone()
        rakija["cena"] = float(rakija["cena"])
        return flask.jsonify(rakija)
    return "", 401  #Login return od ifa
    

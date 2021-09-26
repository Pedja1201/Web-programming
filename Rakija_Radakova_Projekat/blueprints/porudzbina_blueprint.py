import flask
from flask import Blueprint
from flask import session

from utils.db import mysql

porudzbina_blueprint=Blueprint("porudzbina_blueprint", __name__)

##Aranzman
@porudzbina_blueprint.route("")
def getAllPorudzbina():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM porudzbina")
        porudzbina = cursor.fetchall()
        return flask.jsonify(porudzbina)
    return "", 401   #Login return od ifa

    
########
@porudzbina_blueprint.route("<int:porudzbina_id>")
def getPorudzbina(porudzbina_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM porudzbina WHERE id=%s", (porudzbina_id,))
        porudzbina = cursor.fetchone()
        if porudzbina is not None:
            return flask.jsonify(porudzbina)
        return "", 404
    return "", 401
# #################################


@porudzbina_blueprint.route("", methods=["POST"])
def dodajPorudzbinu():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO porudzbina(kupac_id, rakija_id, kolicina, datum) VALUES (%(kupac_id)s, %(rakija_id)s, %(kolicina)s, %(datum)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401

@porudzbina_blueprint.route("<int:porudzbina_id>", methods=["DELETE"])
def ukloniPorudzbinu(porudzbina_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM porudzbina WHERE id=%s", (porudzbina_id, ))
        db.commit()
        return ""
    return "", 401

@porudzbina_blueprint.route("<int:porudzbina_id>", methods=["PUT"])
def izmeniPorudzbinu(porudzbina_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        porudzbina = dict(flask.request.json)
        porudzbina["porudzbina_id"] = porudzbina_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE porudzbina SET kupac_id=%(kupac_id)s, rakija_id=%(rakija_id)s, kolicina=%(kolicina)s, datum=%(datum)s WHERE id=%(porudzbina_id)s", porudzbina)
        db.commit()
        cursor.execute("SELECT * FROM porudzbina WHERE id=%s", (porudzbina_id, ))
        porudzbina = cursor.fetchone()
        return flask.jsonify(porudzbina)
    return "", 401



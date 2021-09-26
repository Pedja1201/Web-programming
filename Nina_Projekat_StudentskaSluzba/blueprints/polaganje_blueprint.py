import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


polaganje_blueprint=Blueprint("polaganje_blueprint", __name__)



###Polaganje
@polaganje_blueprint.route("")
def getAllPolaganje():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM polaganje")
        polaganje = cursor.fetchall()
        for p in polaganje:                ######MySql
            p["ocena"] = float(p["ocena"])  ##Za decimal u bazi
        return flask.jsonify(polaganje)
    return "", 401    #Login return od ifa

    
# #########
@polaganje_blueprint.route("<int:polaganje_id>")
def getPolaganje(polaganje_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM polaganje WHERE id=%s", (polaganje_id,))
        polaganje = cursor.fetchone()
        if polaganje is not None:
            polaganje["ocena"] = float(polaganje["ocena"])###Za decimal
            return flask.jsonify(polaganje)

        return "", 404
    return "", 401
    # ##################################


@polaganje_blueprint.route("", methods=["POST"])
def dodajPolaganje():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO polaganje(student_id, predmet_id, datum, ocena) VALUES (%(student_id)s, %(predmet_id)s, %(datum)s, %(ocena)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401

@polaganje_blueprint.route("<int:polaganje_id>", methods=["DELETE"])
def ukloniPolaganje(polaganje_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM polaganje WHERE id=%s", (polaganje_id, ))
        db.commit()
        return ""
    return "", 401

@polaganje_blueprint.route("<int:polaganje_id>", methods=["PUT"])
def izmeniPolaganje(polaganje_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        polaganje = dict(flask.request.json)
        polaganje["polaganje_id"] = polaganje_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE polaganje SET student_id=%(student_id)s, predmet_id=%(predmet_id)s, datum=%(datum)s, ocena=%(ocena)s WHERE id=%(polaganje_id)s", polaganje)
        db.commit()
        cursor.execute("SELECT * FROM polaganje WHERE id=%s", (polaganje_id, ))
        polaganje = cursor.fetchone()
        polaganje["ocena"] = float(polaganje["ocena"]) ###Za Decimal u bazi
        return flask.jsonify(polaganje)
    return "", 401





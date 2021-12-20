import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


polisa_blueprint=Blueprint("polisa_blueprint", __name__)


###Polise
@polisa_blueprint.route("")
def getAllPolisa():
    if session.get("korisnik") is not None:  #Login za prikaz
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM polisa")
        polisa = cursor.fetchall()
        for p in polisa:
            p["cena"] = float(p["cena"])
        return flask.jsonify(polisa)
    return "", 401   #Login return od ifa
    
########
@polisa_blueprint.route("<int:polisa_id>")
def getPolisa(polisa_id):
    if session.get("korisnik") is not None:  #Login za prikaz
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM polisa WHERE id=%s", (polisa_id,))
        polisa = cursor.fetchone()
        if polisa is not None:
            polisa["cena"] = float(polisa["cena"])
            return flask.jsonify(polisa)

        return "", 404
    # #################################
    return "", 401   #Login return od ifa


@polisa_blueprint.route("", methods=["POST"])
def dodajPolisu():
    if session.get("korisnik") is not None:  #Login za prikaz
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO polisa(automobil_id, osiguravajuca_kuca_id, datum_pocetka, datum_kraja, cena) VALUES (%(automobil_id)s, %(osiguravajuca_kuca_id)s, %(datum_pocetka)s, %(datum_kraja)s, %(cena)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401   #Login return od ifa

@polisa_blueprint.route("<int:polisa_id>", methods=["DELETE"])
def ukloniPolisu(polisa_id):
    if session.get("korisnik") is not None:  #Login za prikaz
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM polisa WHERE id=%s", (polisa_id, ))
        db.commit()
        return ""
    return "", 401   #Login return od ifa

@polisa_blueprint.route("<int:polisa_id>", methods=["PUT"])
def izmeniPolisu(polisa_id):
    if session.get("korisnik") is not None:  #Login za prikaz
        polisa = dict(flask.request.json)
        polisa["polisa_id"] = polisa_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE polisa SET automobil_id=%(automobil_id)s, osiguravajuca_kuca_id=%(osiguravajuca_kuca_id)s, datum_pocetka=%(datum_pocetka)s, datum_kraja=%(datum_kraja)s, cena=%(cena)s WHERE id=%(polisa_id)s", polisa)
        db.commit()
        cursor.execute("SELECT * FROM polisa WHERE id=%s", (polisa_id, ))
        polisa = cursor.fetchone()
        polisa["cena"] = float(polisa["cena"])
        return flask.jsonify(polisa)
    return "", 401   #Login return od ifa

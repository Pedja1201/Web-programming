import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


automobil_blueprint=Blueprint("automobil_blueprint", __name__)


#Automobil
@automobil_blueprint.route("")
def getAllAutomobil():
    if session.get("korisnik") is not None:  #Login za prikaz
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM automobil")
        automobil = cursor.fetchall()
        for a in automobil:
            a["zapremina_motora"] = float(a["zapremina_motora"])
        return flask.jsonify(automobil)
    return "", 401   #Login return od ifa
    
########
@automobil_blueprint.route("<int:automobil_id>")
def getSAutomobil(automobil_id):
    if session.get("korisnik") is not None:  #Login za prikaz
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM automobil WHERE id=%s", (automobil_id,))
        automobil = cursor.fetchone()
        if automobil is not None:
            automobil["zapremina_motora"] = float(automobil["zapremina_motora"])
            return flask.jsonify(automobil)

        return "", 404
    # #################################
    return "", 401   #Login return od ifa


@automobil_blueprint.route("", methods=["POST"])
def dodajAutomobil():
    if session.get("korisnik") is not None: 
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO automobil(registarski_broj, marka, model, zapremina_motora) VALUES (%(registarski_broj)s, %(marka)s, %(model)s, %(zapremina_motora)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401   #Login return od ifa

@automobil_blueprint.route("<int:automobil_id>", methods=["DELETE"])
def ukloniAutomobil(automobil_id):
    if session.get("korisnik") is not None: 
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM automobil WHERE id=%s", (automobil_id, ))
        db.commit()
        return ""
    return "", 401   #Login return od ifa

@automobil_blueprint.route("<int:automobil_id>", methods=["PUT"])
def izmeniAutomobil(automobil_id):
    if session.get("korisnik") is not None: 
        automobil = dict(flask.request.json)
        automobil["automobil_id"] = automobil_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE automobil SET registarski_broj=%(registarski_broj)s, marka=%(marka)s, model=%(model)s, zapremina_motora=%(zapremina_motora)s WHERE id=%(automobil_id)s", automobil)
        db.commit()
        cursor.execute("SELECT * FROM automobil WHERE id=%s", (automobil_id, ))
        automobil = cursor.fetchone()
        automobil["zapremina_motora"] = float(automobil["zapremina_motora"])
        return flask.jsonify(automobil)
    return "", 401   #Login return od ifa

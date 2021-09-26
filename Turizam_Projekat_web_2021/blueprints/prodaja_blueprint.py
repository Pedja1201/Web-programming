import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


prodaja_blueprint=Blueprint("prodaja_blueprint", __name__)


###Prodaja
@prodaja_blueprint.route("")
def getAllProdaja():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM prodaja")
        prodaja = cursor.fetchall()
        return flask.jsonify(prodaja)
    return "", 401   #Login return od ifa
    
########
@prodaja_blueprint.route("<int:prodaja_id>")
def getProdaja(prodaja_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM prodaja WHERE id=%s", (prodaja_id,))
        prodaja = cursor.fetchone()
        if prodaja is not None:
            return flask.jsonify(prodaja)

        return "", 404
    return "", 401   #Login return od ifa
# #################################


@prodaja_blueprint.route("", methods=["POST"])
def dodajProdaju():
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO prodaja(aranzman_id, turista_id, nacin_placanja, datum_placanja) VALUES (%(aranzman_id)s, %(turista_id)s, %(nacin_placanja)s, %(datum_placanja)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401   #Login return od ifa


@prodaja_blueprint.route("<int:prodaja_id>", methods=["DELETE"])
def ukloniProdaju(prodaja_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM prodaja WHERE id=%s", (prodaja_id, ))
        db.commit()
        return ""
    return "", 401    #Login return od ifa

@prodaja_blueprint.route("<int:prodaja_id>", methods=["PUT"])
def izmeniProdaju(prodaja_id):
    if session.get("korisnik") is not None:  #Login za prikaz aranzmana (Korisnik je povezan trenutno samo za kupce)
        prodaja = dict(flask.request.json)
        prodaja["prodaja_id"] = prodaja_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE prodaja SET aranzman_id=%(aranzman_id)s, turista_id=%(turista_id)s, nacin_placanja=%(nacin_placanja)s, datum_placanja=%(datum_placanja)s WHERE id=%(prodaja_id)s", prodaja)
        db.commit()
        cursor.execute("SELECT * FROM prodaja WHERE id=%s", (prodaja_id, ))
        prodaja = cursor.fetchone()
        return flask.jsonify(prodaja)
    return "", 401  #Login return od ifa
    

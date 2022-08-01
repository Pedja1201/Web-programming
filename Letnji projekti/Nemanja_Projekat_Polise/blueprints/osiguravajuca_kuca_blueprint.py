import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


osiguravajuca_kuca_blueprint=Blueprint("osiguravajuca_kuca_blueprint", __name__)


##OsiguravajuceKuce
@osiguravajuca_kuca_blueprint.route("")
def getAllOsiguravajuceKuce():
    if session.get("korisnik") is not None:  #Login za prikaz
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM osiguravajuca_kuca")
        kuca = cursor.fetchall()
        return flask.jsonify(kuca)
    return "", 401   #Login return od ifa
    
########
@osiguravajuca_kuca_blueprint.route("<int:osiguravajucaKuca_id>")
def getOsiguravajucaKuca(osiguravajucaKuca_id):
    if session.get("korisnik") is not None:  #Login za prikaz
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM osiguravajuca_kuca WHERE id=%s", (osiguravajucaKuca_id,))
        kuca = cursor.fetchone()
        if kuca is not None:
            return flask.jsonify(kuca)

        return "", 404
    # #################################
    return "", 401   #Login return od ifa


@osiguravajuca_kuca_blueprint.route("", methods=["POST"])
def dodajOsiguravajucuKucu():
    if session.get("korisnik") is not None:  #Login za prikaz
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO osiguravajuca_kuca(naziv) VALUES (%(naziv)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401   #Login return od ifa

@osiguravajuca_kuca_blueprint.route("<int:osiguravajucaKuca_id>", methods=["DELETE"])
def ukloniOsiguravajucuKucu(osiguravajucaKuca_id):
    if session.get("korisnik") is not None:  #Login za prikaz
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM osiguravajuca_kuca WHERE id=%s", (osiguravajucaKuca_id, ))
        db.commit()
        return ""
    return "", 401   #Login return od ifa

@osiguravajuca_kuca_blueprint.route("<int:osiguravajucaKuca_id>", methods=["PUT"])
def izmeniOsiguravajucuKucu(osiguravajucaKuca_id):
    if session.get("korisnik") is not None:  #Login za prikaz
        kuca = dict(flask.request.json)
        kuca["osiguravajucaKuca_id"] = osiguravajucaKuca_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE osiguravajuca_kuca SET naziv=%(naziv)s WHERE id=%(osiguravajucaKuca_id)s", kuca)
        db.commit()
        cursor.execute("SELECT * FROM osiguravajuca_kuca WHERE id=%s", (osiguravajucaKuca_id, ))
        kuca = cursor.fetchone()
        return flask.jsonify(kuca)
    return "", 401   #Login return od ifa

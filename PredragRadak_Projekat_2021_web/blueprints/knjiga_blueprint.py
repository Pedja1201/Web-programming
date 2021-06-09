import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


knjiga_blueprint=Blueprint("knjiga_blueprint", __name__)


##Knjiga
@knjiga_blueprint.route("")
def getAllKnjige():
    if session.get("bibliotekar") is not None:  #Login za prikaz kupaca (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM knjiga")
        knjiga = cursor.fetchall()
        for k in knjiga:
            k["cena"] = float(k["cena"])
        return flask.jsonify(knjiga)
    return "", 401   #Login return od ifa

 ########Prikaz liste###########
@knjiga_blueprint.route("<int:knjiga_IDKnjiga>")
def getKnjiga(knjiga_IDKnjiga):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM knjiga WHERE IDKnjiga=%s", (knjiga_IDKnjiga,))
    knjiga = cursor.fetchone()
    if knjiga is not None:
        knjiga["cena"] = float(knjiga["cena"])
        return flask.jsonify(knjiga)
    return "", 404
#################################

@knjiga_blueprint.route("", methods=["POST"])
def dodajKnjige():
    if session.get("bibliotekar") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO knjiga(naziv, autor, kategorija, cena, stanje, biblioteka_id) VALUES (%(naziv)s, %(autor)s, %(kategorija)s, %(cena)s, %(stanje)s, %(biblioteka_id)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401   #Login return od ifa   

@knjiga_blueprint.route("<int:knjiga_IDKnjiga>", methods=["DELETE"])
def ukloniKnjigu(knjiga_IDKnjiga):
    if session.get("bibliotekar") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM knjiga WHERE IDKnjiga=%s", (knjiga_IDKnjiga, ))
        db.commit()
        return ""
    return "", 401   #Login return od ifa   

@knjiga_blueprint.route("<int:knjiga_IDKnjiga>", methods=["PUT"])
def izmeniKnjigu(knjiga_IDKnjiga):
    if session.get("bibliotekar") is not None:
        knjiga = dict(flask.request.json)
        knjiga["knjiga_IDKnjiga"] = knjiga_IDKnjiga
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE knjiga SET naziv=%(naziv)s, autor=%(autor)s, kategorija=%(kategorija)s, cena=%(cena)s, stanje=%(stanje)s, biblioteka_id=%(biblioteka_id)s WHERE IDKnjiga=%(knjiga_IDKnjiga)s", knjiga)
        db.commit()
        cursor.execute("SELECT * FROM knjiga WHERE IDKnjiga=%s", (knjiga_IDKnjiga, ))
        knjiga = cursor.fetchone()
        knjiga["cena"] = float(knjiga["cena"]) ###Decimal u bazi!!!
        return flask.jsonify(knjiga)
    return "", 401   #Login return od ifa   

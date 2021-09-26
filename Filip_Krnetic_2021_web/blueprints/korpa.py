import flask
from flask import Blueprint
from flask import session

from utils.db import mysql

korpa_blueprint=Blueprint("korpa_blueprint", __name__)

##Aranzman
@korpa_blueprint.route("")
def getAllKorpa():
    if session.get("korisnik") is not None:  
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korpa")
        korpa = cursor.fetchall()
        return flask.jsonify(korpa)
    return "", 401   

    
########
@korpa_blueprint.route("<int:korpa_id>")
def getKorpa(korpa_id):
    if session.get("korisnik") is not None:  
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id,))
        korpa = cursor.fetchone()
        if korpa is not None:
            return flask.jsonify(korpa)
        return "", 404
    return "", 401
# #################################


@korpa_blueprint.route("", methods=["POST"])
def dodajKorpu():
    if session.get("korisnik") is not None:  
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO korpa(igrica_id, kolicina, datum) VALUES (%(igrica_id)s, %(kolicina)s, %(datum)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401

@korpa_blueprint.route("<int:korpa_id>", methods=["DELETE"])
def ukloniKorpu(korpa_id):
    if session.get("korisnik") is not None:  
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM korpa WHERE id=%s", (korpa_id, ))
        db.commit()
        return ""
    return "", 401

@korpa_blueprint.route("<int:korpa_id>", methods=["PUT"])
def izmeniKorpu(korpa_id):
    if session.get("korisnik") is not None:
        korpa = dict(flask.request.json)
        korpa["korpa_id"] = korpa_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE korpa SET igrica_id=%(igrica_id)s, kolicina=%(kolicina)s, datum=%(datum)s WHERE id=%(korpa_id)s", korpa)
        db.commit()
        cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id, ))
        korpa = cursor.fetchone()
        return flask.jsonify(korpa)
    return "", 401



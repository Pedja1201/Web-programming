import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


korisnik_blueprint=Blueprint("korisnik_blueprint", __name__)


#KORISNIK
@korisnik_blueprint.route("")
def getAllKorisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.jsonify(korisnik)

########Prikaz liste###########
@korisnik_blueprint.route("<int:korisnik_IDKorisnik>")
def getKorisnik(korisnik_IDKorisnik):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik,))
    korisnik=cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)
    return "", 404
#################################

@korisnik_blueprint.route("", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(email, lozinka) VALUES (%(email)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@korisnik_blueprint.route("<int:korisnik_IDKorisnik>", methods=["DELETE"])
def ukloniKorisnika(korisnik_IDKorisnik):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik, ))
    db.commit()
    return ""

@korisnik_blueprint.route("<int:korisnik_IDKorisnik>", methods=["PUT"])
def izmeniKorisnika(korisnik_IDKorisnik):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_IDKorisnik"] = korisnik_IDKorisnik
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET email=%(email)s, lozinka=%(lozinka)s WHERE IDKorisnik=%(korisnik_IDKorisnik)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)


###Metoda za pretragu-Vezba
# @korisnik_trazi.route("", methods=['POST'])
# def trazi():
#     korisnik = dict(flask.request.json)
#     users = []
#     with mysql.get_db().cursor() as cursor:
#         sql = "SELECT * FROM users WHERE email LIKE %s"
#         cursor.execute(sql, ('%'+korisnik['email']+'%', ))
#         for el in cursor.fetchall():
#             el['spojeno'] = el['email']+'====='+el['password']
#             users.append(el)
#         return flask.request.json, 201  
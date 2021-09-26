import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


login_blueprint=Blueprint("login_blueprint", __name__)


#####LOGIN####
@login_blueprint.route("", methods=["POST"]) #Novo-Logovanje korisnika
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE email=%(email)s AND lozinka=%(lozinka)s", flask.request.json)
    korisnik = cursor.fetchone()
    if korisnik is not None:
        session["korisnik"] = korisnik["email"]
        return "", 200
    return "", 403

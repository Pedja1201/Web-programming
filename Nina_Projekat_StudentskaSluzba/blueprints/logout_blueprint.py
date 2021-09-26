import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


logout_blueprint=Blueprint("logout_blueprint", __name__)

####Korisnik
@logout_blueprint.route("", methods=["GET"]) ###Novo-Odjava
def logout():
    session.pop("korisnik", None)
    return "", 200


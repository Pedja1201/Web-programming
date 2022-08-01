import flask
from flask import Blueprint
from flask import session

from utils.db import mysql


student_blueprint=Blueprint("student_blueprint", __name__)



##Student
@student_blueprint.route("")
def getAllStudenti():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM student")
    student = cursor.fetchall()
    return flask.jsonify(student)
    
########
@student_blueprint.route("<int:student_id>")
def getStudent(student_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM student WHERE id=%s", (student_id,))
    student = cursor.fetchone()
    if student is not None:
        return flask.jsonify(student)

    return "", 404
# #################################


@student_blueprint.route("", methods=["POST"])
def dodajStudenta():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO student(ime, prezime, email, lozinka) VALUES (%(ime)s, %(prezime)s, %(email)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@student_blueprint.route("<int:student_id>", methods=["DELETE"])
def ukloniStudenta(student_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM student WHERE id=%s", (student_id, ))
    db.commit()
    return ""

@student_blueprint.route("<int:student_id>", methods=["PUT"])
def izmeniStudenta(student_id):
    student = dict(flask.request.json)
    student["student_id"] = student_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE student SET ime=%(ime)s, prezime=%(prezime)s, email=%(email)s, lozinka=%(lozinka)s WHERE id=%(student_id)s", student)
    db.commit()
    cursor.execute("SELECT * FROM student WHERE id=%s", (student_id, ))
    student = cursor.fetchone()
    return flask.jsonify(student)

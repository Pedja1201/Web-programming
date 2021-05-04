import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "radnici"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

#RADNIK
@app.route("/")
def home():
    return app.send_static_file("radnik.html")

@app.route("/api/radnici")
def getAllRadnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radnik")
    radnik = cursor.fetchall()
    return flask.jsonify(radnik)
########
@app.route("/api/radnici/<int:radnik_id>")
def getRadnik(radnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radnik WHERE id=%s", (radnik_id,))
    radnik = cursor.fetchone()
    if radnik is not None:
        return flask.jsonify(radnik)

    return "", 404
# #################################


@app.route("/api/radnici", methods=["POST"])
def dodajRadnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO radnik(ime, prezime, email) VALUES (%(ime)s, %(prezime)s, %(email)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/radnici/<int:radnik_id>", methods=["DELETE"])
def ukloniRadnika(radnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM radnik WHERE id=%s", (radnik_id, ))
    db.commit()
    return ""

@app.route("/api/radnici/<int:radnik_id>", methods=["PUT"])
def izmeniRadnika(radnik_id):
    radnik = dict(flask.request.json)
    radnik["radnik_id"] = radnik_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE radnik SET id=%(id)s, ime=%(ime)s, prezime=%(prezime)s, email=%(email)s WHERE id=%(id)s", radnik)
    db.commit()
    cursor.execute("SELECT * FROM radnik WHERE id=%s", (radnik_id, ))
    radnik = cursor.fetchone()
    return flask.jsonify(radnik)

#RadnoMesto
@app.route("/radnoMesto")
def radnoMesto():
    return app.send_static_file("radnoMesto.html")

@app.route("/api/radnaMesta")
def getAllRadnaMesta():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radno_mesto")
    mesto = cursor.fetchall()
    return flask.jsonify(mesto)
    
########
@app.route("/api/radnaMesta/<int:radnaMesta_id>")
def getRadnaMesta(radnaMesta_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radno_mesto WHERE id=%s", (radnaMesta_id,))
    mesto = cursor.fetchone()
    if mesto is not None:
        return flask.jsonify(mesto)

    return "", 404
# # #################################


@app.route("/api/radnaMesta", methods=["POST"])
def dodajRadnaMesta():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO radno_mesto(naziv) VALUES (%(naziv)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/radnaMesta/<int:radnaMesta_id>", methods=["DELETE"])
def ukloniRadnaMesta(radnaMesta_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM radno_mesto WHERE id=%s", (radnaMesta_id, ))
    db.commit()
    return ""

@app.route("/api/radnaMesta/<int:radnaMesta_id>", methods=["PUT"])
def izmeniRadnaMesta(radnaMesta_id):
    mesto = dict(flask.request.json)
    mesto["radnaMesta_id"] = radnaMesta_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE radno_mesto SET id=%(id)s, naziv=%(naziv)s WHERE id=%(id)s", mesto)
    db.commit()
    cursor.execute("SELECT * FROM radno_mesto WHERE id=%s", (radnaMesta_id, ))
    mesto = cursor.fetchone()
    return flask.jsonify(mesto)

####TODO: Zavrsi do kraja angazovanje
#Angazovanje
@app.route("/angazovanje")
def angazovanje():
    return app.send_static_file("angazovanje.html")

@app.route("/api/angazovanja")
def getAllAngazovanja():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM angazovanje")
    angaz = cursor.fetchall()
    return flask.jsonify(angaz)
########
@app.route("/api/angazovanja/<int:angazovanje_id>")
def getAngazovanje(angazovanje_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM angazovanje WHERE id=%s", (angazovanje_id,))
    angaz = cursor.fetchone()
    if angaz is not None:
        return flask.jsonify(angaz)

    return "", 404
# # #################################


@app.route("/api/angazovanja", methods=["POST"])
def dodajAngazovanje():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO angazovanje(radnik_id, radno_mesto_id, pocetak, kraj, plata) VALUES (%(radnik_id)s, %(radno_mesto_id)s, %(pocetak)s, %(kraj)s, %(plata)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/angazovanja/<int:angazovanje_id>", methods=["DELETE"])
def ukloniAngazovanje(angazovanje_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM angazovanje WHERE id=%s", (angazovanje_id, ))
    db.commit()
    return ""

@app.route("/api/angazovanja/<int:angazovanje_id>", methods=["PUT"])
def izmeniAngazovanje(angazovanje_id):
    angaz = dict(flask.request.json)
    angaz["angazovanje_id"] = angazovanje_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE angazovanje SET id=%(id)s, radnik_id=%(radnik_id)s, radno_mesto_id=%(radno_mesto_id)s, pocetak=%(pocetak)s, kraj=%(kraj)s, plata=%(plata)s WHERE id=%(id)s", angaz)
    db.commit()
    cursor.execute("SELECT * FROM angazovanje WHERE id=%s", (angazovanje_id, ))
    angaz = cursor.fetchone()
    return flask.jsonify(angaz)




if __name__ == "__main__":
    app.run()
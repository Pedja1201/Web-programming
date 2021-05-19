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

@app.route("/")
def home():
    return app.send_static_file("index.html")

#Radnik
@app.route("/api/radnici")
def getAllRadnik():
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
    cursor.execute("UPDATE radnik SET ime=%(ime)s, prezime=%(prezime)s, email=%(email)s  WHERE id=%(radnik_id)s", radnik)
    db.commit()
    cursor.execute("SELECT * FROM radnik WHERE id=%s", (radnik_id, ))
    radnik = cursor.fetchone()
    return flask.jsonify(radnik)

##RadnoMesto
@app.route("/api/radnaMesta")
def getRadnaMesta():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radno_mesto")
    mesto = cursor.fetchall()
    return flask.jsonify(mesto)
    
########
@app.route("/api/radnaMesta/<int:radnoMesto_id>")
def getRadnoMesto(radnoMesto_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radno_mesto WHERE id=%s", (radnoMesto_id,))
    mesto = cursor.fetchone()
    if mesto is not None:
        return flask.jsonify(mesto)

    return "", 404
# #################################


@app.route("/api/radnaMesta", methods=["POST"])
def dodajRadnoMesto():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO radno_mesto(naziv) VALUES (%(naziv)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/radnaMesta/<int:radnoMesto_id>", methods=["DELETE"])
def ukloniRadnoMesto(radnoMesto_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM radno_mesto WHERE id=%s", (radnoMesto_id, ))
    db.commit()
    return ""

@app.route("/api/radnaMesta/<int:radnoMesto_id>", methods=["PUT"])
def izmeniRadnoMesto(radnoMesto_id):
    mesto = dict(flask.request.json)
    mesto["radnoMesto_id"] = radnoMesto_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE radno_mesto SET naziv=%(naziv)s WHERE id=%(radnoMesto_id)s", mesto)
    db.commit()
    cursor.execute("SELECT * FROM radno_mesto WHERE id=%s", (radnoMesto_id, ))
    mesto = cursor.fetchone()
    return flask.jsonify(mesto)


###Angazovanje
@app.route("/api/angazovanja")
def getAllAngazovanje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM angazovanje")
    angazovanje = cursor.fetchall()
    return flask.jsonify(angazovanje)
    
########
@app.route("/api/angazovanja/<int:angazovanje_id>")
def getAngazovanje(angazovanje_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM angazovanje WHERE id=%s", (angazovanje_id,))
    angazovanje = cursor.fetchone()
    if angazovanje is not None:
        return flask.jsonify(angazovanje)

    return "", 404
# #################################


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
    angazovanje = dict(flask.request.json)
    angazovanje["angazovanje_id"] = angazovanje_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE angazovanje SET radnik_id=%(radnik_id)s, radno_mesto_id=%(radno_mesto_id)s, pocetak=%(pocetak)s, kraj=%(kraj)s, plata=%(plata)s WHERE id=%(angazovanje_id)s", angazovanje)
    db.commit()
    cursor.execute("SELECT * FROM angazovanje WHERE id=%s", (angazovanje_id, ))
    angazovanje = cursor.fetchone()
    return flask.jsonify(angazovanje)

if __name__ == "__main__":
    app.run()
## Web aplikacija za prodaju bioskopskih karata.
import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "bioskop"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

#TODO: Primer sa componentama


@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/api/karte")
def getAllKarte():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM karta")
    karta = cursor.fetchall()
    return flask.jsonify(karta)
########
@app.route("/api/karte/<string:karta>")
def getKarta(karta_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM karta WHERE id=%s", (karta_id,))
    karta = cursor.fetchone()
    if karta is not None:
        return flask.jsonify(karta)

    return "", 404
# #################################


@app.route("/api/karte", methods=["POST"])
def dodajKartu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO karta(id, naziv_projekcije, pocetak, kraj, br_sedista) VALUES (%(id)s, %(naziv_projekcije)s, %(pocetak)s, %(kraj)s, %(br_sedista)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/karte/<string:karta_id>", methods=["DELETE"])
def ukloniKartu(karta_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM karta WHERE id=%s", (karta_id, ))
    db.commit()
    return ""

@app.route("/api/karte/<string:karta_id>", methods=["PUT"])
def izmeniKartu(karta_id):
    karta = dict(flask.request.json)
    karta["karta_id"] = karta_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE karta SET id=%(id)s, naziv_projekcije=%(naziv_projekcije)s, pocetak=%(pocetak)s, kraj=%(kraj)s,  br_sedista=%(br_sedista)s WHERE id=%(id)s", karta)
    db.commit()
    cursor.execute("SELECT * FROM karta WHERE id=%s", (karta_id, ))
    karta = cursor.fetchone()
    return flask.jsonify(karta)


#Blagajna
# @app.route("/blagajna")
# def blagajna():
#     return app.send_static_file("blagajna.html")

@app.route("/api/blagajna")
def getAllBlagajne():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM blagajna")
    blagajna = cursor.fetchall()
    for b in blagajna:
        b["cena"] = float(b["cena"]) ##Za decimal u bazi
    return flask.jsonify(blagajna)
########
@app.route("/api/blagajna/<int:blagajna_id>")
def getBlagajna(blagajna_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM blagajna WHERE id=%s", (blagajna_id,))
    blagajna = cursor.fetchone()
    if blagajna is not None:
        return flask.jsonify(blagajna)

    return "", 404
# #################################


@app.route("/api/blagajna", methods=["POST"])
def dodajBlagajnu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO blagajna(cena, karta_id) VALUES (%(cena)s, %(karta_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/blagajna/<int:blagajna_id>", methods=["DELETE"])
def ukloniBlagajnu(blagajna_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM blagajna WHERE id=%s", (blagajna_id, ))
    db.commit()
    return ""

@app.route("/api/blagajna/<int:blagajna_id>", methods=["PUT"])
def izmeniBlagajnu(blagajna_id):
    blagajna = dict(flask.request.json)
    blagajna["blagajna_id"] = blagajna_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE blagajna SET id=%(id)s, cena=%(cena)s, karta_id=%(karta_id)s WHERE id=%(id)s", blagajna)
    db.commit()
    cursor.execute("SELECT * FROM blagajna WHERE id=%s", (blagajna_id, ))
    blagajna = cursor.fetchone()
    blagajna["cena"] = float(blagajna["cena"]) #Za decimal u bazi
    return flask.jsonify(blagajna)


if __name__ == "__main__":
    app.run()
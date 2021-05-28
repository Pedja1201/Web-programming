import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

#TODO: Uradjeno sa VueRoute componentama!!!


app = Flask(__name__, static_url_path="")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "skola"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)


@app.route("/")
def home():
    return app.send_static_file("index.html")

##Nastavnik
@app.route("/api/nastavnici")
def getAllNastavnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nastavnik")
    nastavnik = cursor.fetchall()
    return flask.jsonify(nastavnik)
########
@app.route("/api/nastavnici/<int:nastavnik_licni_id>")
def getNastavnik(nastavnik_licni_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nastavnik WHERE licni_id=%s", (nastavnik_licni_id,))
    nastavnik = cursor.fetchone()
    if nastavnik is not None:
        return flask.jsonify(nastavnik)

    return "", 404
# # #################################


@app.route("/api/nastavnici", methods=["POST"])
def dodajNastavnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO nastavnik(licni_id, ime, prezime, email, br_telefona) VALUES (%(licni_id)s, %(ime)s, %(prezime)s, %(email)s, %(br_telefona)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/nastavnici/<int:nastavnik_licni_id>", methods=["DELETE"])
def ukloniNastavnika(nastavnik_licni_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM nastavnik WHERE licni_id=%s", (nastavnik_licni_id, ))
    db.commit()
    return ""

@app.route("/api/nastavnici/<int:nastavnik_licni_id>", methods=["PUT"])
def izmeniNastavnika(nastavnik_licni_id):
    nastavnik = dict(flask.request.json)
    nastavnik["nastavnik_licni_id"] = nastavnik_licni_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE nastavnik SET licni_id=%(licni_id)s, ime=%(ime)s, prezime=%(prezime)s, email=%(email)s, br_telefona=%(br_telefona)s WHERE licni_id=%(nastavnik_licni_id)s", nastavnik)
    db.commit()
    cursor.execute("SELECT * FROM nastavnik WHERE licni_id=%s", (nastavnik_licni_id, ))
    nastavnik = cursor.fetchone()
    return flask.jsonify(nastavnik)


##Predmet
@app.route("/api/predmeti")
def getAllPredmet():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet")
    predmet = cursor.fetchall()
    return flask.jsonify(predmet)
########
@app.route("/api/predmeti/<string:predmet_id>")
def getPredmet(predmet_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmet_id,))
    predmet = cursor.fetchone()
    if predmet is not None:
        return flask.jsonify(predmet)

    return "", 404
# # #################################


@app.route("/api/predmeti", methods=["POST"])
def dodajPredmet():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO predmet(id, ime_predmeta, razred) VALUES (%(id)s, %(ime_predmeta)s, %(razred)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/predmeti/<string:predmet_id>", methods=["DELETE"])
def ukloniPredmet(predmet_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM predmet WHERE id=%s", (predmet_id, ))
    db.commit()
    return ""

@app.route("/api/predmeti/<string:predmet_id>", methods=["PUT"])
def izmeniPredmet(predmet_id):
    predmet = dict(flask.request.json)
    predmet["predmet_id"] = predmet_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE predmet SET id=%(id)s, ime_predmeta=%(ime_predmeta)s, razred=%(razred)s WHERE id=%(predmet_id)s", predmet)
    db.commit()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmet_id, ))
    predmet = cursor.fetchone()
    return flask.jsonify(predmet)




##Skola
@app.route("/api/skole")
def getAllSkola():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM skola")
    skola = cursor.fetchall()
    return flask.jsonify(skola)
########
@app.route("/api/skole/<int:skola_id>")
def getSkola(skola_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM skola WHERE id=%s", (skola_id,))
    skola = cursor.fetchone()
    if skola is not None:
        return flask.jsonify(skola)

    return "", 404
# # #################################


@app.route("/api/skole", methods=["POST"])
def dodajSkolu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO skola(id, ime_skole, adresa, nastavnik_licni_id, predmet_id) VALUES (%(id)s, %(ime_skole)s, %(adresa)s, %(nastavnik_licni_id)s, %(predmet_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/skole/<int:skole_id>", methods=["DELETE"])
def ukloniSkolu(skole_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM skola WHERE id=%s", (skole_id, ))
    db.commit()
    return ""

@app.route("/api/skole/<int:skole_id>", methods=["PUT"])
def izmeniSkolu(skole_id):
    skola = dict(flask.request.json)
    skola["skole_id"] = skole_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE skola SET id=%(id)s, ime_skole=%(ime_skole)s, adresa=%(adresa)s, nastavnik_licni_id=%(nastavnik_licni_id)s, predmet_id=%(predmet_id)s WHERE id=%(skole_id)s", skola)
    db.commit()
    cursor.execute("SELECT * FROM skola WHERE id=%s", (skole_id, ))
    skola = cursor.fetchone()
    return flask.jsonify(skola)



if __name__ == "__main__":
    app.run()
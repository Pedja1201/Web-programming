import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

#TODO: Uradjeno sa componentama!!!


app = Flask(__name__, static_url_path="")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "skola"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("nastavnik.html")


@app.route("/api/nastavnici")
def getAllNastavnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nastavnik")
    nastavnik = cursor.fetchall()
    return flask.jsonify(nastavnik)

########Prikaz liste###########
@app.route("/api/nastavnici/<int:nastavnici_licni_id>")
def getKupac(nastavnici_licni_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nastavnik WHERE licni_id=%s", (nastavnici_licni_id,))
    nastavnik=cursor.fetchone()
    if nastavnik is not None:
        return flask.jsonify(nastavnik)

    return "", 404

# #################################

@app.route("/api/nastavnici", methods=["POST"])
def dodajNastavnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO nastavnik(licni_id, ime, prezime, email, br_telefona) VALUES (%(licni_id)s, %(ime)s, %(prezime)s, %(email)s, %(br_telefona)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/nastavnici/<int:nastavnici_licni_id>", methods=["DELETE"])
def ukloniNastavnika(nastavnici_licni_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM nastavnik WHERE licni_id=%s", (nastavnici_licni_id, ))
    db.commit()
    return ""

@app.route("/api/nastavnici/<int:nastavnici_licni_id>", methods=["PUT"])
def izmeniNastavnika(nastavnici_licni_id):
    nastavnik = dict(flask.request.json)
    nastavnik["nastavnici_licni_id"] = nastavnici_licni_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE nastavnik SET licni_id=%(licni_id)s, ime=%(ime)s, prezime=%(prezime)s, email=%(email)s, br_telefona=%(br_telefona)s WHERE licni_id=%(licni_id)s", nastavnik)
    db.commit()
    cursor.execute("SELECT * FROM nastavnik WHERE licni_id=%s", (nastavnici_licni_id, ))
    nastavnik = cursor.fetchone()
    return flask.jsonify(nastavnik)



#Predmet
@app.route("/predmet")
def predmet():
    return app.send_static_file("predmet.html")


@app.route("/api/predmeti")
def getAllPredmeti():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet")
    predmet = cursor.fetchall()
    return flask.jsonify(predmet)

# ########Prikaz liste###########
@app.route("/api/predmeti/<string:predmeti_id>")
def getPredmet(predmeti_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmeti_id,))
    predmet=cursor.fetchone()
    if predmet is not None:
        return flask.jsonify(predmet)
    
    return "", 404
# #################################

@app.route("/api/predmeti", methods=["POST"])
def dodajPredmet():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO predmet(id, ime_predmeta, razred) VALUES (%(id)s, %(ime_predmeta)s, %(razred)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/predmeti/<string:predmeti_id>", methods=["DELETE"])
def ukloniPredmet(predmeti_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM predmet WHERE id=%s", (predmeti_id, ))
    db.commit()
    return ""

@app.route("/api/predmeti/<string:predmeti_id>", methods=["PUT"])
def izmeniPredmet(predmeti_id):
    predmet = dict(flask.request.json)
    predmet["predmeti_id"] = predmeti_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE predmet SET id=%(id)s, ime_predmeta=%(ime_predmeta)s, razred=%(razred)s  WHERE id=%(id)s", predmet)
    db.commit()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmeti_id, ))
    predmet = cursor.fetchone()
    return flask.jsonify(predmet)


##Skola####
@app.route("/skola")
def skola():
    return app.send_static_file("skola.html")


@app.route("/api/skole")
def getAllSkole():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM skola")
    skola = cursor.fetchall()
    return flask.jsonify(skola)

# ########Prikaz liste###########
@app.route("/api/skole/<int:skola_id>")
def getSkola(skola_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM skola WHERE id=%s", (skola_id,))
    skola=cursor.fetchone()
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

@app.route("/api/skole/<int:skola_id>", methods=["DELETE"])
def ukloniSkolu(skola_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM skola WHERE id=%s", (skola_id, ))
    db.commit()
    return ""

@app.route("/api/skole/<int:skola_id>", methods=["PUT"])
def izmenaSkole(skola_id):
    skola = dict(flask.request.json)
    skola["skola_id"] = skola_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE skola SET id=%(id)s, ime_skole=%(ime_skole)s, adresa=%(adresa)s, nastavnik_licni_id=%(nastavnik_licni_id)s, predmet_id=%(predmet_id)s WHERE id=%(id)s", skola)
    db.commit()
    cursor.execute("SELECT * FROM skola WHERE id=%s", (skola_id, ))
    skola = cursor.fetchone()
    return flask.jsonify(skola)




if __name__ == "__main__":
    app.run()
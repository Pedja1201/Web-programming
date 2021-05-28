import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "prodaja"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("index.html")

#Turisti
@app.route("/api/turisti")
def getAllTuriste():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM turista")
    turista = cursor.fetchall()
    for t in turista:
        t["maticni_broj"] = float(t["maticni_broj"])
    return flask.jsonify(turista)
    
########
@app.route("/api/turisti/<int:turista_id>")
def getTurista(turista_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM turista WHERE id=%s", (turista_id,))
    turista = cursor.fetchone()
    if turista is not None:
        turista["maticni_broj"] = float(turista["maticni_broj"])
        return flask.jsonify(turista)

    return "", 404
# #################################


@app.route("/api/turisti", methods=["POST"])
def dodajTuristu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO turista(ime, prezime, datum_rodjenja, maticni_broj) VALUES (%(ime)s, %(prezime)s, %(datum_rodjenja)s, %(maticni_broj)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/turisti/<int:turista_id>", methods=["DELETE"])
def ukloniTuristu(turista_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM turista WHERE id=%s", (turista_id, ))
    db.commit()
    return ""

@app.route("/api/turisti/<int:turista_id>", methods=["PUT"])
def izmeniTuristu(turista_id):
    turista = dict(flask.request.json)
    turista["turista_id"] = turista_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE turista SET ime=%(ime)s, prezime=%(prezime)s, datum_rodjenja=%(datum_rodjenja)s, maticni_broj=%(maticni_broj)s WHERE id=%(turista_id)s", turista)
    db.commit()
    cursor.execute("SELECT * FROM turista WHERE id=%s", (turista_id, ))
    turista = cursor.fetchone()
    turista["maticni_broj"] = float(turista["maticni_broj"])
    return flask.jsonify(turista)

##Aranzman
@app.route("/api/aranzmani")
def getAllAranzman():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM aranzman")
    aranzman = cursor.fetchall()
    for a in aranzman:
        a["cena"] = float(a["cena"])
    return flask.jsonify(aranzman)
    
########
@app.route("/api/aranzmani/<int:aranzman_id>")
def getAranzman(aranzman_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM aranzman WHERE id=%s", (aranzman_id,))
    aranzman = cursor.fetchone()
    if aranzman is not None:
        aranzman["cena"] = float(aranzman["cena"])
        return flask.jsonify(aranzman)

    return "", 404
# #################################


@app.route("/api/aranzmani", methods=["POST"])
def dodajAranzman():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO aranzman(naziv, cena, datum_polaska, broj_dana) VALUES (%(naziv)s, %(cena)s, %(datum_polaska)s, %(broj_dana)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/aranzmani/<int:aranzman_id>", methods=["DELETE"])
def ukloniAranzman(aranzman_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM aranzman WHERE id=%s", (aranzman_id, ))
    db.commit()
    return ""

@app.route("/api/aranzmani/<int:aranzman_id>", methods=["PUT"])
def izmeniAranzman(aranzman_id):
    aranzman = dict(flask.request.json)
    aranzman["aranzman_id"] = aranzman_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE aranzman SET naziv=%(naziv)s, cena=%(cena)s, datum_polaska=%(datum_polaska)s, broj_dana=%(broj_dana)s WHERE id=%(aranzman_id)s", aranzman)
    db.commit()
    cursor.execute("SELECT * FROM aranzman WHERE id=%s", (aranzman_id, ))
    aranzman = cursor.fetchone()
    aranzman["cena"] = float(aranzman["cena"])
    return flask.jsonify(aranzman)


###Prodaja
@app.route("/api/prodaje")
def getAllProdaja():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM prodaja")
    prodaja = cursor.fetchall()
    return flask.jsonify(prodaja)
    
########
@app.route("/api/prodaje/<int:prodaja_id>")
def getProdaja(prodaja_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM prodaja WHERE id=%s", (prodaja_id,))
    prodaja = cursor.fetchone()
    if prodaja is not None:
        return flask.jsonify(prodaja)

    return "", 404
# #################################


@app.route("/api/prodaje", methods=["POST"])
def dodajProdaju():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO prodaja(aranzman_id, turista_id, nacin_placanja, datum_placanja) VALUES (%(aranzman_id)s, %(turista_id)s, %(nacin_placanja)s, %(datum_placanja)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/prodaje/<int:prodaja_id>", methods=["DELETE"])
def ukloniProdaju(prodaja_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM prodaja WHERE id=%s", (prodaja_id, ))
    db.commit()
    return ""

@app.route("/api/prodaje/<int:prodaja_id>", methods=["PUT"])
def izmeniProdaju(prodaja_id):
    prodaja = dict(flask.request.json)
    prodaja["prodaja_id"] = prodaja_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE prodaja SET aranzman_id=%(aranzman_id)s, turista_id=%(turista_id)s, nacin_placanja=%(nacin_placanja)s, datum_placanja=%(datum_placanja)s WHERE id=%(prodaja_id)s", prodaja)
    db.commit()
    cursor.execute("SELECT * FROM prodaja WHERE id=%s", (prodaja_id, ))
    prodaja = cursor.fetchone()
    return flask.jsonify(prodaja)




if __name__ == "__main__":
    app.run()
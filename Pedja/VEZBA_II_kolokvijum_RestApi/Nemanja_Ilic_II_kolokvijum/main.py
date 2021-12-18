import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


###TODO:Vezba II kolokvijum


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "root"
app.config["MYSQL_DATABASE_DB"] = "video_igre"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)



@app.route("/")
def home():
    return app.send_static_file("index.html")

#Korisnik
@app.route("/api/korisnici")
def getAllKorisnik():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.jsonify(korisnik)
    
########
@app.route("/api/korisnici/<int:korisnik_id>")
def getKorisnik(korisnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
    korisnik = cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)

    return "", 404
# #################################


@app.route("/api/korisnici", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(korisnicko_ime, ime, prezime) VALUES (%(korisnicko_ime)s, %(ime)s, %(prezime)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/korisnici/<int:korisnik_id>", methods=["DELETE"])
def ukloniKorisnika(korisnik_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE id=%s", (korisnik_id, ))
    db.commit()
    return ""

@app.route("/api/korisnici/<int:korisnik_id>", methods=["PUT"])
def izmeniKorisnika(korisnik_id):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_id"] = korisnik_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET korisnicko_ime=%(korisnicko_ime)s, ime=%(ime)s, prezime=%(prezime)s WHERE id=%(korisnik_id)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)

##VIgra
@app.route("/api/videoIgre")
def getAllIgre():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM video_igra")
    igra = cursor.fetchall()
    return flask.jsonify(igra)
    
########
@app.route("/api/videoIgre/<int:video_igra_id>")
def getIgra(video_igra_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM video_igra WHERE id=%s", (video_igra_id,))
    igra = cursor.fetchone()
    if igra is not None:
        return flask.jsonify(igra)

    return "", 404
# #################################


@app.route("/api/videoIgre", methods=["POST"])
def dodajIgru():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO video_igra(naziv, zanr) VALUES (%(naziv)s, %(zanr)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/videoIgre/<int:video_igra_id>", methods=["DELETE"])
def ukloniIgru(video_igra_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM video_igra WHERE id=%s", (video_igra_id, ))
    db.commit()
    return ""

@app.route("/api/videoIgre/<int:video_igra_id>", methods=["PUT"])
def izmeniIgru(video_igra_id):
    igra = dict(flask.request.json)
    igra["video_igra_id"] = video_igra_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE video_igra SET naziv=%(naziv)s, zanr=%(zanr)s WHERE id=%(video_igra_id)s", igra)
    db.commit()
    cursor.execute("SELECT * FROM video_igra WHERE id=%s", (video_igra_id, ))
    igra = cursor.fetchone()
    return flask.jsonify(igra)


###Korpa
@app.route("/api/korpa")
def getAllKorpa():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa")
    korpa = cursor.fetchall()
    for i in korpa:
        i["cena"] = float(i["cena"])
        i["ocena"] = float(i["ocena"])
    return flask.jsonify(korpa)
    
########
@app.route("/api/korpa/<int:korpa_id>")
def getKorpa(korpa_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id,))
    korpa_id = cursor.fetchone()
    if korpa_id is not None:
        korpa_id["cena"] = float(korpa_id["cena"])
        korpa_id["ocena"] = float(korpa_id["ocena"])
        return flask.jsonify(korpa_id)

    return "", 404
# #################################


@app.route("/api/korpa", methods=["POST"])
def dodajKorpu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korpa(korisnik_id, video_igra_id, datum_kupovine, cena, ocena) VALUES (%(korisnik_id)s, %(video_igra_id)s, %(datum_kupovine)s, %(cena)s, %(ocena)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/korpa/<int:korpa_id>", methods=["DELETE"])
def ukloniKorpu(korpa_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korpa WHERE id=%s", (korpa_id, ))
    db.commit()
    return ""

@app.route("/api/korpa/<int:korpa_id>", methods=["PUT"])
def izmeniKorpa(korpa_id):
    korpa = dict(flask.request.json)
    korpa["korpa_id"] = korpa_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korpa SET korisnik_id=%(korisnik_id)s, video_igra_id=%(video_igra_id)s, datum_kupovine=%(datum_kupovine)s, cena=%(cena)s, ocena=%(ocena)s WHERE id=%(korpa_id)s", korpa)
    db.commit()
    cursor.execute("SELECT * FROM korpa WHERE id=%s", (korpa_id, ))
    korpa = cursor.fetchone()
    korpa["cena"] = float(korpa["cena"])
    korpa["ocena"] = float(korpa["ocena"])
    return flask.jsonify(korpa)

if __name__ == "__main__":
    app.run()
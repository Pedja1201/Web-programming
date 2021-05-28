import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


###TODO:Vezba II kolokvijum


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "knjizara"


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

##Knjiga
@app.route("/api/knjige")
def getAllKnjige():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM knjiga")
    knjiga = cursor.fetchall()
    return flask.jsonify(knjiga)
    
########
@app.route("/api/knjige/<int:knjiga_id>")
def getKnjiga(knjiga_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM knjiga WHERE id=%s", (knjiga_id,))
    knjiga = cursor.fetchone()
    if knjiga is not None:
        return flask.jsonify(knjiga)

    return "", 404
# #################################


@app.route("/api/knjige", methods=["POST"])
def dodajKnjigu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO knjiga(naslov, autor) VALUES (%(naslov)s, %(autor)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/knjige/<int:knjiga_id>", methods=["DELETE"])
def ukloniKnjigu(knjiga_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM knjiga WHERE id=%s", (knjiga_id, ))
    db.commit()
    return ""

@app.route("/api/knjige/<int:knjiga_id>", methods=["PUT"])
def izmeniKnjigu(knjiga_id):
    knjiga = dict(flask.request.json)
    knjiga["knjiga_id"] = knjiga_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE knjiga SET naslov=%(naslov)s, autor=%(autor)s WHERE id=%(knjiga_id)s", knjiga)
    db.commit()
    cursor.execute("SELECT * FROM knjiga WHERE id=%s", (knjiga_id, ))
    knjiga = cursor.fetchone()
    return flask.jsonify(knjiga)


###Iznajmljivanje
@app.route("/api/iznajmljivanja")
def getAllIznajmljivanje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM iznajmljivanje")
    iznajmljivanje = cursor.fetchall()
    for i in iznajmljivanje:
        i["cena"] = float(i["cena"])
    return flask.jsonify(iznajmljivanje)
    
########
@app.route("/api/iznajmljivanja/<int:iznajmljivanje_id>")
def getIznajmljivanje(iznajmljivanje_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM iznajmljivanje WHERE id=%s", (iznajmljivanje_id,))
    iznajmljivanje = cursor.fetchone()
    if iznajmljivanje is not None:
        iznajmljivanje["cena"] = float(iznajmljivanje["cena"])
        return flask.jsonify(iznajmljivanje)

    return "", 404
# #################################


@app.route("/api/iznajmljivanja", methods=["POST"])
def dodajIznajmljivanje():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO iznajmljivanje(korisnik_id, knjiga_id, datum_iznajmljivanja, rok_vracanja, datum_vracanja, cena) VALUES (%(korisnik_id)s, %(knjiga_id)s, %(datum_iznajmljivanja)s, %(rok_vracanja)s, %(datum_vracanja)s, %(cena)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/iznajmljivanja/<int:iznajmljivanje_id>", methods=["DELETE"])
def ukloniIznajmljivanje(iznajmljivanje_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM iznajmljivanje WHERE id=%s", (iznajmljivanje_id, ))
    db.commit()
    return ""

@app.route("/api/iznajmljivanja/<int:iznajmljivanje_id>", methods=["PUT"])
def izmeniIznamljivanje(iznajmljivanje_id):
    iznajmljivanje = dict(flask.request.json)
    iznajmljivanje["iznajmljivanje_id"] = iznajmljivanje_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE iznajmljivanje SET korisnik_id=%(korisnik_id)s, knjiga_id=%(knjiga_id)s, datum_iznajmljivanja=%(datum_iznajmljivanja)s, rok_vracanja=%(rok_vracanja)s, datum_vracanja=%(datum_vracanja)s, cena=%(cena)s WHERE id=%(iznajmljivanje_id)s", iznajmljivanje)
    db.commit()
    cursor.execute("SELECT * FROM iznajmljivanje WHERE id=%s", (iznajmljivanje_id, ))
    iznajmljivanje = cursor.fetchone()
    iznajmljivanje["cena"] = float(iznajmljivanje["cena"])
    return flask.jsonify(iznajmljivanje)

if __name__ == "__main__":
    app.run()
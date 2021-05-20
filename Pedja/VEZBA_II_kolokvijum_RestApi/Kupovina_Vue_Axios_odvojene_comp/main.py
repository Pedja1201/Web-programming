import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql

#TODO:Zavrsi do kraja!!!!
app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "net_shoping"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

#Auto
@app.route("/")
def home():
    return app.send_static_file("auto.html")

#KUPAC!!!!
@app.route("/api/auto")
def getAllAuto():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM auto")
    auto = cursor.fetchall()
    return flask.jsonify(auto)

########Prikaz liste###########
@app.route("/api/auto/<string:auto_tablice>")
def getAuto(auto_tablice):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM auto WHERE tablice=%s", (auto_tablice,))
    auto=cursor.fetchone()
    if auto is not None:
        return flask.jsonify(auto)

    return "", 404

#################################


@app.route("/api/auto", methods=["POST"])
def dodajAuto():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO auto(tablice, marka, model, godiste) VALUES (%(tablice)s, %(marka)s, %(model)s, %(godiste)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/auto/<string:auto_tablice>", methods=["DELETE"])
def ukloniAuto(auto_tablice):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM auto WHERE tablice=%s", (auto_tablice, ))
    db.commit()
    return ""


@app.route("/api/auto/<string:auto_tablice>", methods=["PUT"])
def izmeniAuto(auto_tablice):
    auto = dict(flask.request.json)
    auto["auto_tablice"] = auto_tablice
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE auto SET tablice=%(tablice)s, marka=%(marka)s, model=%(model)s, godiste=%(godiste)s WHERE tablice=%(auto_tablice)s", auto)
    db.commit()
    cursor.execute("SELECT * FROM auto WHERE tablice=%s", (auto_tablice, ))
    auto = cursor.fetchone()
    return flask.jsonify(auto)


#NIKE
@app.route("/nike")
def nike():
    return app.send_static_file("nike.html")


@app.route("/api/nike")
def getAllNike():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nike")
    nike = cursor.fetchall()
    return flask.jsonify(nike)

########Prikaz liste###########
@app.route("/api/nke/<int:nike_id>")
def getNike(nike_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nike WHERE id=%s", (nike_id,))
    nike=cursor.fetchone()
    if nike is not None:
        return flask.jsonify(nike)

    return "", 404

#################################


@app.route("/api/nike", methods=["POST"])
def dodajNike():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO nike(odeca, obuca, velicina) VALUES (%(odeca)s, %(obuca)s, %(velicina)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/nike/<int:nike_id>", methods=["DELETE"])
def ukloniNike(nike_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM nike WHERE id=%s", (nike_id, ))
    db.commit()
    return ""


@app.route("/api/nike/<int:nike_id>", methods=["PUT"])
def izmeniNike(nike_id):
    nike = dict(flask.request.json)
    nike["nike_id"] = nike_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE nike SET id=%(id)s, odeca=%(odeca)s, obuca=%(obuca)s, velicina=%(velicina)s WHERE id=%(nike_id)s", nike)
    db.commit()
    cursor.execute("SELECT * FROM nike WHERE id=%s", (nike_id, ))
    nike = cursor.fetchone()
    return flask.jsonify(nike)

##Korisnik
@app.route("/korisnik")
def korisnik():
    return app.send_static_file("korisnik.html")


@app.route("/api/korisnici")
def getAllKorisnik():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.jsonify(korisnik)

########Prikaz liste###########
@app.route("/api/korisnici/<int:korisnik_id>")
def getKorisnik(korisnik_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id,))
    korisnik = cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)

    return "", 404

#################################


@app.route("/api/korisnici", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(ime, prezime, zanimanje, nike_id, auto_tablice) VALUES (%(ime)s, %(prezime)s, %(zanimanje)s, %(nike_id)s, %(auto_tablice)s)", flask.request.json)
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
    cursor.execute("UPDATE korisnik SET id=%(id)s, ime=%(ime)s, prezime=%(prezime)s, zanimanje=%(zanimanje)s, nike_id=%(nike_id)s, auto_tablice=%(auto_tablice)s WHERE id=%(korisnik_id)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", (korisnik_id, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)


if __name__ == "__main__":
    app.run()
import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_DB"] = "rezervacije"


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


##Hotel
@app.route("/hotel")
def hotel():
    return app.send_static_file("hotel.html")

@app.route("/api/hoteli")
def getAllHotel():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM hotel")
    hotel = cursor.fetchall()
    return flask.jsonify(hotel)
    
########
@app.route("/api/hoteli/<int:hotel_id>")
def gethotel(hotel_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM hotel WHERE id=%s", (hotel_id,))
    hotel = cursor.fetchone()
    if hotel is not None:
        return flask.jsonify(hotel)

    return "", 404
# #################################


@app.route("/api/hoteli", methods=["POST"])
def dodajHotel():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO hotel(naziv, adresa) VALUES (%(naziv)s, %(adresa)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/hoteli/<int:hotel_id>", methods=["DELETE"])
def ukloniHotel(hotel_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM hotel WHERE id=%s", (hotel_id, ))
    db.commit()
    return ""


@app.route("/api/hoteli/<int:hotel_id>", methods=["PUT"])
def izmeniHotel(hotel_id):
    hotel = dict(flask.request.json)
    hotel["hotel_id"] = hotel_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE hotel SET naziv=%(naziv)s, adresa=%(adresa)s WHERE id=%(hotel_id)s", hotel)
    db.commit()
    cursor.execute("SELECT * FROM hotel WHERE id=%s", (hotel_id, ))
    hotel = cursor.fetchone()
    return flask.jsonify(hotel)




@app.route("/rezervacija")
def rezervacija():
    return app.send_static_file("rezervacija.html")

@app.route("/api/rezervacije")
def getAllRezervacije():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM rezervacija")
    rezervacija = cursor.fetchall()
    for r in rezervacija:  ###Decimal
        r["cena"] = float(r["cena"])
    return flask.jsonify(rezervacija)
    
@app.route("/api/rezervacije/<int:rezervacija_id>")
def getRezervacija(rezervacija_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM rezervacija WHERE id=%s", (rezervacija_id,))
    rezervacija = cursor.fetchone()
    if rezervacija is not None:
        rezervacija["cena"] = float(rezervacija["cena"])  
        return flask.jsonify(rezervacija)

    return "", 404


@app.route("/api/rezervacije", methods=["POST"])
def dodajRezervaciju():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO rezervacija(korisnik_id, hotel_id, datum_rezervacije, rok, datum_odlaska, cena) VALUES (%(korisnik_id)s, %(hotel_id)s, %(datum_rezervacije)s, %(rok)s, %(datum_odlaska)s, %(cena)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/rezervacije/<int:rezervacija_id>", methods=["DELETE"])
def ukloniRezervaciju(rezervacija_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM rezervacija WHERE id=%s", (rezervacija_id, ))
    db.commit()
    return ""


@app.route("/api/rezervacije/<int:rezervacija_id>", methods=["PUT"])
def izmeniIznajmljivanje(rezervacija_id):
    rezervacija = dict(flask.request.json)
    rezervacija["rezervacija_id"] = rezervacija_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE rezervacija SET korisnik_id=%(korisnik_id)s, hotel_id=%(hotel_id)s, datum_rezervacije=%(datum_rezervacije)s, rok=%(rok)s, datum_odlaska=%(datum_odlaska)s, cena=%(cena)s WHERE id=%(rezervacija_id)s", rezervacija)
    db.commit()
    cursor.execute("SELECT * FROM rezervacija WHERE id=%s", (rezervacija_id, ))
    rezervacija = cursor.fetchone()
    rezervacija["cena"] = float(rezervacija["cena"])  
    return flask.jsonify(rezervacija)



if __name__ == "__main__":
    app.run()
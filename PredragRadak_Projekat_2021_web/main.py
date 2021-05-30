import flask
from flask import Flask

# import korisnik
# import kupac
# import knjiga

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql



app = Flask(__name__, static_url_path="/")


###TODO: Uradi rutiranje componenti
####Probaj da razdvojis scripte
###Poradi na izgledu-Bootstrap


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "prodaja_knjiga"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)


#######Pocetna strana
@app.route("/")
def home():
    return app.send_static_file("index.html")

#KORISNIK
@app.route("/api/korisnici")
def getAllKorisnici():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    korisnik = cursor.fetchall()
    return flask.jsonify(korisnik)
########Prikaz liste###########
@app.route("/api/korisnici/<int:korisnik_IDKorisnik>")
def getKorisnik(korisnik_IDKorisnik):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik,))
    korisnik=cursor.fetchone()
    if korisnik is not None:
        return flask.jsonify(korisnik)
    return "", 404
#################################
@app.route("/api/korisnici", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(ime, email, lozinka) VALUES (%(ime)s, %(email)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/korisnici/<int:korisnik_IDKorisnik>", methods=["DELETE"])
def ukloniKorisnika(korisnik_IDKorisnik):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik, ))
    db.commit()
    return ""

@app.route("/api/korisnici/<int:korisnik_IDKorisnik>", methods=["PUT"])
def izmeniKorisnika(korisnik_IDKorisnik):
    korisnik = dict(flask.request.json)
    korisnik["korisnik_IDKorisnik"] = korisnik_IDKorisnik
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE korisnik SET ime=%(ime)s, email=%(email)s, lozinka=%(lozinka)s WHERE IDKorisnik=%(korisnik_IDKorisnik)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)


####Kupac
@app.route("/api/kupci")
def getAllKupci():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac")
    kupac = cursor.fetchall()
    return flask.jsonify(kupac)
########Prikaz liste###########
@app.route("/api/kupci/<int:kupac_IDKupac>")
def getKupac(kupac_IDKupac):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac WHERE IDKupac=%s", (kupac_IDKupac,))
    kupac=cursor.fetchone()
    if kupac is not None:
        return flask.jsonify(kupac)
    return "", 404
#################################
@app.route("/api/kupci", methods=["POST"])
def dodajKupca():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupac(ime, prezime, datumRodjenja, email, telefon, mesto, adresa) VALUES (%(ime)s, %(prezime)s, %(datumRodjenja)s, %(email)s, %(telefon)s, %(mesto)s, %(adresa)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/kupci/<int:kupac_IDKupac>", methods=["DELETE"])
def ukloniKupca(kupac_IDKupac):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM kupac WHERE IDKupac=%s", (kupac_IDKupac, ))
    db.commit()
    return ""

@app.route("/api/kupci/<int:kupac_IDKupac>", methods=["PUT"])
def izmeniKupca(kupac_IDKupac):
    kupac = dict(flask.request.json)
    kupac["kupac_IDKupac"] = kupac_IDKupac
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE kupac SET ime=%(ime)s, prezime=%(prezime)s, datumRodjenja=%(datumRodjenja)s, email=%(email)s, telefon=%(telefon)s, mesto=%(mesto)s, adresa=%(adresa)s WHERE IDKupac=%(kupac_IDKupac)s", kupac)
    db.commit()
    cursor.execute("SELECT * FROM kupac WHERE IDKupac=%s", (kupac_IDKupac, ))
    kupac = cursor.fetchone()
    return flask.jsonify(kupac)


##########Knjiga
@app.route("/api/knjige")
def getAllKnjige():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM knjiga")
    knjiga = cursor.fetchall()
    for k in knjiga:
        k["cena"] = float(k["cena"])
    return flask.jsonify(knjiga)
 ########Prikaz liste###########
@app.route("/api/knjige/<int:knjiga_IDKnjiga>")
def getKnjiga(knjiga_IDKnjiga):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM knjiga WHERE IDKnjiga=%s", (knjiga_IDKnjiga,))
    knjiga = cursor.fetchone()
    if knjiga is not None:
        knjiga["cena"] = float(knjiga["cena"])
        return flask.jsonify(knjiga)
    return "", 404
#################################
@app.route("/api/knjige", methods=["POST"])
def dodajKnjige():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO knjiga(naziv, autor, kategorija, cena, stanje, biblioteka_id) VALUES (%(naziv)s, %(autor)s, %(kategorija)s, %(cena)s, %(stanje)s, %(biblioteka_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/knjige/<int:knjiga_IDKnjiga>", methods=["DELETE"])
def ukloniKnjigu(knjiga_IDKnjiga):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM knjiga WHERE IDKnjiga=%s", (knjiga_IDKnjiga, ))
    db.commit()
    return ""

@app.route("/api/knjige/<int:knjiga_IDKnjiga>", methods=["PUT"])
def izmeniKnjigu(knjiga_IDKnjiga):
    knjiga = dict(flask.request.json)
    knjiga["knjiga_IDKnjiga"] = knjiga_IDKnjiga
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE knjiga SET naziv=%(naziv)s, autor=%(autor)s, kategorija=%(kategorija)s, cena=%(cena)s, stanje=%(stanje)s, biblioteka_id=%(biblioteka_id)s WHERE IDKnjiga=%(knjiga_IDKnjiga)s", knjiga)
    db.commit()
    cursor.execute("SELECT * FROM knjiga WHERE IDKnjiga=%s", (knjiga_IDKnjiga, ))
    knjiga = cursor.fetchone()
    knjiga["cena"] = float(knjiga["cena"]) ###Decimal u bazi!!!
    return flask.jsonify(knjiga)

####Biblioteka
@app.route("/api/biblioteke")
def getAllBiblioteka():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM biblioteka")
    biblioteka = cursor.fetchall()
    return flask.jsonify(biblioteka)
 ########Prikaz liste###########
@app.route("/api/biblioteke/<int:biblioteka_id>")
def getBiblioteka(biblioteka_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM biblioteka WHERE id=%s", (biblioteka_id,))
    biblioteka = cursor.fetchone()
    if biblioteka is not None:
        return flask.jsonify(biblioteka)
    return "", 404
#################################
@app.route("/api/biblioteke", methods=["POST"])
def dodajBiblioteku():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO biblioteka(naziv, adresa, telefon, email) VALUES (%(naziv)s, %(adresa)s, %(telefon)s, %(email)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/biblioteke/<int:biblioteka_id>", methods=["DELETE"])
def ukloniBiblioteku(biblioteka_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM biblioteka WHERE id=%s", (biblioteka_id, ))
    db.commit()
    return ""

@app.route("/api/biblioteke/<int:biblioteka_id>", methods=["PUT"])
def izmeniBiblioteku(biblioteka_id):
    biblioteka = dict(flask.request.json)
    biblioteka["biblioteka_id"] = biblioteka_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE biblioteka SET naziv=%(naziv)s, adresa=%(adresa)s, telefon=%(telefon)s, email=%(email)s WHERE id=%(biblioteka_id)s", biblioteka)
    db.commit()
    cursor.execute("SELECT * FROM biblioteka WHERE id=%s", (biblioteka_id, ))
    biblioteka = cursor.fetchone()
    return flask.jsonify(biblioteka)



######Porudzbina
@app.route("/api/porudzbine")
def getAllPorudzbine():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM porudzbina")
    poruceno = cursor.fetchall()
    return flask.jsonify(poruceno)
########Prikaz liste###########
@app.route("/api/porudzbine/<int:porudzbina_IDPorudzbina>")
def getPorudzbina(porudzbina_IDPorudzbina):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM porudzbina WHERE IDPorudzbina=%s", (porudzbina_IDPorudzbina,))
    poruceno=cursor.fetchone()
    if poruceno is not None:
        return flask.jsonify(poruceno)
    return "", 404
#################################
@app.route("/api/porudzbine", methods=["POST"])
def dodajPorudzbinu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO porudzbina(IDKnjiga, IDKupac, kolicina, nacinPlacanja, valuta, datumPorudzbine) VALUES (%(IDKnjiga)s, %(IDKupac)s, %(kolicina)s, %(nacinPlacanja)s, %(valuta)s, %(datumPorudzbine)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/porudzbine/<int:porudzbina_IDPorudzbina>", methods=["DELETE"])
def ukloniPorudzbinu(porudzbina_IDPorudzbina):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM porudzbina WHERE IDPorudzbina=%s", (porudzbina_IDPorudzbina, ))
    db.commit()
    return ""

@app.route("/api/porudzbine/<int:porudzbina_IDPorudzbina>", methods=["PUT"])
def izmeniPorudzbinu(porudzbina_IDPorudzbina):
    poruceno = dict(flask.request.json)
    poruceno["porudzbina_IDPorudzbina"] = porudzbina_IDPorudzbina
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE porudzbina SET IDKnjiga=%(IDKnjiga)s, IDKupac=%(IDKupac)s, kolicina=%(kolicina)s, nacinPlacanja=%(nacinPlacanja)s, valuta=%(valuta)s, datumPorudzbine=%(datumPorudzbine)s WHERE IDPorudzbina=%(porudzbina_IDPorudzbina)s", poruceno)
    db.commit()
    cursor.execute("SELECT * FROM porudzbina WHERE IDPorudzbina=%s", (porudzbina_IDPorudzbina, ))
    poruceno = cursor.fetchone()
    return flask.jsonify(poruceno)



#####Iznajmljivanje
@app.route("/api/iznajmljivanje")
def getAllIznajmljivanje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM iznajmljivanje")
    iznajmiti = cursor.fetchall()
    return flask.jsonify(iznajmiti)
########Prikaz liste###########
@app.route("/api/iznajmljivanje/<int:iznajmljivanje_IDIznajmljivanje>")
def getIznajmljivanje(iznajmljivanje_IDIznajmljivanje):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM iznajmljivanje WHERE IDIznajmljivanje=%s", (iznajmljivanje_IDIznajmljivanje,))
    iznajmiti=cursor.fetchone()
    if iznajmiti is not None:
        return flask.jsonify(iznajmiti)
    return "", 404
#################################
@app.route("/api/iznajmljivanje", methods=["POST"])
def dodajIznajmljivanje():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO iznajmljivanje(IDKupac, IDKnjiga, kolicina, nacinPlacanja, valuta, periodIznajmljivanja, datumPorudzbine) VALUES (%(IDKupac)s, %(IDKnjiga)s, %(kolicina)s, %(nacinPlacanja)s, %(valuta)s, %(periodIznajmljivanja)s, %(datumPorudzbine)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/iznajmljivanje/<int:iznajmljivanje_IDIznajmljivanje>", methods=["DELETE"])
def ukloniIznajmljivanje(iznajmljivanje_IDIznajmljivanje):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM iznajmljivanje WHERE IDIznajmljivanje=%s", (iznajmljivanje_IDIznajmljivanje, ))
    db.commit()
    return ""

@app.route("/api/iznajmljivanje/<int:iznajmljivanje_IDIznajmljivanje>", methods=["PUT"])
def izmeniIznajmljivanje(iznajmljivanje_IDIznajmljivanje):
    iznajmiti = dict(flask.request.json)
    iznajmiti["iznajmljivanje_IDIznajmljivanje"] = iznajmljivanje_IDIznajmljivanje
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE iznajmljivanje SET IDKupac=%(IDKupac)s, IDKnjiga=%(IDKnjiga)s, kolicina=%(kolicina)s, nacinPlacanja=%(nacinPlacanja)s, valuta=%(valuta)s, periodIznajmljivanja=%(periodIznajmljivanja)s, datumPorudzbine=%(datumPorudzbine)s WHERE IDIznajmljivanje=%(iznajmljivanje_IDIznajmljivanje)s", iznajmiti)
    db.commit()
    cursor.execute("SELECT * FROM porudzbina WHERE IDPorudzbina=%s", (iznajmljivanje_IDIznajmljivanje, ))
    iznajmiti = cursor.fetchone()
    return flask.jsonify(iznajmiti)


if __name__ == "__main__":
    app.run()
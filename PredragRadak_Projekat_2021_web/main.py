import flask
from flask import Flask

from flask import session

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
app.secret_key = "PR.12.rp.sr/mr"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

#######Pocetna strana
@app.route("/")
def home():
    return app.send_static_file("index.html")

#####LOGIN####
@app.route("/api/login", methods=["POST"]) #Novo-Logovanje korisnika
def login():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik WHERE email=%(email)s AND lozinka=%(lozinka)s", flask.request.json)
    korisnik = cursor.fetchone()
    if korisnik is not None:
        session["korisnik"] = korisnik["email"]
        return "", 200
    return "", 403

@app.route("/api/logout", methods=["GET"]) ###Novo-Odjava
def logout():
    session.pop("korisnik", None)
    return "", 200
#################

#####LOGIN####
@app.route("/api/loginBibliotekar", methods=["POST"]) #Novo-Logovanje bibliotekara
def loginBibliotekar():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM bibliotekar WHERE korisnicko_ime=%(korisnicko_ime)s AND lozinka=%(lozinka)s", flask.request.json)
    bibliotekar = cursor.fetchone()
    if bibliotekar is not None:
        session["bibliotekar"] = bibliotekar["korisnicko_ime"]
        return "", 200
    return "", 403

@app.route("/api/logoutBibliotekar", methods=["GET"]) ###Novo-Odjava
def logoutBibliotekar():
    session.pop("bibliotekar", None)
    return "", 200
#################

#Bibliotekar
@app.route("/api/bibliotekari")
def getAllBibliotekar():
    if session.get("bibliotekar") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM bibliotekar")
        bibliotekar = cursor.fetchall()
        return flask.jsonify(bibliotekar)
    return "", 401   #Login return od ifa
########Prikaz liste###########
@app.route("/api/bibliotekari/<int:bibliotekar_id>")
def getBibliotekar(bibliotekar_id):
    if session.get("bibliotekar") is not None:
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM bibliotekar WHERE id=%s", (bibliotekar_id,))
        bibliotekar=cursor.fetchone()
        if bibliotekar is not None:
            return flask.jsonify(bibliotekar)
        return "", 404
    return "", 401   #Login return od ifa
# #################################
@app.route("/api/bibliotekari", methods=["POST"])
def dodajBibliotekara():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO bibliotekar(korisnicko_ime, lozinka) VALUES (%(korisnicko_ime)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201
    

@app.route("/api/bibliotekari/<int:bibliotekar_id>", methods=["DELETE"])
def ukloniBibliotekara(bibliotekar_id):
    if session.get("bibliotekar") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM bibliotekar WHERE id=%s", (bibliotekar_id, ))
        db.commit()
        return ""
    return "", 401   #Login return od ifa

@app.route("/api/bibliotekari/<int:bibliotekar_id>", methods=["PUT"])
def izmeniBibliotekara(bibliotekar_id):
    if session.get("bibliotekar") is not None:
        bibliotekar = dict(flask.request.json)
        bibliotekar["bibliotekar_id"] = bibliotekar_id
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("UPDATE bibliotekar SET korisnicko_ime=%(korisnicko_ime)s, lozinka=%(lozinka)s WHERE id=%(bibliotekar_id)s", bibliotekar)
        db.commit()
        cursor.execute("SELECT * FROM bibliotekar WHERE id=%s", (bibliotekar_id, ))
        bibliotekar = cursor.fetchone()
        return flask.jsonify(bibliotekar)
    return "", 401   #Login return od ifa







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
    cursor.execute("INSERT INTO korisnik(email, lozinka) VALUES (%(email)s, %(lozinka)s)", flask.request.json)
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
    cursor.execute("UPDATE korisnik SET email=%(email)s, lozinka=%(lozinka)s WHERE IDKorisnik=%(korisnik_IDKorisnik)s", korisnik)
    db.commit()
    cursor.execute("SELECT * FROM korisnik WHERE IDKorisnik=%s", (korisnik_IDKorisnik, ))
    korisnik = cursor.fetchone()
    return flask.jsonify(korisnik)


####Kupac
@app.route("/api/kupci")
def getAllKupci():
    if session.get("korisnik") is not None:  #Login za prikaz kupaca (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()       ##Ovako sa if session mozes sve entitete
        cursor.execute("SELECT * FROM kupac")
        kupac = cursor.fetchall()
        return flask.jsonify(kupac)
    return "", 401   #Login return od ifa
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
    if session.get("korisnik") is not None:  #Login za prikaz kupaca (Korisnik je povezan trenutno samo za kupce)
        cursor = mysql.get_db().cursor()
        cursor.execute("SELECT * FROM knjiga")
        knjiga = cursor.fetchall()
        for k in knjiga:
            k["cena"] = float(k["cena"])
        return flask.jsonify(knjiga)
    return "", 401   #Login return od ifa

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
    if session.get("bibliotekar") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("INSERT INTO knjiga(naziv, autor, kategorija, cena, stanje, biblioteka_id) VALUES (%(naziv)s, %(autor)s, %(kategorija)s, %(cena)s, %(stanje)s, %(biblioteka_id)s)", flask.request.json)
        db.commit()
        return flask.request.json, 201
    return "", 401   #Login return od ifa   

@app.route("/api/knjige/<int:knjiga_IDKnjiga>", methods=["DELETE"])
def ukloniKnjigu(knjiga_IDKnjiga):
    if session.get("bibliotekar") is not None:
        db = mysql.get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM knjiga WHERE IDKnjiga=%s", (knjiga_IDKnjiga, ))
        db.commit()
        return ""
    return "", 401   #Login return od ifa   

@app.route("/api/knjige/<int:knjiga_IDKnjiga>", methods=["PUT"])
def izmeniKnjigu(knjiga_IDKnjiga):
    if session.get("bibliotekar") is not None:
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
    return "", 401   #Login return od ifa   

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
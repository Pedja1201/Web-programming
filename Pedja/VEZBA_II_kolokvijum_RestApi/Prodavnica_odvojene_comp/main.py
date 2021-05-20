import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


###TODO:Vezba pred II kolokvijum-select


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "prodavnicapedja"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)



@app.route("/")
def home():
    return app.send_static_file("index.html")

#Kupci
@app.route("/api/kupci")
def getAllKupci():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac")
    kupac = cursor.fetchall()
    return flask.jsonify(kupac)
    
########
@app.route("/api/kupci/<int:kupac_id>")
def getKupac(kupac_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac WHERE id=%s", (kupac_id,))
    kupac = cursor.fetchone()
    if kupac is not None:
        return flask.jsonify(kupac)

    return "", 404
# #################################


@app.route("/api/kupci", methods=["POST"])
def dodajKupca():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupac(ime, prezime, korIme, lozinka) VALUES (%(ime)s, %(prezime)s, %(korIme)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/kupci/<int:kupac_id>", methods=["DELETE"])
def ukloniKupca(kupac_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM kupac WHERE id=%s", (kupac_id, ))
    db.commit()
    return ""

@app.route("/api/kupci/<int:kupac_id>", methods=["PUT"])
def izmeniKupca(kupac_id):
    kupac = dict(flask.request.json)
    kupac["kupac_id"] = kupac_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE kupac SET ime=%(ime)s, prezime=%(prezime)s, korIme=%(korIme)s, lozinka=%(lozinka)s WHERE id=%(kupac_id)s", kupac)
    db.commit()
    cursor.execute("SELECT * FROM kupac WHERE id=%s", (kupac_id, ))
    kupac = cursor.fetchone()
    return flask.jsonify(kupac)


##Proizvodi
@app.route("/api/proizvodi")
def getAllProizvodi():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvod")
    proizvod = cursor.fetchall()
    for p in proizvod:
        p["cena"] = float(p["cena"])  #Decimal
    return flask.jsonify(proizvod)
    
########
@app.route("/api/proizvodi/<int:proizvod_id>")
def getProizvod(proizvod_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvod WHERE id=%s", (proizvod_id,))
    proizvod = cursor.fetchone()
    if proizvod is not None:
        proizvod["cena"] = float(proizvod["cena"]) ##Decimal
        return flask.jsonify(proizvod)

    return "", 404
# #################################


@app.route("/api/proizvodi", methods=["POST"])
def dodajProizvod():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO proizvod(naziv, opis, cena, dostupno) VALUES (%(naziv)s, %(opis)s, %(cena)s, %(dostupno)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/proizvodi/<int:proizvod_id>", methods=["DELETE"])
def ukloniProizvod(proizvod_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM proizvod WHERE id=%s", (proizvod_id, ))
    db.commit()
    return ""

@app.route("/api/proizvodi/<int:proizvod_id>", methods=["PUT"])
def izmeniProizvod(proizvod_id):
    proizvod = dict(flask.request.json)
    proizvod["proizvod_id"] = proizvod_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE proizvod SET naziv=%(naziv)s, opis=%(opis)s, cena=%(cena)s, dostupno=%(dostupno)s WHERE id=%(proizvod_id)s", proizvod)
    db.commit()
    cursor.execute("SELECT * FROM proizvod WHERE id=%s", (proizvod_id, ))
    proizvod = cursor.fetchone()
    proizvod["cena"] = float(proizvod["cena"]) ###Decimal
    return flask.jsonify(proizvod)



###Kupovina
@app.route("/api/kupovine")
def getAllKupovina():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupovina")
    kupovina = cursor.fetchall()
    for k in kupovina:
        k["cena"] = float(k["cena"])
    return flask.jsonify(kupovina)
    
########
@app.route("/api/kupovine/<int:kupovina_broj>")
def getKupovina(kupovina_broj):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupovina WHERE broj=%s", (kupovina_broj,))
    kupovina = cursor.fetchone()
    if kupovina is not None:
        kupovina["cena"] = float(kupovina["cena"])
        return flask.jsonify(kupovina)

    return "", 404
# #################################


@app.route("/api/kupovine", methods=["POST"])
def dodajKupovinu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupovina(kolicina, cena, datum, kupac_id, proizvod_id) VALUES (%(kolicina)s, %(cena)s, %(datum)s, %(kupac_id)s, %(proizvod_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/kupovine/<int:kupovina_broj>", methods=["DELETE"])
def ukloniKupovinu(kupovina_broj):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM kupovina WHERE broj=%s", (kupovina_broj, ))
    db.commit()
    return ""

@app.route("/api/kupovine/<int:kupovina_broj>", methods=["PUT"])
def izmeniKupovinu(kupovina_broj):
    kupovina = dict(flask.request.json)
    kupovina["kupovina_broj"] = kupovina_broj
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE kupovina SET kolicina=%(kolicina)s, cena=%(cena)s, datum=%(datum)s, kupac_id=%(kupac_id)s, proizvod_id=%(proizvod_id)s WHERE broj=%(kupovina_broj)s", kupovina)
    db.commit()
    cursor.execute("SELECT * FROM kupovina WHERE broj=%s", (kupovina_broj, ))
    kupovina = cursor.fetchone()
    kupovina["cena"] = float(kupovina["cena"]) ###Decimal
    return flask.jsonify(kupovina)




if __name__ == "__main__":
    app.run()
## Web aplikacija za prodaju bioskopskih karata.
import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "bioskop"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

#TODO: Dodaj listu pojedinacnog

@app.route("/")
def home():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM karta")
    return flask.render_template("indexKarta.tpl.html", karta=cursor.fetchall())

@app.route("/dodajKartu", methods=["POST"])
def dodajKartu():
    db = mysql.get_db() 
    cursor = db.cursor()
    cursor.execute("INSERT INTO karta(id, naziv_projekcije, pocetak, kraj, br_sedista) VALUES(%(id)s, %(naziv_projekcije)s, %(pocetak)s, %(kraj)s, %(br_sedista)s)", flask.request.form)
    db.commit()
    return flask.redirect("/")

##Listanje karte
@app.route("/karta", methods=["GET"])
def listaKarte():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM karta WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("karta.tpl.html", karta=cursor.fetchone())
############

@app.route("/ukloniKartu", methods=["GET"])
def ukloniKartu():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM karta WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/")

@app.route("/izmeniKartuForma", methods=["GET"])
def izmeniKartuForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM karta WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("izmenaKarte.tpl.html", karta=cursor.fetchone())

@app.route("/izmeniKartuForma", methods=["POST"])
def izmeniKartu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE karta SET id=%(id)s, naziv_projekcije=%(naziv_projekcije)s, pocetak=%(pocetak)s, kraj=%(kraj)s, br_sedista=%(br_sedista)s WHERE id=%(id)s", flask.request.form)
    db.commit()
    return flask.redirect("/")


##Blagajna
@app.route("/blagajna")
def blagajna():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM blagajna")
    return flask.render_template("indexBlagajna.tpl.html", blagajna=cursor.fetchall())

@app.route("/dodajBlagajnu", methods=["POST"])
def dodajBlagajnu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO blagajna(id, cena, karta_id) VALUES(%(id)s, %(cena)s, %(karta_id)s)", flask.request.form)
    db.commit()
    return flask.redirect("/blagajna")

###Dodavanje selectom###
@app.route("/dodavanjeBlagajne", methods=["GET"])
def dodavanjeBlagajne():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * from karta")
    karta = cursor.fetchall()
    return flask.render_template("dodavanjeBlagajne.tpl.html", karta=karta)
#################


@app.route("/ukloniBlagajnu", methods=["GET"])
def ukloniBlagajnu():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM blagajna WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/blagajna")

@app.route("/izmeniBlagajnuForma", methods=["GET"])
def izmeniBlagajnuForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM blagajna WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("izmenaBlagajne.tpl.html", blagajna=cursor.fetchone())

@app.route("/izmeniBlagajnuForma", methods=["POST"])
def izmeniBlagajnu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE blagajna SET id=%(id)s, cena=%(cena)s, karta_id=%(karta_id)s WHERE id=%(id)s", flask.request.form)
    db.commit()
    return flask.redirect("/blagajna")




if __name__ == "__main__":
    app.run()
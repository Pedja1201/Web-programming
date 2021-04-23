import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


###TODO:Priprema za klk/prodji vez

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "prodavnicapedja"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)



@app.route("/")
def home():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac")
    return flask.render_template("kupac.tpl.html", kupac=cursor.fetchall())

@app.route("/dodajKupca", methods=["POST"])
def dodajKupca():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupac(ime, prezime, korIme, lozinka) VALUES (%(ime)s, %(prezime)s, %(korIme)s, %(lozinka)s)", flask.request.form)
    db.commit()
    return flask.redirect("/")

@app.route("/ukloniKupca", methods=["GET"])
def ukloniKupca():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM kupac WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/")

@app.route("/izmenaKupca", methods=["GET"])
def izmenaKupcaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("izmenaKupca.tpl.html", kupac=cursor.fetchone())


@app.route("/izmenaKupca", methods=["POST"])
def izmenaKupca():
    kupac = dict(flask.request.form)
    kupac["id"] = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE kupac SET ime=%(ime)s, prezime=%(prezime)s, korIme=%(korIme)s, lozinka=%(lozinka)s WHERE id=%(id)s", kupac)
    db.commit()
    return flask.redirect("/")

@app.route("/kupac", methods=["GET"])
def listaKupcaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupac WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("listaKupca.tpl.html", kupac=cursor.fetchone())




##PROIZVOD
@app.route("/proizvod")
def proizvod():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvod")
    return flask.render_template("proizvod.tpl.html", proizvod=cursor.fetchall())

@app.route("/dodajProizvod", methods=["POST"])
def dodajProizvod():
    proizvod = dict(flask.request.form)
    proizvod["dostupno"] = proizvod.get("dostupno", 0)
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO proizvod(naziv, opis, cena, dostupno) VALUES (%(naziv)s, %(opis)s, %(cena)s, %(dostupno)s)", proizvod)
    db.commit()
    return flask.redirect("/proizvod")

@app.route("/ukloniProizvod", methods=["GET"])
def ukloniProizvod():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM proizvod WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/proizvod")

@app.route("/izmenaProizvoda", methods=["GET"])
def izmenaProizvodaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvod WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("izmenaProizvoda.tpl.html", proizvod=cursor.fetchone())


@app.route("/izmenaProizvoda", methods=["POST"])
def izmenaProizvoda():
    proizvod = dict(flask.request.form)
    proizvod["id"] = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE proizvod SET naziv=%(naziv)s, opis=%(opis)s, cena=%(cena)s, dostupno=%(dostupno)s WHERE id=%(id)s", proizvod)
    db.commit()
    return flask.redirect("/proizvod")

@app.route("/listaProizvoda", methods=["GET"])
def listaProizvodaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM proizvod WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("listaProizvoda.tpl.html", proizvod=cursor.fetchone())


###KUPOVINA
@app.route("/kupovina")
def kupovina():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupovina")
    return flask.render_template("kupovina.tpl.html", kupovina=cursor.fetchall())

@app.route("/dodajKupovinu", methods=["POST"])
def dodajKupovinu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO kupovina(kolicina, cena, datum, kupac_id, proizvod_id) VALUES (%(kolicina)s, %(cena)s, %(datum)s, %(kupac_id)s, %(proizvod_id)s)", flask.request.form)
    db.commit()
    return flask.redirect("/kupovina")

@app.route("/ukloniKupovinu", methods=["GET"])
def ukloniKupovinu():
    broj = flask.request.args["broj"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM kupovina WHERE broj=%s", (broj, ))
    db.commit()
    return flask.redirect("/kupovina")

@app.route("/izmeniKupovinu", methods=["GET"])
def izmenaKupovineForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupovina WHERE broj=%s", (flask.request.args["broj"], ))
    return flask.render_template("izmenaKupovine.tpl.html", kupovina=cursor.fetchone())


@app.route("/izmeniKupovinu", methods=["POST"])
def izmenaKupovine():
    kupovina = dict(flask.request.form)
    kupovina["broj"] = flask.request.args["broj"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE kupovina SET kolicina=%(kolicina)s, cena=%(cena)s, datum=%(datum)s, kupac_id=%(kupac_id)s, proizvod_id=%(proizvod_id)s WHERE broj=%(broj)s", kupovina)
    db.commit()
    return flask.redirect("/kupovina")

@app.route("/listaKupovine", methods=["GET"])
def listaKupovineForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM kupovina WHERE broj=%s", (flask.request.args["broj"], ))
    return flask.render_template("listaKupovine.tpl.html", kupovina=cursor.fetchone())


@app.route("/dodavanjeKupovine")
def dodavanjeKupovine():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT *FROM kupac")
    kupac = cursor.fetchall()
    cursor.execute("SELECT * FROM proizvod WHERE dostupno = 1")
    proizvod = cursor.fetchall()
    return flask.render_template("dodavanjeKupovine.tpl.html", kupac=kupac, proizvod=proizvod)







if __name__ == "__main__":
    app.run()
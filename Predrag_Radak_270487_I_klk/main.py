import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "radnici"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

#RADNIK
@app.route("/")
def home():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radnik")
    return flask.render_template("radnik.tpl.html", radnik=cursor.fetchall())

@app.route("/radnik", methods=["GET"])
def prikazRadnika():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radnik WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("listaRadnika.tpl.html", radnik=cursor.fetchone())

@app.route("/radnik", methods=["POST"])
def radnik():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE radnik SET id=%(id)s, ime=%(ime)s, prezime=%(prezime)s, email=%(email)s WHERE id=%(id)s", flask.request.form)
    db.commit()
    return flask.redirect("/")
#################################


@app.route("/dodajRadnika", methods=["POST"])
def dodajRadnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO radnik(ime, prezime, email) VALUES (%(ime)s, %(prezime)s, %(email)s)", flask.request.form)
    db.commit()
    return flask.redirect("/")

@app.route("/ukloniRadnika", methods=["GET"])
def ukloniRadnika():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM radnik WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/")

@app.route("/izmenaRadnika", methods=["GET"])
def izmeniRadnikaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radnik WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("izmenaRadnika.tpl.html", radnik=cursor.fetchone())

@app.route("/izmenaRadnika", methods=["POST"])
def izmeniRadnika():
    radnik = dict(flask.request.form)
    radnik["id"] = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE radnik SET ime=%(ime)s, prezime=%(prezime)s, email=%(email)s WHERE id=%(id)s", radnik)
    db.commit()
    return flask.redirect("/")

#RadnoMesto
@app.route("/radnoMesto")
def radnoMesto():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radno_mesto")
    return flask.render_template("radno_mesto.tpl.html", mesto=cursor.fetchall())


##Prikaz liste
@app.route("/mesto", methods=["GET"])
def prikazRadnodMesta():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radno_mesto WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("listaRadnogMesta.tpl.html", mesto=cursor.fetchone())




@app.route("/dodajRadnoMesto", methods=["POST"])
def dodajRadnoMesto():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO radno_mesto(naziv) VALUES (%(naziv)s)", flask.request.form)
    db.commit()
    return flask.redirect("/radnoMesto")

@app.route("/ukloniRadnoMesto", methods=["GET"])
def ukloniRadnoMesto():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM radno_mesto WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/radnoMesto")

@app.route("/izmenaRadnogMesta", methods=["GET"])
def izmenaRadnogMestaForma():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radno_mesto WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("izmenaRadnogMesta.tpl.html", mesto=cursor.fetchone())

@app.route("/izmenaRadnogMesta", methods=["POST"])
def izmenaRadnogMesta():
    mesto = dict(flask.request.form)
    mesto["id"] = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE radno_mesto SET naziv=%(naziv)s WHERE id=%(id)s", mesto)
    db.commit()
    return flask.redirect("/radnoMesto")


#Angazovanje
@app.route("/angazovanje")
def angazovanje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM angazovanje")
    return flask.render_template("angazovanje.tpl.html", angazovanje=cursor.fetchall())

#SELECT dodavanje
@app.route("/dodavanjeAngazovanje", methods=["GET"])
def dodavanjeAngazovanje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radnik")
    radnik = cursor.fetchall()
    cursor.execute("SELECT * FROM radno_mesto")
    mesto = cursor.fetchall()
    return flask.render_template("dodavanjeAngazovanja.tpl.html", radnik=radnik, mesto=mesto)


@app.route("/listaAngazovanje", methods=["GET"])
def listaAngazovanjeForm():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM angazovanje WHERE id=%s", (flask.request.args["id"], ))
    return flask.render_template("listaAngazovanje.tpl.html", angazovanje=cursor.fetchone())



@app.route("/dodajAngazovanje", methods=["POST"])
def dodajAngazovanje():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO angazovanje(radnik_id, radno_mesto_id, pocetak, kraj, plata) VALUES (%(radnik_id)s, %(radno_mesto_id)s, %(pocetak)s, %(kraj)s, %(plata)s)", flask.request.form)
    db.commit()
    return flask.redirect("/angazovanje")

@app.route("/ukloniAngazovanje", methods=["GET"])
def ukloniAngazovanje():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM angazovanje WHERE id=%s", (ajdi, ))
    db.commit()
    return flask.redirect("/angazovanje")

##    Obicna izmena   ##############
# @app.route("/izmenaAngazovanje", methods=["GET"])
# def izmenaObicnogAngazovanja():
#     cursor = mysql.get_db().cursor()
#     cursor.execute("SELECT * FROM angazovanje WHERE id=%s", (flask.request.args["id"], ))
#     return flask.render_template("angazovanjeIzmena.tpl.html", angazovanje=cursor.fetchone())

# @app.route("/izmenaAngazovanje", methods=["POST"])
# def izmenaAngazovanjaSet():
#     angazovanje = dict(flask.request.form)
#     angazovanje["id"] = flask.request.args["id"]
#     db = mysql.get_db()
#     cursor = db.cursor()
#     cursor.execute("UPDATE angazovanje SET radnik_id=%(radnik_id)s, radno_mesto_id=%(radno_mesto_id)s, pocetak=%(pocetak)s, kraj=%(kraj)s, plata=%(plata)s WHERE id=%(id)s", angazovanje)
#     db.commit()
#     return flask.redirect("/angazovanje")
    ##################################################

##Izmena SELECT##
@app.route("/izmenaAngazovanje", methods=["GET"])
def izmenaAngazovanjaForma():
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM radnik")
    radnik = cursor.fetchall()
    cursor.execute("SELECT * FROM radno_mesto")
    mesto = cursor.fetchall()
    cursor.execute("SELECT * FROM angazovanje WHERE id=%s", flask.request.args["id"])
    angazovanje = cursor.fetchone()
    return flask.render_template("izmenaAngazovanja.tpl.html", radnik=radnik, mesto=mesto, angazovanje=angazovanje)


@app.route("/izmenaAngazovanje", methods=["POST"])
def izmenaAngazovanja():
    angazovanje = dict(flask.request.form)
    angazovanje["id"] = flask.request.args["id"]
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute("UPDATE angazovanje SET radnik_id=%(radnik_id)s, radno_mesto_id=%(radno_mesto_id)s, pocetak= %(pocetak)s, kraj=%(kraj)s, plata=%(plata)s WHERE id=%(id)s", angazovanje)
    db.commit()
    return flask.redirect("/angazovanje")





if __name__ == "__main__":
    app.run()
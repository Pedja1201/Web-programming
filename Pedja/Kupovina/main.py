import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")

app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "net_shoping"

mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

#NIKE
@app.route("/")
def home():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nike")
    return flask.render_template("nike.tpl.html", nike=cursor.fetchall())

@app.route("/dodajArtikal", methods=["POST"])
def dodajArtikal():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO nike(odeca, obuca, velicina) VALUES (%(odeca)s, %(obuca)s, %(velicina)s)", flask.request.form)
    db.commit()
    return flask.redirect("/")

@app.route("/ukloniArtikle", methods=["GET"])
def ukloniArtikle():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM nike WHERE id=%s",(ajdi, ) )
    db.commit()
    return flask.redirect("/")

@app.route("/izmenaArtikala", methods=["GET"])
def izmenaArtikalaForma():
    izmena = flask.request.args["id"]
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nike where id=%s",(izmena, ))
    return flask.render_template("izmenaNike.tpl.html", nike=cursor.fetchone())

@app.route("/izmenaArtikala", methods=["POST"])
def izmenaArtikala():
    nike = dict(flask.request.form)
    nike["id"] = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE nike SET odeca=%(odeca)s, obuca=%(obuca)s, velicina=%(velicina)s WHERE id=%(id)s", nike)
    db.commit()
    return flask.redirect("/")


####AUTO
@app.route("/auto")
def auto():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM auto")
    return flask.render_template("auto.tpl.html", auto=cursor.fetchall())

@app.route("/dodajAuto", methods=["POST"])
def dodajAuto():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO auto(tablice, marka, model, godiste) VALUES (%(tablice)s, %(marka)s, %(model)s, %(godiste)s)", flask.request.form)
    db.commit()
    return flask.redirect("/auto")

@app.route("/ukloniAuto", methods=["GET"])
def ukloniAuto():
    tablice = flask.request.args["tablice"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM auto WHERE tablice=%s",(tablice, ) )
    db.commit()
    return flask.redirect("/auto")

@app.route("/izmenaAuta", methods=["GET"])
def izmenaAutoForma():
    tablice = flask.request.args["tablice"]
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM auto where tablice=%s",(tablice, ))
    return flask.render_template("izmenaAuto.tpl.html", auto=cursor.fetchone())

@app.route("/izmenaAuta", methods=["POST"])
def izmenaAuta():
    auto = dict(flask.request.form)
    auto["tablice"] = flask.request.args["tablice"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE auto SET tablice=%(tablice)s, marka=%(marka)s, model=%(model)s, godiste=%(godiste)s WHERE tablice=%(tablice)s", auto)
    db.commit()
    return flask.redirect("/auto")






####Korisnik
@app.route("/korisnik")
def korisnik():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM korisnik")
    return flask.render_template("korisnik.tpl.html", korisnik=cursor.fetchall())

@app.route("/dodajKorisnika", methods=["POST"])
def dodajKorisnika():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO korisnik(ime, prezime, zanimanje, nike_id, auto_tablice) VALUES (%(ime)s, %(prezime)s, %(zanimanje)s, %(nike_id)s, %(auto_tablice)s)", flask.request.form)
    db.commit()
    return flask.redirect("/korisnik")


@app.route("/dodavanjeKorisnika", methods=["GET"])
def dodavanjeKorisnika():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nike")
    nike = cursor.fetchall()
    cursor.execute("SELECT * FROM auto")
    auto = cursor.fetchall()
    return flask.render_template("dodavanjeKorisnika.tpl.html", nike=nike, auto=auto)





@app.route("/ukloniKorisnika", methods=["GET"])
def ukloniKorisnika():
    ajdi = flask.request.args["id"]
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM korisnik WHERE id=%s",(ajdi, ) )
    db.commit()
    return flask.redirect("/korisnik")

@app.route("/izmenaKorisnika", methods=["GET"])
def izmenaKorisnikaForma():
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM nike")
    nike = cursor.fetchall()
    cursor.execute("SELECT * FROM auto")
    auto = cursor.fetchall()
    cursor.execute("SELECT * FROM korisnik WHERE id=%s", flask.request.args["id"])
    korisnik = cursor.fetchone()
    return flask.render_template("izmenaKorisnik.tpl.html", nike=nike, auto=auto, korisnik=korisnik)


@app.route("/izmenaKorisnika", methods=["POST"])
def izmenaKorisnika():
    korisnik = dict(flask.request.form)
    korisnik["id"] = flask.request.args["id"]
    db = mysql.get_db()
    cursor = mysql.get_db().cursor()
    cursor.execute("UPDATE korisnik SET ime=%(ime)s, prezime=%(prezime)s, zanimanje= %(zanimanje)s, nike_id=%(nike_id)s, auto_tablice=%(auto_tablice)s WHERE id=%(id)s", korisnik)
    db.commit()
    return flask.redirect("/korisnik")

###Obicna izmena
# @app.route("/izmenaKorisnika", methods=["GET"])
# def izmenaKorisnikaForma():
#     korisnik = flask.request.args["id"]
#     cursor = mysql.get_db().cursor()
#     cursor.execute("SELECT * FROM korisnik where id=%s",(korisnik, ))
#     return flask.render_template("izmenaKorisnik.tpl.html", korisnik=cursor.fetchone())

# @app.route("/izmenaKorisnika", methods=["POST"])
# def izmenaKorisnika():
#     korisnik = dict(flask.request.form)
#     korisnik["id"] = flask.request.args["id"]
#     db = mysql.get_db()
#     cursor = db.cursor()
#     cursor.execute("UPDATE korisnik SET ime=%(ime)s, prezime=%(prezime)s, zanimanje=%(zanimanje)s, nike_id=%(nike_id)s, auto_tablice=%(auto_tablice)s WHERE id=%(id)s", korisnik)
#     db.commit()
#     return flask.redirect("/korisnik")











if __name__ == "__main__":
    app.run()
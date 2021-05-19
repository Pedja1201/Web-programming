import flask
from flask import Flask


from flaskext.mysql import MySQL
from flaskext.mysql import pymysql



app = Flask(__name__, static_url_path="/")

##Priprema za II kolokvijum 


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "transakcija"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("index.html")

#Artikl
@app.route("/api/artikli")
def getAllrtikl():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM artikl")
    artikl = cursor.fetchall()
    for a in artikl:               ###Decimal u bazi!
        a["cena"] = float(a["cena"])
    return flask.jsonify(artikl)
    
########
@app.route("/api/artikli/<int:artikl_id>")
def getArtikl(artikl_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM artikl WHERE id=%s", (artikl_id,))
    artikl = cursor.fetchone()
    if artikl is not None:
        artikl["cena"] = float(artikl["cena"]) ##Decimal u bazi
        return flask.jsonify(artikl)

    return "", 404
# #################################


@app.route("/api/artikli", methods=["POST"])
def dodajArtikl():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO artikl(naziv, proizvodjac, robna_marka, dobavljac, cena) VALUES (%(naziv)s, %(proizvodjac)s, %(robna_marka)s, %(dobavljac)s, %(cena)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/artikli/<int:artikl_id>", methods=["DELETE"])
def ukloniArtikl(artikl_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM artikl WHERE id=%s", (artikl_id, ))
    db.commit()
    return ""

@app.route("/api/artikli/<int:artikl_id>", methods=["PUT"])
def izmeniArtikl(artikl_id):
    artikl = dict(flask.request.json)
    artikl["artikl_id"] = artikl_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE artikl SET naziv=%(naziv)s, proizvodjac=%(proizvodjac)s, robna_marka=%(robna_marka)s, dobavljac=%(dobavljac)s, cena=%(cena)s WHERE id=%(artikl_id)s", artikl)
    db.commit()
    cursor.execute("SELECT * FROM artikl WHERE id=%s", (artikl_id, ))
    artikl = cursor.fetchone()
    artikl["cena"] = float(artikl["cena"])  ##Decimal sql
    return flask.jsonify(artikl)



##Transakcija
@app.route("/api/transakcije")
def getAllTransakcije():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM transakcija")
    transakcija = cursor.fetchall()
    return flask.jsonify(transakcija)
    
########
@app.route("/api/transakcije/<int:transakcija_id>")
def getTransakcija(transakcija_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM transakcija WHERE id=%s", (transakcija_id,))
    transakcija = cursor.fetchone()
    if transakcija is not None:
        return flask.jsonify(transakcija)

    return "", 404
# #################################


@app.route("/api/transakcije", methods=["POST"])
def dodajTransakciju():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO transakcija(datum, kolicina, artikl_id) VALUES (%(datum)s, %(kolicina)s, %(artikl_id)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/transakcije/<int:transakcija_id>", methods=["DELETE"])
def uklonitransakciju(transakcija_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM transakcija WHERE id=%s", (transakcija_id, ))
    db.commit()
    return ""

@app.route("/api/transakcije/<int:transakcija_id>", methods=["PUT"])
def izmeniTransakciju(transakcija_id):
    transakcija = dict(flask.request.json)
    transakcija["transakcija_id"] = transakcija_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE transakcija SET datum=%(datum)s, kolicina=%(kolicina)s, artikl_id=%(artikl_id)s WHERE id=%(transakcija_id)s", transakcija)
    db.commit()
    cursor.execute("SELECT * FROM transakcija WHERE id=%s", (transakcija_id, ))
    transakcija = cursor.fetchone()
    return flask.jsonify(transakcija)


if __name__ == "__main__":
    app.run()
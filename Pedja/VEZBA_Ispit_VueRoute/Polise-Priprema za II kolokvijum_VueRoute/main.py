import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "polise"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("index.html")

#Automobil
@app.route("/api/automobili")
def getAllAutomobil():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM automobil")
    automobil = cursor.fetchall()
    for a in automobil:
        a["zapremina_motora"] = float(a["zapremina_motora"])
    return flask.jsonify(automobil)
    
########
@app.route("/api/automobili/<int:automobil_id>")
def getSAutomobil(automobil_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM automobil WHERE id=%s", (automobil_id,))
    automobil = cursor.fetchone()
    if automobil is not None:
        automobil["zapremina_motora"] = float(automobil["zapremina_motora"])
        return flask.jsonify(automobil)

    return "", 404
# #################################


@app.route("/api/automobili", methods=["POST"])
def dodajAutomobil():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO automobil(registarski_broj, marka, model, zapremina_motora) VALUES (%(registarski_broj)s, %(marka)s, %(model)s, %(zapremina_motora)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/automobili/<int:automobil_id>", methods=["DELETE"])
def ukloniAutomobil(automobil_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM automobil WHERE id=%s", (automobil_id, ))
    db.commit()
    return ""

@app.route("/api/automobili/<int:automobil_id>", methods=["PUT"])
def izmeniAutomobil(automobil_id):
    automobil = dict(flask.request.json)
    automobil["automobil_id"] = automobil_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE automobil SET registarski_broj=%(registarski_broj)s, marka=%(marka)s, model=%(model)s, zapremina_motora=%(zapremina_motora)s WHERE id=%(automobil_id)s", automobil)
    db.commit()
    cursor.execute("SELECT * FROM automobil WHERE id=%s", (automobil_id, ))
    automobil = cursor.fetchone()
    automobil["zapremina_motora"] = float(automobil["zapremina_motora"])
    return flask.jsonify(automobil)




##OsiguravajuceKuce
@app.route("/api/osiguravajuceKuce")
def getAllOsiguravajuceKuce():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM osiguravajuca_kuca")
    kuca = cursor.fetchall()
    return flask.jsonify(kuca)
    
########
@app.route("/api/osiguravajuceKuce/<int:osiguravajucaKuca_id>")
def getOsiguravajucaKuca(osiguravajucaKuca_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM osiguravajuca_kuca WHERE id=%s", (osiguravajucaKuca_id,))
    kuca = cursor.fetchone()
    if kuca is not None:
        return flask.jsonify(kuca)

    return "", 404
# #################################


@app.route("/api/osiguravajuceKuce", methods=["POST"])
def dodajOsiguravajucuKucu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO osiguravajuca_kuca(naziv) VALUES (%(naziv)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/osiguravajuceKuce/<int:osiguravajucaKuca_id>", methods=["DELETE"])
def ukloniOsiguravajucuKucu(osiguravajucaKuca_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM osiguravajuca_kuca WHERE id=%s", (osiguravajucaKuca_id, ))
    db.commit()
    return ""

@app.route("/api/osiguravajuceKuce/<int:osiguravajucaKuca_id>", methods=["PUT"])
def izmeniOsiguravajucuKucu(osiguravajucaKuca_id):
    kuca = dict(flask.request.json)
    kuca["osiguravajucaKuca_id"] = osiguravajucaKuca_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE osiguravajuca_kuca SET naziv=%(naziv)s WHERE id=%(osiguravajucaKuca_id)s", kuca)
    db.commit()
    cursor.execute("SELECT * FROM osiguravajuca_kuca WHERE id=%s", (osiguravajucaKuca_id, ))
    kuca = cursor.fetchone()
    return flask.jsonify(kuca)


###Polise
@app.route("/api/polise")
def getAllPolisa():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM polisa")
    polisa = cursor.fetchall()
    for p in polisa:
        p["cena"] = float(p["cena"])
    return flask.jsonify(polisa)
    
########
@app.route("/api/polise/<int:polisa_id>")
def getAutomobil(polisa_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM polisa WHERE id=%s", (polisa_id,))
    polisa = cursor.fetchone()
    if polisa is not None:
        polisa["cena"] = float(polisa["cena"])
        return flask.jsonify(polisa)

    return "", 404
# #################################


@app.route("/api/polise", methods=["POST"])
def dodajPolisu():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO polisa(automobil_id, osiguravajuca_kuca_id, datum_pocetka, datum_kraja, cena) VALUES (%(automobil_id)s, %(osiguravajuca_kuca_id)s, %(datum_pocetka)s, %(datum_kraja)s, %(cena)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/polise/<int:polisa_id>", methods=["DELETE"])
def ukloniPolisu(polisa_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM polisa WHERE id=%s", (polisa_id, ))
    db.commit()
    return ""

@app.route("/api/polise/<int:polisa_id>", methods=["PUT"])
def izmeniPolisu(polisa_id):
    polisa = dict(flask.request.json)
    polisa["polisa_id"] = polisa_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE polisa SET automobil_id=%(automobil_id)s, osiguravajuca_kuca_id=%(osiguravajuca_kuca_id)s, datum_pocetka=%(datum_pocetka)s, datum_kraja=%(datum_kraja)s, cena=%(cena)s WHERE id=%(polisa_id)s", polisa)
    db.commit()
    cursor.execute("SELECT * FROM polisa WHERE id=%s", (polisa_id, ))
    polisa = cursor.fetchone()
    polisa["cena"] = float(polisa["cena"])
    return flask.jsonify(polisa)



if __name__ == "__main__":
    app.run()
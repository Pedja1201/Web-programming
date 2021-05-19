import flask
from flask import Flask

from flaskext.mysql import MySQL
from flaskext.mysql import pymysql


app = Flask(__name__, static_url_path="/")


app.config["MYSQL_DATABASE_HOST"] = "localhost"
app.config["MYSQL_DATABASE_USER"] = "root"
app.config["MYSQL_DATABASE_PASSWORD"] = "pedja10"
app.config["MYSQL_DATABASE_DB"] = "studentska_sluzba"


mysql = MySQL(app, cursorclass=pymysql.cursors.DictCursor)

@app.route("/")
def home():
    return app.send_static_file("index.html")

##Student
@app.route("/api/studenti")
def getAllStudenti():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM student")
    student = cursor.fetchall()
    return flask.jsonify(student)
    
########
@app.route("/api/studenti/<string:student_brojIndeksa>")
def getStudent(student_brojIndeksa):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM student WHERE brojIndeksa=%s", (student_brojIndeksa,))
    student = cursor.fetchone()
    if student is not None:
        return flask.jsonify(student)

    return "", 404
# #################################


@app.route("/api/studenti", methods=["POST"])
def dodajStudenta():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO student(brojIndeksa, ime, prezime, email, lozinka) VALUES (%(brojIndeksa)s, %(ime)s, %(prezime)s, %(email)s, %(lozinka)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/studenti/<string:student_brojIndeksa>", methods=["DELETE"])
def ukloniStudenta(student_brojIndeksa):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM student WHERE brojIndeksa=%s", (student_brojIndeksa, ))
    db.commit()
    return ""

@app.route("/api/studenti/<string:student_brojIndeksa>", methods=["PUT"])
def izmeniStudenta(student_brojIndeksa):
    student = dict(flask.request.json)
    student["student_brojIndeksa"] = student_brojIndeksa
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE student SET brojIndeksa=%(brojIndeksa)s, ime=%(ime)s, prezime=%(prezime)s, email=%(email)s, lozinka=%(lozinka)s WHERE brojIndeksa=%(student_brojIndeksa)s", student)
    db.commit()
    cursor.execute("SELECT * FROM student WHERE brojIndeksa=%s", (student_brojIndeksa, ))
    student = cursor.fetchone()
    return flask.jsonify(student)


##Predmet
@app.route("/api/predmeti")
def getAllPredmeti():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet")
    predmet = cursor.fetchall()
    for p in predmet:                ######MySql
        p["espb"] = float(p["espb"])  ##Za decimal u bazi
    return flask.jsonify(predmet)
    
#########
@app.route("/api/predmeti/<string:predmet_id>")
def getPredmet(predmet_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmet_id,))
    predmet = cursor.fetchone()
    if predmet is not None:
        predmet["espb"] = float(predmet["espb"]) ##Decimal
        return flask.jsonify(predmet)

    return "", 404
##################################


@app.route("/api/predmeti", methods=["POST"])
def dodajPredmet():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO predmet(id, naziv, profesor, espb) VALUES (%(id)s, %(naziv)s, %(profesor)s, %(espb)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/predmeti/<string:predmet_id>", methods=["DELETE"])
def ukloniPredmet(predmet_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM predmet WHERE id=%s", (predmet_id, ))
    db.commit()
    return ""

@app.route("/api/predmeti/<string:predmet_id>", methods=["PUT"])
def izmeniPredmet(predmet_id):
    predmet = dict(flask.request.json)
    predmet["predmet_id"] = predmet_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE predmet SET id=%(id)s, naziv=%(naziv)s, profesor=%(profesor)s, espb=%(espb)s WHERE id=%(predmet_id)s", predmet)
    db.commit()
    cursor.execute("SELECT * FROM predmet WHERE id=%s", (predmet_id, ))
    predmet = cursor.fetchone()
    predmet["espb"] = float(predmet["espb"]) ###Za Decimal u bazi
    return flask.jsonify(predmet)



###Polaganje
@app.route("/api/polaganja")
def getAllPolaganje():
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM polaganje")
    polaganje = cursor.fetchall()
    for p in polaganje:                ######MySql
        p["ocena"] = float(p["ocena"])  ##Za decimal u bazi
    return flask.jsonify(polaganje)
    
# #########
@app.route("/api/polaganja/<int:polaganje_id>")
def getPolaganje(polaganje_id):
    cursor = mysql.get_db().cursor()
    cursor.execute("SELECT * FROM polaganje WHERE id=%s", (polaganje_id,))
    polaganje = cursor.fetchone()
    if polaganje is not None:
        polaganje["ocena"] = float(polaganje["ocena"])###Za decimal
        return flask.jsonify(polaganje)

    return "", 404
# ##################################


@app.route("/api/polaganja", methods=["POST"])
def dodajPolaganje():
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("INSERT INTO polaganje(student_brojIndeksa, predmet_id, datum, ocena) VALUES (%(student_brojIndeksa)s, %(predmet_id)s, %(datum)s, %(ocena)s)", flask.request.json)
    db.commit()
    return flask.request.json, 201

@app.route("/api/polaganja/<int:polaganje_id>", methods=["DELETE"])
def ukloniPolaganje(polaganje_id):
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("DELETE FROM polaganje WHERE id=%s", (polaganje_id, ))
    db.commit()
    return ""

@app.route("/api/polaganja/<int:polaganje_id>", methods=["PUT"])
def izmeniPolaganje(polaganje_id):
    polaganje = dict(flask.request.json)
    polaganje["polaganje_id"] = polaganje_id
    db = mysql.get_db()
    cursor = db.cursor()
    cursor.execute("UPDATE polaganje SET id=%(id)s, student_brojIndeksa=%(student_brojIndeksa)s, predmet_id=%(predmet_id)s, datum=%(datum)s, ocena=%(ocena)s WHERE id=%(polaganje_id)s", polaganje)
    db.commit()
    cursor.execute("SELECT * FROM polaganje WHERE id=%s", (polaganje_id, ))
    polaganje = cursor.fetchone()
    polaganje["ocena"] = float(polaganje["ocena"]) ###Za Decimal u bazi
    return flask.jsonify(polaganje)





if __name__ == "__main__":
    app.run()
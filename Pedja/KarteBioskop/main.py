import flask
from flask import Flask

app = Flask(__name__, static_folder="static", static_url_path="/")

karte = [{"id": "R1", "naziv": "Hamlet", "pocetak": '2015-01-02T22:00', "zavrsetak": '2015-01-02T00:00', "br_sedista": 100, "obrisan": False}]


@app.route("/")
def home():
    return flask.render_template("index.tpl.html", karte=karte)



@app.route("/dodajKartu", methods=["POST"])
def dodajKartu():
    dodaj=dict(flask.request.form)
    dodaj["obrisan"] = False
    karte.append(dodaj)
    return flask.redirect("/")


@app.route("/k", methods=["GET"])
def prikazi():
    ajdi = flask.request.args["id"]
    for k in karte:
        if k["id"] == ajdi:
            return flask.render_template("karta.tpl.html", **k)
    return flask.redirect("/")

@app.route("/ukloniKartu", methods=["GET"])
def ukloniKartu():
    for i, k in enumerate(karte):
        if k["id"] == flask.request.args["id"]:
            karte[i]["obrisan"] = not karte[i]["obrisan"]
    return flask.redirect("/")

@app.route("/izmenaKarteForma", methods=["GET"])
def izmenaKarteForma():
    for i, k in enumerate(karte):
        if k["id"] == flask.request.args["id"]:
            return flask.render_template("izmenaKarteForma.tpl.html", **k)
    return flask.redirect("/")

@app.route("/izmenaKarte", methods=["POST"])
def izmenaKarte():
    for i, k in enumerate(karte):
        if k["id"] == flask.request.args["id"]:
            izmeni = dict(flask.request.form)
            izmeni["obrisan"] = karte[i]["obrisan"]
            karte[i] = izmeni
    return flask.redirect("/")
    



if __name__ == "__main__":
    app.run()
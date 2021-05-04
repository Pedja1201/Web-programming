import flask
from flask import Flask

app = Flask(__name__, static_folder="static", static_url_path="/")
#SLanje fajla iz drugog static foldera
@app.route("/")
def home():
    return app.send_static_file("index.html")

if __name__ == "__main__":
    app.run()
    
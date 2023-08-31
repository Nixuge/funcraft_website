
from flask import redirect, render_template

from globb import Globb

app = Globb.app

@app.route('/')
def index():
    return render_template("index.html")

@app.route('/jeux')
@app.route('/fr/jeux')
def jeux():
    return render_template("jeux.html")

@app.route("/mon-compte")
@app.route("/fr/mon-compte")
def compte_redirect():
    return redirect("/mon-compte/connexion")

@app.route("/mon-compte/connexion")
@app.route("/fr/mon-compte/connexion")
def compte_connexion():
    return render_template("compte/connexion.html")

@app.route("/fr/joueurs")
@app.route("/joueurs")
def joueurs():
    return render_template("joueurs.html")

@app.route("/fr/classement")
@app.route("/classement")
def classement():
    return render_template("classement.html")

@app.route("/fr/boutique")
@app.route("/boutique")
def boutique():
    return render_template("boutique.html")

@app.route("/fr/jouer")
@app.route("/jouer")
def jouer():
    return render_template("jouer.html")

@app.route("/fr/nous-contacter")
@app.route("/nous-contacter")
def nous_contacter():
    return render_template("nous-contacter.html")

# Same as the real website
@app.route("/legal-notice")
@app.route("/tos")
def legal_notice():
    return redirect("https://www.ascentia.fr/tos/funcraft/")

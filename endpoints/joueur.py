from flask import redirect, render_template
from globb import Globb


app = Globb.app

@app.route("/fr/joueur")
@app.route("/joueur")
def joueur_redirect():
    return redirect("/joueurs")

query_id = "SELECT * FROM funcraft_stats WHERE username_upper IS upper(?)"

@app.route('/fr/joueur/<joueur>')
@app.route("/joueur/<joueur>")
def joueur(joueur: str):

    return render_template("joueur.html")











@app.route("/fr/joueur/<joueur>/friendlist")
@app.route("/joueur/<joueur>/friendlist")
def friendlist(joueur: str):
    return "Not yet done"
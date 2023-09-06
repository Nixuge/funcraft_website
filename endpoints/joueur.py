import gzip
import json
from flask import redirect, render_template, request
from globb import Globb


app = Globb.app

@app.route("/fr/joueur")
@app.route("/joueur")
def joueur_redirect():
    # Workaround, as the normal page sends a get form.
    # Didn't want to modify it that much.
    username = request.args.get("q")
    if username == "":
        return redirect("/joueurs")
    
    return redirect(f"/joueur/{username}")
    

@app.route('/fr/joueur/<id>/<joueur>')
@app.route("/joueur/<id>/<joueur>")
def joueur_id(id: str, joueur: str):
    return redirect(f"/joueur/{joueur}")


query = "SELECT * FROM funcraft_stats WHERE username_upper IS upper(?)"

@app.route('/fr/joueur/<joueur>')
@app.route("/joueur/<joueur>")
def joueur(joueur: str):
    row = Globb.cursor.execute(query, (joueur, )).fetchone()
    if not row or not row[2]:
        return render_template("error/player_404.html", username=joueur), 404
    
    username = row[1]
    rank = row[2]
    inscription = row[3]
    derniere_connexion = row[4]

    # Dirty but working, keeping for now
    gloires = '{:,}'.format(row[5]).replace(",", " ")
    parties_jouees = '{:,}'.format(row[6]).replace(",", " ")

    pstats = json.loads(gzip.decompress(row[7]))

    ban = row[11]
    
    if row[13]:
        rankings = json.loads(gzip.decompress(row[13]))
    else:
        rankings = {}


    return render_template("joueur/joueur.html", 
                           username=username,
                           rank=rank,
                           gloires=gloires,
                           parties_jouees=parties_jouees,
                           inscription=inscription,
                           derniere_connexion=derniere_connexion,
                           ban=ban,
                           rankings=rankings,
                           PSTATS=pstats)




@app.route("/fr/joueur/<joueur>/friendlist")
@app.route("/joueur/<joueur>/friendlist")
def friendlist(joueur: str):
    row = Globb.cursor.execute(query, (joueur, )).fetchone()
    if not row or not row[2]:
        return "Player does not exist", 400
    
    if row[8] == None:
        # https://web.archive.org/web/20230815105739/https://www.funcraft.net/fr/joueur/2362116?sendFriends=1
        return "La liste d'amis est vide.", 200
    
    friendlist = json.loads(gzip.decompress(row[8]))
    
    return render_template("joueur/friendlist.html", 
                           joueurs=friendlist)
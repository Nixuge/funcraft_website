
import gzip
import json
from pprint import pprint
from flask import redirect, render_template
from globb import Globb


app = Globb.app

valid_chars = "0123456789_abcdefghijklmnopqrstuvwxyz"
def clean_for_sql(table_name: str):
    table_name = table_name.replace("-", "_")
    for char in table_name:
        if char not in valid_chars:
            return None
    return table_name

@app.route("/fr/classement/<jeu>")
@app.route("/classement/<jeu>")
def classement_redirect(jeu):
    return redirect(f"/classement/{jeu}/always")

@app.route("/fr/classement/<jeu>/<mois>")
@app.route("/classement/<jeu>/<mois>")
def classement(jeu, mois):
    table_name = clean_for_sql(f"{jeu}__{mois}")
    if not table_name:
        return "Invalid game/month", 400
    
    mois_prefix = "month-" + mois if not "always" in mois else mois

    query_rankings = f"SELECT * FROM {table_name} ORDER BY ranking LIMIT 100"
    rankings = Globb.cursor_rankings.execute(query_rankings).fetchall()

    query_grab_user = f"SELECT * FROM funcraft_stats WHERE id IN {tuple([x[0] for x in rankings])};"
    users = Globb.cursor.execute(query_grab_user).fetchall()

    final_dict: dict[str, dict[str, int]] = {}

    for ranking in rankings:
        id = ranking[0]
        rank = ranking[1]
        corresponding_user = None
        for user in users:
            if user[0] == id:
                corresponding_user = user
                break
        if not corresponding_user:
            return "Corresponding user not found ! Please report.", 500
        
        name = corresponding_user[1]

        user_stats_dict: dict = json.loads(gzip.decompress(corresponding_user[7]))
        
        month_stats_dict = user_stats_dict.get(mois_prefix)
        if not month_stats_dict:
            return "Stats dict doesn't exist for player. This shouldn't happen.", 500
        
        month_stats_dict = month_stats_dict.get(jeu)
        if not month_stats_dict:
            return "Stats dict doesn't exist for player. This shouldn't happen.", 500
        
        month_stats_dict = month_stats_dict["stats"]

        final_dict[rank] = {}
        final_dict[rank]["id"] = id
        final_dict[rank]["name"] = name
        final_dict[rank]["stats"] = {}
        for stat in month_stats_dict:
            final_dict[rank]["stats"][stat["name"]] = stat["value"]

    return render_template("classement/classement.html",
                           rankings = final_dict,
                           game_name = jeu,
                           # TODO: PROPER CAPITALIZATION/GAME NAME
                           game_display_name = jeu,
                           month = mois
                           )
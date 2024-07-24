
import gzip
import json
from flask import redirect, render_template
from globb import Globb
from utils.db import has_invalid_chars


app = Globb.app

@app.route("/fr/classement/<jeu>")
@app.route("/classement/<jeu>")
def classement_redirect(jeu):
    return redirect(f"/classement/{jeu}/always")

@app.route("/fr/classement/<jeu>/<mois>")
@app.route("/classement/<jeu>/<mois>")
def classement(jeu, mois):
    mois_prefix = "month-" + mois if not "always" in mois else mois

    # Invalid char checks
    if has_invalid_chars(jeu):
        return "Invalid chars in game", 400
    elif has_invalid_chars(mois):
        return "Invalid chars in month"
    
    # Existing month checks
    available_months = Globb.leaderboard_available_months.get(jeu)
    if not available_months:
        return "Game doesn't exist."
    if not mois in available_months:
        return "Specified Month doesn't have stats for provided game"
    
    table_name = f"{jeu}__{mois.replace('-', '_')}"

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
                           game_display_name = Globb.game_names.get(jeu, "Report if you see this."),
                           available_months = available_months,
                           current_month = mois
                           )
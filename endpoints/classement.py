
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
    query = f"SELECT * FROM {table_name} LIMIT 100"
    data = Globb.cursor_rankings.execute(query).fetchall()
    return data
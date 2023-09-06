
from flask import render_template

from globb import Globb

app = Globb.app

# @Globb.app.route('/<path:path>', defaults={'path': ''})
# def catch_all(path):
#     return redirect("/", code=302)

@app.errorhandler(404)
def handle_notfound(e):
    return render_template("error/404.html"), 404

@app.errorhandler(500)
def handle_servererror(e):
    return render_template("error/500.html"), 500

# player not found handled in joueur.py
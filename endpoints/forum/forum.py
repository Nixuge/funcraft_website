from flask import render_template, send_file
from globb import Globb


@Globb.app.route("/forum")
@Globb.app.route("/forum/")
def forum():
    return render_template("forum/index.html")

# To be moved out whne possible. 
# There are also other phps to check (see assets/js/xenforo/xenforo.js & ctrl+f ".php")
@Globb.app.route("/forum/deferred.php", methods=["POST"])
def deferred_php():
    return send_file("web/templates/forum/deferred.php")


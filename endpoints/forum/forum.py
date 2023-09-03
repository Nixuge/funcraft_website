from flask import render_template
from globb import Globb


@Globb.app.route('/forum')
@Globb.app.route('/forum/')
def forum():
    return render_template("forum/todo.html")
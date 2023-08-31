
from flask import redirect

from globb import Globb


@Globb.app.route('/<path:path>', defaults={'path': ''})
def catch_all(path):
    print(path)
    return redirect("/", code=302)
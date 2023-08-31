# NOTE: GETTING HEADS BY NAME IS SUBOPTIMAL. NEED TO PARTIALLY REWRITE THE WEBSITE TO 
# HAVE IT USE IDS EXCLUSIVELY.

from io import BytesIO
from flask import Response, send_file
from globb import Globb


app = Globb.app
cursor = Globb.cursor

query = "SELECT * FROM funcraft_stats WHERE username_upper IS upper(?)"
# Note: a cache isn't really needed here, as the db column is already indexed.
# From tests, it's giving near similar performance results.

@app.route("/_u/avatar/head/username/<username>")
def head_from_username(username: str):
    username = username.replace(".png", "")
    result = cursor.execute(query, (username, )).fetchone()
    
    if not result:
        return "User not found", 404
    
    head_image = result[10]

    # cache 1d
    resp = Response(head_image)
    resp.headers = {
        "Cache-Control": "max-age=86400",
        "Content-Type": "image/png"
    }
    return resp


    # NOTE: INSTEAD OF GETTING THE IMAGE HERE, PERHAPS IT'D BE BETTER TO REDIRECT
    # TO THE ID FUNCTION INSTEAD
    # honestly not sure, w the index this is optimized enough
    # (averaging 0.0005s per head)
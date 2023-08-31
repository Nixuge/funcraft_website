# NOTE: GETTING HEADS BY NAME IS SUBOPTIMAL. NEED TO PARTIALLY REWRITE THE WEBSITE TO 
# HAVE IT USE IDS EXCLUSIVELY.

from io import BytesIO
from flask import send_file
from globb import Globb


app = Globb.app
cursor = Globb.cursor

query_raw = "SELECT * FROM funcraft_stats WHERE username IS (?)"
query_cache = "SELECT * FROM funcraft_stats WHERE id IS (?)"

slow_ids_cache = {}

@app.route("/_u/avatar/head/username/<username>")
def head_from_username(username: str):
    username = username.replace("~", "")
    cached_id = slow_ids_cache.get(username)

    if cached_id == "~INVALID~":
        return "User not found", 404
    
    if cached_id:
        result = cursor.execute(query_cache, (cached_id, )).fetchone()
    else:
        result = cursor.execute(query_raw, (username, )).fetchone()
        if result: slow_ids_cache[username] = result[0]
    
    if not result:
        slow_ids_cache[username] = "~INVALID~"
        return "User not found", 404
    
    head_image = result[10]
    return send_file(BytesIO(head_image), mimetype="image/png")


    # NOTE: INSTEAD OF GETTING THE IMAGE HERE, PERHAPS IT'D BE BETTER TO REDIRECT
    # TO THE ID FUNCTION INSTEAD
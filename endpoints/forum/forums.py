import gzip
import json
from flask import redirect, render_template
from markupsafe import Markup
from globb import Globb
from utils.db import has_invalid_chars


@Globb.app.route("/forum/forums")
def forum_forums_index():
    return redirect("/forum", code=301) # moved permanently as it doesn't exist.


# def unpack_threads_polls(threads: list[tuple]):
#     if len(threads) == 0:
#         return threads
    
#     # Basically added the polls after & not on all tables (pretty sure I didn't on tables where there weren't any
#     # polls anyways), and so some just don't need any unpacking
#     if len(threads[0]) == 11:
#         return threads
    
#     for i, thread in enumerate(threads):
#         if thread[11] == None: continue # Skips elements without a poll

#         decompressed = gzip.decompress(thread[11]).decode()

#         decompressed_json = json.loads(decompressed)
        
#         # DISCUSSIONS PAGE 5 HAS A PROBLEM W THIS.
#         # DUMB JSON THINGS
#         # SEEMS TO ALSO BE HAVING PROBLEMS WITH TITLES THAT HAVE ""S IN THEM.
#         # SHOULD USE json.dumps DIRECTLY !
#         decompressed_json["reponses"] = decompressed_json["reponses"].replace("\"", "'").replace("\n", "").replace("\t", "")
#         # decompressed_json["reponses"] = re.escape(decompressed_json["reponses"].replace("\n", "").replace("\t", ""))
#         # decompressed_json["reponses"] = html.escape(decompressed_json["reponses"].replace("\n", "").replace("\t", ""))
#         threads[i] = thread[:-1] + (decompressed_json,)

#     return threads

def rip_polls(threads: list[tuple]): # not required in the sub pages themselves. Ignoring.
    if len(threads) == 0 or len(threads[0]) == 11:
        return threads
    
    for i, thread in enumerate(threads):
        threads[i] = thread[:-1]

    return threads


PER_PAGE = 20
@Globb.app.route("/forum/forums/<forum_id>", defaults={"page": "page-1"})
@Globb.app.route("/forum/forums/<forum_id>/", defaults={"page": "page-1"})
@Globb.app.route("/forum/forums/<forum_id>/<page>")
@Globb.app.route("/forum/forums/<forum_id>/<page>/")
def forum_subforum(forum_id: str, page: str | None):
    page_int: int = 1
    if page != None:
        try:
            page_int = int(page.replace("page-", ""))
        except:
            return redirect(f"/forum/forums/{forum_id}")
        
    print(f"Page: {page_int}")
    
    forum_id = forum_id.split(".")[0].replace("-", "_")

    if has_invalid_chars(forum_id):
        return "Invalid DB name"
    
    count_query = f"SELECT COUNT(*) FROM {forum_id}"
    count = Globb.connection_forum.execute(count_query).fetchone()[0]
    
    threads_query = f"SELECT * FROM {forum_id} WHERE sticky = false ORDER BY thread_id DESC LIMIT {PER_PAGE} OFFSET {(page_int-1) * PER_PAGE};"
    threads = Globb.connection_forum.execute(threads_query).fetchall()

    # Actual posts only needed on first page, but count of those needed in all pages for the 
    # "Afficher les discussions de x a y sur z" for the z (=count - len(sticky_threads))
    sticky_threads_query = f"SELECT * FROM {forum_id} WHERE sticky = true;"
    sticky_threads = Globb.connection_forum.execute(sticky_threads_query).fetchall()

    base_url = f"/forum/forums/{forum_id}"

    title = "NOT DONE YET (tested for html encoding). "
    desc = "NOT DONE YET EITHER."

    # TODO MISSING:
    # - Properly capitalized username
    # - Last post for each thread (TODO: modify DB for this)
    # - color for prefix
    # - no prefix is marked as "null" on the UI
    # - categories (prefixes list)
    # - proper title for each forum/forums page
    # - proper description for each forum/forums page
    # - custom order (rn only start date)
    # - pinned sub forums on forums (see teams)
    
    return render_template("forum/threads/forum.html",
                           title = title,
                           desc = desc,
                           count = count,
                           current_page = page_int,
                           base_url = base_url,
                           sticky_threads = json.dumps(rip_polls(sticky_threads)),
                           threads = json.dumps(rip_polls(threads))
                           )
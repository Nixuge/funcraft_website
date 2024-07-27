import gzip
from flask import redirect, render_template
from globb import Globb
from utils.db import has_invalid_chars_dots


@Globb.app.route("/forum/threads")
def forum_threads_index():
    return redirect("/forum", code=301) # moved permanently as it doesn't exist.


def unpack_thread_poll(thread: tuple):
    # Basically added the polls after & not on all tables (pretty sure I didn't on tables where there weren't any
    # polls anyways), and so some just don't need any unpacking
    if len(thread) == 11:
        return thread
    
    if thread[11] == None:
        return thread

    decompressed = gzip.decompress(thread[11]).decode()

    return thread[:-1] + (decompressed,)

def unpack_post(post: tuple | list):
    post = list(post)
    for index in (7, 8):
        if post[index] == None: continue
        decompressed = gzip.decompress(post[index]).decode()
        post[index] = decompressed
    
    return post

PER_PAGE = 20
@Globb.app.route("/forum/threads/<thread_id>", defaults={"page": "page-1"})
@Globb.app.route("/forum/threads/<thread_id>/", defaults={"page": "page-1"})
@Globb.app.route("/forum/threads/<thread_id>/<page>")
@Globb.app.route("/forum/threads/<thread_id>/<page>/")
def forum_thread(thread_id: str, page: str | None):
    page_int: int = 1
    if page != None:
        try:
            page_int = int(page.replace("page-", ""))
        except:
            return redirect(f"/forum/forums/{thread_id}", code=301)
        
    print(f"Page: {page_int}")
    
    thread_table = Globb.thread_url_to_table.get(thread_id)
    if not thread_table:
        return render_template("error/404.html"), 404

    # parent thread id should always be valid since we have the above table check, but you never know.
    if has_invalid_chars_dots(thread_id):
        return "Invalid DB name"
    # Same here, still double check
    try:
        thread_id_int = int(thread_id.split(".")[-1])
    except:
        return render_template("error/404.html"), 404
    
    thread_meta_query = f"SELECT * FROM {thread_table} WHERE full_url = 'threads/{thread_id}/';"
    thread_meta = Globb.connection_forum.execute(thread_meta_query).fetchall()[0]

    # TODO: TEST POLL UNPACKING (should work but still) & IMPLEMENT
    print(unpack_thread_poll(thread_meta))

    count_query = f"SELECT COUNT(*) FROM {thread_table} WHERE parent_thread_id = {thread_id_int}"
    count = Globb.connection_forum_posts.execute(count_query).fetchone()[0]
    
    posts_query = f"SELECT * FROM {thread_table} WHERE parent_thread_id = {thread_id_int} ORDER BY post_id ASC LIMIT {PER_PAGE} OFFSET {(page_int-1) * PER_PAGE};"
    posts = Globb.connection_forum_posts.execute(posts_query).fetchall()

    
    for i, post in enumerate(posts):
        posts[i] = unpack_post(post)

    
    return f"""<h1>Bienvenue.</h1> Le site est encore en travaux. Les posts sont tout de même disponibles dès maintenant.<br>
    Liste des propriétés pour chaque post:<ul>
        <li>post_id</li>
        <li>parent_thread_id</li>
        <li>post_number</li>
        <li>post_author_id</li>
        <li>post_author_name</li>
        <li>edit_name</li>
        <li>post_date</li>
        <li>likes (format list[tuple[int, str]] avec int=userid et str=date)</li>
        <li>post_content (peut être affiché format html ici)</li>
    </ul>
    Vous pouvez changer la page en rajoutant /page-X a la fin de l'URL (comme sur le forum original)
    
    <br><br><br>Réponses: {count}, posts: {posts}"""


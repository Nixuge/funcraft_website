import sqlite3


# Quite the dirty fix, basically because otherwise with how I saved everything, I can't derive a table name from a thread url.
def get_url_to_table() -> dict:
    # Making a separate connection to avoid a circular import.
    connection_forum = sqlite3.connect("funcraft_forum.db")
    cursor_forum = connection_forum.cursor()

    res = {}
    
    all_tables = cursor_forum.execute("SELECT name FROM sqlite_master WHERE type='table';").fetchall()
    for table in all_tables:
        table = table[0]
        all_urls = cursor_forum.execute(f"SELECT full_url FROM {table};").fetchall()
        for url in all_urls:
            url: str = url[0]
            if url[-1] == "/":
                url = url[:-1]
            if url.startswith("threads/"):
                url = url[8:]
            res[url] = table

    connection_forum.close()

    return res
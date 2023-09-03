import json
import sqlite3


connection = sqlite3.connect("rankings.db")
tables = connection.cursor().execute("SELECT name FROM sqlite_master WHERE type='table';").fetchall()

final_dict: dict[str, list[str]] = {}

for table in tables:
    game, month = table[0].split("__")
    if not game in final_dict.keys():
        final_dict[game] = []
    final_dict[game].append(month)

with open("months.json", "w") as file: json.dump(final_dict, file)
with open("months.json", "r") as file: content = file.read()
with open("months.json", "w") as file: file.write(content.replace("],", "],\n    ").replace("_", "-"))

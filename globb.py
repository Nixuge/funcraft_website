import os
import sqlite3
from flask import Flask


class Globb:
    app = Flask(
        __name__,
        template_folder=os.path.abspath('web/templates'),
        static_folder=os.path.abspath('web/static')
    )
    connection = sqlite3.connect("funcraft_database.db")
    cursor = connection.cursor()

    connection_rankings = sqlite3.connect("rankings.db")
    cursor_rankings = connection_rankings.cursor()

    game_names = {
        "rush": "Rush MDT",
        "hikabrain": "HikaBrain",
        "skywars": "SkyWars",
        "mma": "Octogone",
        "shootcraft": "ShootCraft",
        "infected": "Infecté",
        "freecube": "FreeCube",
        "blitz": "Blitz",
        "pvpsmash": "PvPSmash",
        "survival": "Survival",
        "rushretro": "Rush RETRO",
        "landrush": "LandRush"
    }

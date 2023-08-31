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
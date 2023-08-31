import os
from flask import Flask


class Globb:
    app = Flask(
        __name__,
        template_folder=os.path.abspath('web/templates'),
        static_folder=os.path.abspath('web/static')
    )
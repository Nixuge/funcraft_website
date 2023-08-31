import os
from flask import Flask
from gevent.pywsgi import WSGIServer

from globb import Globb

import endpoints.catch_all
import endpoints.static_routes
import endpoints.head


if __name__ == "__main__":
    http_server = WSGIServer(('', 15784), Globb.app)
    http_server.serve_forever()
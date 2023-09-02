#!/bin/python3
import os
from flask import Flask
from gevent.pywsgi import WSGIServer

from globb import Globb

import endpoints.catch_all
import endpoints.static_routes
import endpoints.head
import endpoints.joueur
import endpoints.classement


if __name__ == "__main__":
    print("Starting webserver")
    http_server = WSGIServer(('', 15784), Globb.app)
    http_server.serve_forever()
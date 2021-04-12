"""
The main file for python directory api, start the flask here
"""
from flask import Flask

app = Flask(__name__)

from Api import route

"""
Api file main file
"""
from flask import Flask


app = Flask(__name__)

from Api import route

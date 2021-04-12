"""
The main file for python directory api, start the flask here
"""
from flask import Flask


app = Flask(__name__)


if __name__ == "__main__":
    app.run(debug=True)

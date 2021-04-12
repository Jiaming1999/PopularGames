from flask import Flask, jsonify, abort, request
from Api import app
from Scraper import db_helper
from bson import json_util, ObjectId
from Api import my_filter
import json
import sys


@app.route('/')
def home():
    """
    default route for home page
    @return Home page
    """
    return jsonify("Home")


def check_attr(key, value, c_type, docs):
    """
    check get attribute
    @return the list satisfied attribute requirements
    """
    ret = []
    if c_type == 'in':
        for obj in docs:
            if value in obj[key]:
                ret.append(obj)
    elif c_type == 'equal':
        for obj in docs:
            if value == obj[key]:
                ret.append(obj)
    return ret


def execute_get_body(docs_game):
    """
    helper function that execute GET
    """
    title = request.args.get('title')
    genre = request.args.get('genre')
    score = request.args.get('score')
    if title:
        ret_game = check_attr('title', title, 'equal', docs_game)
    elif genre:
        ret_game = check_attr('genre', genre, 'in', docs_game)
    elif score:
        ret_game = check_attr('score', score, 'equal', docs_game)
    else:
        ret_game = docs_game
    return ret_game


@app.route('/popular', methods=['GET'])
def get_popular_game_by_attr():
    """
    get popular game by attribute
    """
    dbh = db_helper.DbHelper()
    docs_game = dbh.fetch_popular_game()
    ret_game = execute_get_body(docs_game)
    ret_sanitized = json.loads(json_util.dumps(ret_game))
    return jsonify(ret_sanitized), 201


@app.route('/top100', methods=['GET'])
def get_top_game_by_attr():
    """
    get top game by attribute
    @return response
    """
    dbh = db_helper.DbHelper()
    docs_game = dbh.fetch_top_game()
    ret_game = execute_get_body(docs_game)
    ret_sanitized = json.loads(json_util.dumps(ret_game))
    return jsonify(ret_sanitized), 201


def execute_update_body(data, dbh, u_type):
    """
    helper function that execute update
    @return response after execution
    """
    if u_type == 'popular':
        if 'thumbnail' in data:
            dbh.update_one_popular_game(id, 'thumbnail', data['thumbnail'])
            response = 'Thumbnail Updated'
        elif 'score' in data:
            dbh.update_one_popular_game(id, 'score', data['score'])
            response = 'Score Updated'
        elif 'review' in data:
            dbh.update_one_popular_game(id, 'review', data['review'])
            response = 'Review Updated'
        else:
            response = 'Nothing Updated'
    elif u_type == 'top':
        if 'thumbnail' in data:
            dbh.update_one_top_game(id, 'thumbnail', data['thumbnail'])
            response = 'Thumbnail Updated'
        elif 'score' in data:
            dbh.update_one_top_game(id, 'score', data['score'])
            response = 'Score Updated'
        elif 'review' in data:
            dbh.update_one_top_game(id, 'review', data['review'])
            response = 'Review Updated'
        else:
            response = 'Nothing Updated'
    return response


@app.route('/popular', methods=['PUT'])
def update_popular_game():
    """
    update popular game state
    @return whether update is a success
    """
    dbh = db_helper.DbHelper()
    game_id = request.args.get('id')

    if not game_id:
        abort(400, "Bad Request: Invalid id input")
    if not request.json:
        abort(400, "Bad Request: Invalid json input")
    data = request.get_json()
    response = execute_update_body(data, dbh, u_type='popular')
    return jsonify(response), 200


@app.route('/top100', methods=['PUT'])
def update_top_game():
    """
    update popular game state
    @return whether update is a success
    """
    dbh = db_helper.DbHelper()
    game_id = request.args.get('id')

    if not game_id:
        abort(400, "Bad Request: Invalid id input")
    if not request.json:
        abort(400, "Bad Request: Invalid json input")
    data = request.get_json()
    response = execute_update_body(data, dbh, 'top')
    return jsonify(response), 200


@app.route('/popular', methods=['POST'])
def insert_popular_game():
    """
    insert one popular game
    @return whether insertion is a success
    """
    dbh = db_helper.DbHelper()
    popular_insert = request.get_json()
    if popular_insert is None:
        abort(400, "Bad Request: Invalid insert game")
    res = dbh.insert_popular_game(popular_insert)
    return jsonify({"Post Acknowledged": bool(res.acknowledged)}), 201


@app.route('/popular', methods=['POST'])
def insert_top_game():
    """
    insert one top game
    @return whether insertion is a success
    """
    dbh = db_helper.DbHelper()
    top_insert = request.get_json()
    if top_insert is None:
        abort(400, "Bad Request: Invalid insert game")
    res = dbh.insert_top_game(top_insert)
    return jsonify({"Post Acknowledged": bool(res.acknowledged)}), 201


@app.route('/popular', methods=['DELETE'])
def delete_popular_game_by_id():
    """
    delete a popular game by game id
    @return whether the delete is successful
    """
    dbh = db_helper.DbHelper()
    docs_popular = dbh.fetch_popular_game()
    game_id = request.args.get('id')
    deleted_doc = None
    for obj in docs_popular:
        if obj['_id'] == ObjectId(game_id):
            deleted_doc = obj
    if deleted_doc is None:
        abort(400, "Bad Request: Invalid delete game")
    res = dbh.delete_popular_game(deleted_doc)
    return jsonify({"Post Acknowledged": bool(res.acknowledged)}), 201


@app.route('/top100', methods=['DELETE'])
def delete_top_game_by_id():
    """
    delete a top100 game by game id
    @return whether the delete is successful
    """
    dbh = db_helper.DbHelper()
    docs_top = dbh.fetch_top_game()
    game_id = request.args.get('id')
    deleted_doc = None
    for obj in docs_top:
        if obj['_id'] == ObjectId(game_id):
            deleted_doc = obj
    if deleted_doc is None:
        abort(404, "Not Found: Invalid delete game")
    res = dbh.delete_top_game(deleted_doc)
    return jsonify({"Post Acknowledged": bool(res.acknowledged)}), 201


@app.route('/filter/popular', methods=['GET'])
def filter_popular_game():
    """
    The filter route that allow api give result based on a certain requirement
    @return: the game information satisfied the requirement
    """
    dbh = db_helper.DbHelper()
    docs_game = dbh.fetch_popular_game()
    filter_type = request.args.get("type")

    if filter_type is None:
        abort(400, "Bad Request: please input filter type")
    if filter_type == "mostgenre":
        res = my_filter.get_most_genre(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'mostplatform':
        res = my_filter.get_most_platform(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'mostdeveloper':
        res = my_filter.get_most_productive_developer(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'leastgenre':
        res = my_filter.get_least_genre(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'leastplatform':
        res = my_filter.get_least_platform(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'leastdeveloper':
        res = my_filter.get_least_productive_developer(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    else:
        abort(404, "Not Found: Invalid filter type")


@app.route('/filter/top100', methods=['GET'])
def filter_top_game():
    """
    The filter route that allow api give result based on a certain requirement
    @return: the game information satisfied the requirement
    """
    dbh = db_helper.DbHelper()
    docs_game = dbh.fetch_top_game()
    filter_type = request.args.get("type")

    if filter_type is None:
        abort(400, "Bad Request: please input filter type")
    if filter_type == "mostgenre":
        res = my_filter.get_most_genre(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'mostplatform':
        res = my_filter.get_most_platform(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'mostdeveloper':
        res = my_filter.get_most_productive_developer(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'leastgenre':
        res = my_filter.get_least_genre(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'leastplatform':
        res = my_filter.get_least_platform(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    elif filter_type == 'leastdeveloper':
        res = my_filter.get_least_productive_developer(docs_game)
        return jsonify({"Status": "success", "response": res}), 201
    else:
        abort(404, "Not Found: Invalid filter type")





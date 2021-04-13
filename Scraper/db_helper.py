"""
data base helper class
"""
import os
import pymongo
from dotenv import load_dotenv
from bson.objectid import ObjectId


load_dotenv()
token = os.getenv("MONGODB_URI")
if not token:
    token = "mongodb://localhost:27020/ign_test"


class DbHelper:
    """
    class for data base helper
    connect to mongoDB database
    """

    def __init__(self):
        """
        constructor for database handler
        """
        self.client = pymongo.MongoClient(token)
        self.db = self.client["ign_test"]
        self.collection = None

    def insert_popular_game(self, post):
        """
        insert one game to popular collection
        :param post: post to insert
        :return: insert status
        """
        self.collection = self.db["popular"]
        return self.collection.insert_one(post)

    def insert_top_game(self, post):
        """
        insert one game to top100 collection
        :param post: post to insert
        :return: insert status
        """
        self.collection = self.db["top100"]
        return self.collection.insert_one(post)

    def delete_popular_game(self, post):
        """
        delete a popular game from database
        :param post:
        :return:
        """
        self.collection = self.db["popular"]
        return self.collection.delete_one(post)

    def delete_top_game(self, post):
        """
        delete a top game from database
        :param post:
        :return:
        """
        self.collection = self.db["top100"]
        return self.collection.delete_one(post)

    def fetch_popular_game(self):
        """
        fetch the popular game from database
        :return: retrived exported MongoDB data from database
        """
        self.collection = self.db["popular"]
        cursor = self.collection.find()
        docs = list(cursor)
        return docs

    def fetch_top_game(self):
        """
        fetch the top game from database
        :return: retrived exported MongoDB data from database
        """
        self.collection = self.db["top100"]
        cursor = self.collection.find()
        docs = list(cursor)
        return docs

    def update_one_popular_game(self, gid, target, value):
        """
        update one popular game
        """
        self.collection = self.db["popular"]
        my_filter = {'_id': ObjectId(gid)}
        return self.collection.update_one(my_filter, {"$set": {target: value}})

    def update_one_top_game(self, gid, target, value):
        """
        update one top game
        """
        self.collection = self.db["top100"]
        my_filter = {'_id': ObjectId(gid)}
        return self.collection.update_one(my_filter, {"$set": {target: value}})

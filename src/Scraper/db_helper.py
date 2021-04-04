import pymongo
from dotenv import load_dotenv
import os

load_dotenv()
token = os.getenv("MONGODB_URL")


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
        self.db = self.client["ign-test2"]
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

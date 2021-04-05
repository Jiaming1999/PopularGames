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
        delete a book from database
        :param post:
        :return:
        """
        self.collection = self.db["popular"]
        return self.collection.delete_one(post)

    def delete_top_game(self, post):
        """
        delete a author from database
        :param post:
        :return:
        """
        self.collection = self.db["top100"]
        return self.collection.delete_one(post)

    def fetch_popular_game(self):
        """
        Tutorial from https://hevodata.com/learn/mongodb-export-to-json/#meth1
        fetch the books from database
        :return: retrived exported MongoDB data from database
        """
        self.collection = self.db["popular"]
        cursor = self.collection.find()
        docs = list(cursor)
        return docs

    def fetch_top_game(self):
        """
        Tutorial from https://hevodata.com/learn/mongodb-export-to-json/#meth1
        fetch the author from database
        :return: retrived exported MongoDB data from database
        """
        self.collection = self.db["top100"]
        cursor = self.collection.find()
        docs = list(cursor)
        return docs

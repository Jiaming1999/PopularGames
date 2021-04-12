import unittest

from Scraper import db_helper
from Scraper import simple_filter


class MyTestCase(unittest.TestCase):
    """
      Unit test for helper function of scrapper
      """
    @classmethod
    def setUpClass(cls):
        cls.dbh = db_helper.DbHelper()

    def test_get_max_popular(self):
        """
        test successfully get popular game greater than 5 score
        :return:
        """
        docs = self.dbh.fetch_popular_game()
        ret_docs = simple_filter.get_max_doc(docs, 6.0)
        for doc in ret_docs:
            self.assertGreater(doc['score'], 6.0)

    def test_get_max_top(self):
        """
        test successfully get top game greater than 9 score
        :return:
        """
        docs = self.dbh.fetch_top_game()
        ret_docs = simple_filter.get_max_doc(docs, 9.0)
        for doc in ret_docs:
            self.assertGreater(doc['score'], 9.0)

    def test_get_category_popular(self):
        """
        test successfully get a certain genre popular game
        :return:
        """
        docs = self.dbh.fetch_popular_game()
        ret_docs = simple_filter.get_category_doc(docs, "RPG")
        for doc in ret_docs:
            self.assertIn("RPG", doc["genres"])

    def test_get_developer_popular(self):
        """
        test successfully get a certain developer popular game
        :return:
        """
        docs = self.dbh.fetch_popular_game()
        ret_docs = simple_filter.get_developer_doc(docs, "Nintendo")
        for doc in ret_docs:
            self.assertIn("Nintendo", doc["developers"])

    def test_get_category_top(self):
        """
        test successfully get a certain category top100 game
        :return:
        """
        docs = self.dbh.fetch_top_game()
        ret_docs = simple_filter.get_category_doc(docs, "Horror")
        for doc in ret_docs:
            self.assertIn("Horror", doc["genres"])

    def test_get_developer_top(self):
        """
        test successfully get a certain developer top100 game
        :return:
        """
        docs = self.dbh.fetch_top_game()
        ret_docs = simple_filter.get_developer_doc(docs, "Capcom")
        for doc in ret_docs:
            self.assertIn("Capcom", doc["developers"])

    def test_get_wrong_developer_top(self):
        """
        test wrong developer is not in the list of top100 game
        :return:
        """
        docs = self.dbh.fetch_top_game()
        ret_docs = simple_filter.get_developer_doc(docs, "Capcom")
        for doc in ret_docs:
            self.assertNotIn("Pixel Maniacs", doc["developers"])

    def test_get_wrong_developer_popular(self):
        """
        test wrong developer is not in the list of popular game
        :return:
        """
        docs = self.dbh.fetch_popular_game()
        ret_docs = simple_filter.get_developer_doc(docs, "Obsidian Entertainment")
        for doc in ret_docs:
            self.assertNotIn("Nintendo", doc["developers"])

    def test_get_wrong_category_popular(self):
        """
        test wrong genre is not in the list of popular game
        :return:
        """
        docs = self.dbh.fetch_popular_game()
        ret_docs = simple_filter.get_category_doc(docs, "Horror")
        for doc in ret_docs:
            self.assertNotIn("Music", doc["genres"])

    def test_get_wrong_category_top(self):
        """
        test wrong genre is not in the list of top100 game
        :return:
        """
        docs = self.dbh.fetch_top_game()
        ret_docs = simple_filter.get_developer_doc(docs, "Nintendo")
        for doc in ret_docs:
            self.assertNotIn("Ubisoft", doc["developers"])


if __name__ == '__main__':
    unittest.main()

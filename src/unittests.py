"""
Unit Tests
"""
import unittest

import db_helper
import main


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
        ret_docs = main.get_max_doc(docs, 6.0)
        for doc in ret_docs:
            assert doc['score'] > 6.0

    def test_get_max_top(self):
        """
        test successfully get top game greater than 9 score
        :return:
        """
        docs = self.dbh.fetch_top_game()
        ret_docs = main.get_max_doc(docs, 9.0)
        for doc in ret_docs:
            assert doc['score'] > 9.0

    def test_get_developer_popular(self):
        docs = self.dbh.fetch_popular_game()
        failure_msg = 'lexer({0}) should return {1} but returned {2}'
        ret_docs = main.get_developer_doc(docs, "Artefacts Studio")
        for doc in ret_docs:
            self.assertIn("Artefacts Studio", doc["developers"], failure_msg.format(doc['title'], "Nintendo", doc["developers"]))


if __name__ == '__main__':
    unittest.main()

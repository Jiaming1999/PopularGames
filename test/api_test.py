import unittest
from Api import app
import json


class MyTestCase(unittest.TestCase):
    def setUp(self) -> None:
        self.app = app.test_client()

    def test_get_popular_limit_50(self):
        """
        test if successfully get 50 popular games
        """
        response = self.app.get('http://127.0.0.1:5000/popular?limit=50')
        self.assertEqual(response.status_code, 201)

    def test_get_top_limit_10(self):
        """
        test if successfully get 10 top100 games
        """
        response = self.app.get('http://127.0.0.1:5000/top100?limit=10')
        self.assertEqual(response.status_code, 201)

    def test_put_popular_score(self):
        """
        test if successfully update score to 8 for popular game with given id
        """
        url = 'http://127.0.0.1:5000/popular?id=6073cc31c53d959a436ba25e'
        response = self.app.put(url, data=json.dumps({'score': 8}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_put_popular_review(self):
        """
        test if successfully update review for popular game with given id
        """
        url = 'http://127.0.0.1:5000/popular?id=6073cc31c53d959a436ba25e'
        response = self.app.put(url, data=json.dumps({'review': 'New Review'}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_put_top_score(self):
        """
        test if successfully update score to 7.9 for top game with given id
        """
        url = 'http://127.0.0.1:5000/top100?id=6073cb9fc53d959a436ba1fa'
        response = self.app.put(url, data=json.dumps({'score': 7.9}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_put_top_review(self):
        """
        test if successfully update review for top game with given id
        """
        url = 'http://127.0.0.1:5000/top100?id=6073cb9fc53d959a436ba1fa'
        response = self.app.put(url, data=json.dumps({'review': 'New Review'}), content_type='application/json')
        self.assertEqual(response.status_code, 200)

    def test_post_popular(self):
        """
        test to insert a new popular game
        """
        test_data = {
            "developers": "Jiaming",
            "editor": "Jiaming Zhang",
            "genres": [
                "Action",
            ],
            "platforms": [
                "iPhone",
                "Android",
            ],
            "rank": 100,
            "release": "July6,2016",
            "review": "test review",
            "score": 7.9,
            "thumbnail": "www.google.com",
            "title": "TestGame"
        }
        url = 'http://127.0.0.1:5000/popular'
        response = self.app.post(url, data=json.dumps(test_data),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_delete_popular(self):
        """
        test to delete a popular game by title
        """
        response = self.app.delete("http://127.0.0.1:5000/popular?title=TestGame")
        self.assertEqual(response.status_code, 201)

    def test_post_top(self):
        """
        test to insert a top100 game
        """
        test_data = {
            "developers": "Jiaming",
            "editor": "Jiaming Zhang",
            "genres": [
                "Action",
            ],
            "platforms": [
                "iPhone",
                "Android",
            ],
            "rank": 101,
            "release": "July6,2016",
            "review": "test review",
            "score": 7.9,
            "thumbnail": "www.google.com",
            "title": "TestGame"
        }
        url = 'http://127.0.0.1:5000/top100'
        response = self.app.post(url, data=json.dumps(test_data),
                                 content_type='application/json')
        self.assertEqual(response.status_code, 201)

    def test_delete_top(self):
        """
        test to delete a top100 game by title
        """
        response = self.app.delete("http://127.0.0.1:5000/top100?title=TestGame")
        self.assertEqual(response.status_code, 201)

    def test_filter_popular_genre(self):
        """
        test to get most common genre in popular games
        """
        response = self.app.get('http://127.0.0.1:5000/filter/popular?type=mostgenre')
        self.assertEqual(response.status_code, 201)

    def test_filter_top_platform(self):
        """
        test to get least common platform in top games
        """
        response = self.app.get('http://127.0.0.1:5000/filter/popular?type=leastplatform')
        self.assertEqual(response.status_code, 201)


if __name__ == '__main__':
    unittest.main()

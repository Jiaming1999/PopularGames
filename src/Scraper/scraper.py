import time
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from urllib.request import Request, urlopen
from urllib.error import HTTPError
from config import SCROLL_PAUSE_TIME, SCROLL_TIMES, GAMES_URL, IGN_URL, TOP_100_GAMES
import sys


"""
Global variable for recent popular
"""
popular_reviews_url_list = []
popular_games_name_list = []
popular_games_url_list = []
popular_reviews_list = []
popular_reviews_author_list = []
popular_games_info_list = []

"""
Global variable for top 100 games
"""
top_games_url_list = []
top_games_name_list = []
top_games_review_list = []
top_games_editor_list = []
top_games_info_list = []

"""
driver set up
"""
driver = webdriver.Chrome(ChromeDriverManager().install())


def get_top_web():
    """
        fetch the data from IGN game reviews of all time top100 games
        :return:
        """
    try:
        driver.get(TOP_100_GAMES)
        last_height = driver.execute_script("return document.body.scrollHeight")
        while True:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(SCROLL_PAUSE_TIME)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
        web_soup = BeautifulSoup(driver.page_source, "lxml")
    finally:
        driver.quit()
    return web_soup


def get_popular_web():
    """
    fetch the data from IGN game reviews popular page
    :return:
    """
    try:
        driver.get(GAMES_URL)
        last_height = driver.execute_script("return document.body.scrollHeight")
        count = 1
        while count < SCROLL_TIMES:
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(SCROLL_PAUSE_TIME)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height
            count += 1
        web_soup = BeautifulSoup(driver.page_source, "lxml")
    finally:
        driver.quit()
    return web_soup


def scrape_top_game_list():
    """
    scrape top 100 games list
    :return:
    """
    web_soup = get_top_web()
    try:
        articles = web_soup.find_all('article')
    except TypeError:
        print('fail to find articles', file=sys.stderr)
        raise TypeError
    for article in articles:
        title = article.div.a.text
        top_games_name_list.append(title)
        url = article.div.a['href']
        if url == '' or "games" not in url:
            tail = title.lower().replace(" ", "-").replace(":", "").replace("(", "").replace(")", "").replace("'", "").replace("é", "e")
            if tail[-1] == '-':
                tail = tail[:-1]
            url = 'https://www.ign.com/games/' + tail
        top_games_url_list.append(url)
        top_games_editor_list.append(article.p.span.text)
        top_games_review_list.append(article.p.text)
    print(top_games_url_list)
    return


def scrape_popular_game_list():
    """
    scrape popular games list
    :return:
    """
    web_soup = get_popular_web()
    try:
        sections = web_soup.find_all('div', class_='content-feed-grid-wrapper')
    except TypeError:
        print("content-feed-grid-wrapper no found", file=sys.stderr)
        raise TypeError
    for section in sections:
        try:
            main_content = section.find('section', class_='main-content')
            game_list = main_content.find_all('div', class_='content-item')
        except TypeError:
            print("game list no found", file=sys.stderr)
            raise TypeError
        for item in game_list:
            popular_games_name_list.append(item.a['aria-label'])
            popular_reviews_url_list.append(IGN_URL + item.a['href'])
    return


def scrape_review(url):
    """
    scrape review based on given url
    :param url: review url page
    :return: single game review page
    """
    review_article = ""
    insert_url = url
    req = Request(insert_url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urlopen(req, timeout=10).read()
    review_soup = BeautifulSoup(response, 'lxml')
    try:
        title = review_soup.find('div', class_='article-object-link')
    except TypeError:
        print('cannot find title', file=sys.stderr)
        raise TypeError
    popular_games_url_list.append(IGN_URL + title.a['href'])
    try:
        author = review_soup.find('section', class_='author-names')
    except TypeError:
        print('cannot find author-page', file=sys.stderr)
        raise TypeError
    popular_reviews_author_list.append(author.a.text)
    try:
        section = review_soup.find('section', class_='article-page')
    except TypeError:
        print('cannot find article-page', file=sys.stderr)
        raise TypeError
    article_parts = section.find_all('p')
    for part in article_parts:
        review_article += part.text
    return review_article


def scrape_popular_reviews():
    """
    scrape popular game reviews from given url lists
    :return:
    """
    for url in popular_reviews_url_list:
        review_article = scrape_review(url)
        popular_reviews_list.append(review_article)
    return


def scrape_game(url, game_title, editor, review, rank=0):
    """
    scrape game information based on given url
    :param rank: the game ranking
    :param url: game page url
    :param game_title: game's name
    :param editor: game's editor
    :param review: game's review
    :return: game information
    """
    insert_url = url
    try:
        req = Request(insert_url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urlopen(req, timeout=10).read()
    except HTTPError:
        game_info = {
            "title": game_title,
            "thumbnail": 'N/A',
            "score": 'N/A',
            "platforms": 'N/A',
            "developers": 'N/A',
            "release": 'N/A',
            "editor": editor,
            "review": review,
            "genres": 'N/A',
            "rank": rank
        }
        return game_info
    review_soup = BeautifulSoup(response, 'lxml')
    try:
        thumbnail = review_soup.find('div', class_='object-thumbnail')
    except TypeError:
        print('fail to get avatar', file=sys.stderr)
        raise TypeError
    avatar_url = thumbnail.span.img['src']
    try:
        score_wrapper = review_soup.find('span', class_='hexagon-content')
    except TypeError:
        print('fail to get score', file=sys.stderr)
        raise TypeError
    try:
        score = float(score_wrapper.text)
    except ValueError:
        score = 'N/A'
    try:
        all_more_meta = review_soup.find('div', class_='more-meta')
        more_metas = all_more_meta.find_all('div')
    except TypeError:
        print('fail to get more meta', file=sys.stderr)
        raise TypeError
    try:
        genres = more_metas[-1].text.split(',')
    except AttributeError:
        genres = ['N/A']
    try:
        all_meta = review_soup.find('div', class_='meta')
        metas = all_meta.find_all('div')
    except TypeError:
        print('fail to get meta', file=sys.stderr)
        raise TypeError
    platforms = metas[0].text.split(',')
    developers = metas[1].text
    release_date = metas[-1].text
    if rank == 0:
        rank = 'N/A'
    game_info = {
        "title": game_title,
        "thumbnail": avatar_url,
        "score": score,
        "platforms": platforms,
        "developers": developers,
        "release": release_date,
        "editor": editor,
        "review": review,
        "genres": genres,
        "rank": rank
    }
    return game_info


def scrape_top_games():
    """
    scrape top 100 games information
    :return:
    """
    index = 0
    for url in top_games_url_list:
        game_title = top_games_name_list[index]
        editor = top_games_editor_list[index]
        review = top_games_review_list[index]
        rank = 100 - index
        game_info = scrape_game(url, game_title, editor, review, rank)
        top_games_info_list.append(game_info)
        print(game_info)
        index += 1
    return


def scrape_popular_games():
    """
    scrape game information from given url lists
    :return: game information
    """
    index = 0
    for url in popular_games_url_list:
        game_title = popular_games_name_list[index]
        editor = popular_reviews_author_list[index]
        review = popular_reviews_list[index]
        game_info = scrape_game(url, game_title, editor, review)
        popular_games_info_list.append(game_info)
        index += 1
    print(popular_games_info_list)
    return popular_games_info_list


def run_scrape_popular():
    """
    run scraper for popular games info
    :return:
    """
    scrape_popular_game_list()
    scrape_popular_reviews()
    scrape_popular_games()


def run_scrape_top():
    """
    run scraper for top games info
    :return:
    """
    scrape_top_game_list()
    scrape_top_games()


run_scrape_top()







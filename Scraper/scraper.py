"""
scraper file for scraping the ign website
"""
import time
from urllib.request import Request, urlopen
from urllib.error import HTTPError
import sys
from bs4 import BeautifulSoup
from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from Scraper.config import SCROLL_TIMES, SCROLL_PAUSE_TIME, GAMES_URL, IGN_URL, TOP_100_GAMES
from Scraper import db_helper


dbh = db_helper.DbHelper()


"""
list to store information for games scraping information
"""
popular_reviews_url_list = []
popular_games_name_list = []
popular_games_url_list = []
popular_reviews_list = []
popular_reviews_author_list = []
popular_games_info_list = []

top_games_url_list = []
top_games_name_list = []
top_games_review_list = []
top_games_editor_list = []
top_games_info_list = []


def get_top_web():
    """
    fetch the data from IGN game reviews of all time top100 games
    :return:
    """
    driver = webdriver.Chrome(ChromeDriverManager().install())
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
    print("scraping popular game web...")
    driver = webdriver.Chrome(ChromeDriverManager().install())
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
    print("scraping top 100 games...")
    web_soup = get_top_web()
    try:
        articles = web_soup.find_all('article')
    except TypeError as no_find_article:
        print('fail to find articles', file=sys.stderr)
        raise TypeError from no_find_article
    for article in articles:
        title = article.div.a.text
        top_games_name_list.append(title)
        url = article.div.a['href']
        if url == '' or "games" not in url:
            tail = title.lower().replace(" ", "-").replace(":", "").\
                replace("(", "").replace(")", "").\
                replace("'", "").replace("é", "e")
            if tail[-1] == '-':
                tail = tail[:-1]
            url = 'https://www.ign.com/games/' + tail
        top_games_url_list.append(url)
        top_games_editor_list.append(article.p.span.text)
        top_games_review_list.append(article.p.text)


def scrape_popular_game_list():
    """
    scrape popular games list
    :return:
    """
    web_soup = get_popular_web()
    try:
        content_feed = web_soup.find_all('div', class_='content-feed-grid-wrapper')
    except TypeError as no_found:
        print("content-feed-grid-wrapper no found", file=sys.stderr)
        raise TypeError from no_found
    for section in content_feed:
        try:
            main_content = section.find('section', class_='main-content')
            game_list = main_content.find_all('div', class_='content-item')
        except TypeError as no_list:
            print("game list no found", file=sys.stderr)
            raise TypeError from no_list
        for item in game_list:
            popular_games_name_list.append(item.a['aria-label'])
            popular_reviews_url_list.append(IGN_URL + item.a['href'])


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
    except TypeError as no_title:
        print('cannot find title', file=sys.stderr)
        raise TypeError from no_title
    popular_games_url_list.append(IGN_URL + title.a['href'])

    try:
        author = review_soup.find('section', class_='author-names')
    except TypeError as no_author:
        print('cannot find author-page', file=sys.stderr)
        raise TypeError from no_author
    popular_reviews_author_list.append(author.a.text)

    try:
        section = review_soup.find('section', class_='article-page')
    except TypeError as no_article:
        print('cannot find article-page', file=sys.stderr)
        raise TypeError from no_article
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
    except TypeError as no_avatar:
        print('fail to get avatar', file=sys.stderr)
        raise TypeError from no_avatar
    avatar_url = thumbnail.span.img['Scraper']

    try:
        score_wrapper = review_soup.find('span', class_='hexagon-content')
    except TypeError as no_score:
        print('fail to get score', file=sys.stderr)
        raise TypeError from no_score

    try:
        score = float(score_wrapper.text)
    except ValueError:
        score = 'N/A'

    try:
        all_more_meta = review_soup.find('div', class_='more-meta')
        more_metas = all_more_meta.find_all('div')
    except TypeError as no_more_meta:
        print('fail to get more meta', file=sys.stderr)
        raise TypeError from no_more_meta

    try:
        genres = more_metas[-1].text.split(':')[1].replace(" ", "").split(',')
    except AttributeError:
        genres = ['N/A']

    try:
        all_meta = review_soup.find('div', class_='meta')
        metas = all_meta.find_all('div')
    except TypeError as no_meta:
        print('fail to get meta', file=sys.stderr)
        raise TypeError from no_meta

    platforms = metas[0].text.split(':')[1].replace(" ", "").split(',')
    developers = metas[1].text.replace(" ", "").split(':')[1]
    release_date = metas[-1].text.replace(" ", "").split(':')[1]
    if rank == 0:
        rank = 100 - score*10 + 1
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
        index += 1


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


def insert_popular():
    """
    Insert popular game data to database
    :return:
    """
    print("inserting popular games...")
    run_scrape_popular()
    for game in popular_games_info_list:
        dbh.insert_popular_game(game)


def insert_top():
    """
    Insert top game data to database
    :return:
    """
    print("inserting top 100 games")
    run_scrape_top()
    for game in top_games_info_list:
        dbh.insert_top_game(game)

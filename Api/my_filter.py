"""
filter file storing function for filter route
"""
import math


def get_max_dict(game_dict):
    """
    helper function return the max value key from the dictionary
    """
    max_value = 0
    max_key = ''
    for key, value in game_dict.items():
        if value >= max_value:
            max_key = key
            max_value = value
    return max_key


def get_min_dict(game_dict):
    """
    helper function return the max value key from the dictionary
    """
    min_value = math.inf
    min_key = ''
    for key, value in game_dict.items():
        if value <= min_value:
            min_key = key
            min_value = value
    return min_key


def get_most_genre(doc):
    """
    get the most popular genre among the game collection above a certain score
    @params:doc: given games list
    @params:score: bar score that filter the result
    @return: the most popular genre
    """
    genre_dict = {}
    for obj in doc:
        genre_list = obj['genres']
        for genre in genre_list:
            if genre in genre_dict:
                genre_dict[genre] += 1
            else:
                genre_dict[genre] = 1
    return get_max_dict(genre_dict)


def get_most_platform(doc):
    """
    get the most popular platform among the game collection above a certain score
    @params:doc: given games list
    @params:score: bar score that filter the result
    @return: the most popular platform
    """
    platform_dict = {}
    for obj in doc:
        platform_list = obj['platforms']
        for platform in platform_list:
            if platform in platform_dict:
                platform_dict[platform] += 1
            else:
                platform_dict[platform] = 1
    return get_max_dict(platform_dict)


def get_most_productive_developer(doc):
    """
    get the most productive developer among the game collection above a certain score
    @params:doc: given games list
    @params:score: bar score that filter the result
    @return: the most productive developer
    """
    game_dict = {}
    for obj in doc:
        developer = obj['developers']
        if developer in game_dict:
            game_dict[developer] += 1
        else:
            game_dict[developer] = 1
    return get_max_dict(game_dict)


def get_least_genre(doc):
    """
    get the least popular genre among the game collection above a certain score
    @params:doc: given games list
    @params:score: bar score that filter the result
    @return: the least popular genre
    """
    genre_dict = {}
    for obj in doc:
        genre_list = obj['genres']
        for genre in genre_list:
            if genre in genre_dict:
                genre_dict[genre] += 1
            else:
                genre_dict[genre] = 1
    return get_min_dict(genre_dict)


def get_least_platform(doc):
    """
    get the least popular platform among the game collection above a certain score
    @params:doc: given games list
    @params:score: bar score that filter the result
    @return: the least popular platform
    """
    platform_dict = {}
    for obj in doc:
        platform_list = obj['platforms']
        for platform in platform_list:
            if platform in platform_dict:
                platform_dict[platform] += 1
            else:
                platform_dict[platform] = 1
    return get_min_dict(platform_dict)


def get_least_productive_developer(doc):
    """
    get the least productive developer among the game collection above a certain score
    @params:doc: given games list
    @params:score: bar score that filter the result
    @return: the least productive developer
    """
    game_dict = {}
    for obj in doc:
        developer = obj['developers']
        if developer in game_dict:
            game_dict[developer] += 1
        else:
            game_dict[developer] = 1
    return get_min_dict(game_dict)

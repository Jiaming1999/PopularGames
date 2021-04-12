"""
filter class for commandline and my database
"""


def get_max_doc(docs, score):
    """
    get doc of game above a score
    :param docs:
    :param score
    :return:
    """
    ret_docs = []
    for doc in docs:
        if doc['score'] == 'N/A':
            continue
        if doc['score'] > score:
            ret_docs.append(doc)
    return ret_docs


def get_developer_doc(docs, developer):
    """
    return doc where developer chosen inside
    :param docs:
    :param developer:
    :return:
    """
    if developer == '':
        return docs
    ret_docs = []
    for doc in docs:
        if developer in doc['developers']:
            ret_docs.append(doc)
    return ret_docs


def get_category_doc(docs, genre):
    """
    return doc for a chosen genre
    :param docs:
    :param genre
    :return:
    """
    if genre == '':
        return docs
    ret_docs = []
    for doc in docs:
        if genre in doc['genres']:
            ret_docs.append(doc)
    return ret_docs


def get_top_from(docs, rank):
    """
    get first top n games
    :param docs:
    :param rank:
    :return:
    """
    if rank <= -1:
        return docs
    ret_docs = []
    for doc in docs:
        if doc['rank'] == 'N/A':
            continue
        if doc['rank'] <= rank:
            ret_docs.append(doc)
    ret_docs.reverse()
    return ret_docs

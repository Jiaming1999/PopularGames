import argparse
import sys
import db_helper

dbh = db_helper.DbHelper()


def set_up_parser():
    """
    Set up cli parser
    :return:
    """
    parser = argparse.ArgumentParser(description='ign website data')
    parser.add_argument('-g', '--get', type=str, help='get data (insert popular or top)')
    parser.add_argument('-m', '--max', type=float, default=0.0, help='return games greater than a score')
    parser.add_argument('-c', '--category', type=str, default='', help='return games of a certain genre')
    parser.add_argument('-d', '--developer', type=str, default='', help='return games of a certain developer')
    return parser.parse_args()


"""
argparse set up
"""
args = set_up_parser()


def start():
    if args.get == 'popular':
        docs = dbh.fetch_popular_game()
    elif args.get == 'top':
        docs = dbh.fetch_top_game()
    else:
        print('please insert either popular or top', file=sys.stderr)
    ret_docs = get_max_doc(docs, args.max)
    ret_docs = get_developer_doc(ret_docs, args.developer)
    ret_docs = get_category_doc(ret_docs, args.category)
    print(ret_docs)


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
    if args.developer == '':
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
    if args.category == '':
        return docs
    ret_docs = []
    for doc in docs:
        if genre in doc['genres']:
            ret_docs.append(doc)
    return ret_docs


if __name__ == '__main__':
    start()

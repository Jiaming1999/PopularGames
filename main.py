"""
The main function with command line interface to scrape and interact with database
"""
import argparse
import sys
from bson.json_util import dumps
from Scraper import db_helper
from Scraper import scraper
from Scraper import simple_filter


dbh = db_helper.DbHelper()


def set_up_parser():
    """
    Set up cli parser
    :return:
    """
    parser = argparse.ArgumentParser(description='ign website data')
    parser.add_argument('-g', '--get', type=str, help='get data (insert popular or top)')
    parser.add_argument('-t', '--top', type=int, default=-1, help='get top n games')
    parser.add_argument('-m', '--max', type=float,
                        default=0.0, help='return games greater than a score')
    parser.add_argument('-c', '--category', type=str,
                        default='', help='return games of a certain genre')
    parser.add_argument('-d', '--developer', type=str,
                        default='', help='return games of a certain developer')
    parser.add_argument('-s', '--scrape', type=str, default='', help='scrape')
    return parser.parse_args()


args = set_up_parser()


def start():
    """
    main function to start the applictaion
    :return:
    """
    if args.scrape == 'popular':
        scraper.insert_popular()
    elif args.scrape == 'top':
        scraper.insert_top()
    elif args.scrape == 'all':
        scraper.insert_top()
        scraper.insert_popular()
    else:
        if args.get == 'popular':
            docs = dbh.fetch_popular_game()
        elif args.get == 'top':
            docs = dbh.fetch_top_game()
        else:
            print('please insert either popular or top', file=sys.stderr)
            sys.exit()
        ret_docs = execute_filter(docs)
        file_name = 'jsonfile/' + args.get + '.json'
        with open(file_name, 'w') as file:
            write_docs = dumps(ret_docs, indent=2)
            file.write(write_docs)
        print('get successfully')


def execute_filter(docs):
    """
    execute simple filters
    """
    ret_docs = simple_filter.get_top_from(docs, args.top)
    ret_docs = simple_filter.get_max_doc(ret_docs, args.max)
    ret_docs = simple_filter.get_developer_doc(ret_docs, args.developer)
    ret_docs = simple_filter.get_category_doc(ret_docs, args.category)
    return ret_docs


if __name__ == '__main__':
    start()

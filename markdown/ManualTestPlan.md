# Manual Test Plan

###  Week 1 for scraping functionality and database

### Pre-Test
My environment:

Python 3.8

pymongo for mongoDB

urllib, webDriver, and selenium for web scraping

python unittest for unittest

#### TC.1 The normal scrape cli
![img.png](../Picture/img.png)
Above command running scrape with -s and an invalid argument, which will 
lead to a warning telling you to insert correctly and also shut down the application

The correct way of scraping popular games from ign.com
```commandline
python3 main.py -s popular
```
Running web driver once command successfully recognized
![img_1.png](../Picture/img_1.png)

#### TC.2 The normal get cli from database
```commandline
python3 main.py -g top
python3 main.py -g popular
```
the result should be

![img.png](../Picture/img_.png)

and creating a corresponding json file in the directory
![img_2.png](../Picture/img_2.png)

This is the example for the popular game information, top100
is the similar way to extract

#### TC.3 The rank filter 

When you run command line
```commandline
python3 main.py -t 10
```
this command line should return you the top 10 rated games in the 
collection.
a successful message
![img_3.png](../Picture/img_3.png)
and json file
![img_4.png](../Picture/img_4.png)
The rank is from top to bottom


#### TC.4 the invalid input for filter
The argparser lib handles the arguments parsing. For example, the type
of -t argument has to be integer
otherwise:

![img_5.png](../Picture/img_5.png)
This message will pop out.
![img_6.png](../Picture/img_6.png)
also invalid input for max attribute

This input has to be type of number

#### TC.5 network failure exception
The cli will handle the failure of networking and sending corresponding warning information
in the terminal and ends the application
![img_7.png](../Picture/img_7.png)
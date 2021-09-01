# sp21-cs242-project
## Popular Games

### Introduction
The project is to build a Mobile App that have access to game
review data from ign.com with score and all sorts of information of
these games.
Week1 update:
Since there is no open source ign.com API found, I web scrape the ign
with scraping software and collect those data.
Stored these data in mongoDB.

### Tools
Python with pymongo and urllib to web scrape.

selenium to emulate the browser work

Flask to host the api server

Api server pushed to herokuapp

React Native with Javascript for mobile app


### Week 1 
Scraping data from ign.com

#### Popular games
scrape from ign website reviews category. This stands for recent reviews made
by ign editors. The popular games can reflect a trend towards nowadays game industry.

#### Top 100 games
scrape from top 100 all time games from ign. These games' information stands for the best
game made all time. With this information we can have an idea which genre or developer is most highly
rated all the time.

### Week2
Building API on heroku

#### GET
Get games information by sending url to api, also supports filter to receive a
conclusion about current trend of the game. Including the most favorable genre, developers and platform.

Support for both popular and top100 collection

#### POST 
Insert a popular game or top100 game into database

#### PUT
Update a popular game or top100 game with provided id

#### DELETE
Delete a popular or top100 game by its title.

More information about the api could be seen in api_spec_doc

live api link: https://ign-trend.herokuapp.com/

### Week3
Building Mobile App Interface

This week is the implementation of interface for game information from both top100 games and popular games trend.

#### Popular Game:
From games collected in popular collection.
Display title, editor, score, release date, platform, genre.
Navigate to review article is possible

#### Top100 Game:
From games collected in top100 collection.
Display title, editor, score, release date, platform, genre.
Navigate to review article is possible

#### Review:
The page display one game detailed review article.

### Week4 Final finishing stage!
Finishing my original planned Mobile App Interface

This week is the implementation of interface for getting the most/least popular genre and platform for people to understand the trend for recent games and top100 games of all time.

#### Popular Trend:
Now you can see what is the most/least favorable choice for genre and platform developers want to develop. By these data you can easily set a goal for what next game should be.

#### Top100 Trend:
Want to make your game more standing out to everybody else? Want your game to be remembered for a long time? Check this page out and see the result of the most favorable genre and platform those most classic game possessed.

### Test:
Snapshot Test for screens componnet

Unit Test for parsing helper

Navigation Test between screens


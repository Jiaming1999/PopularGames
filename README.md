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

### Week 1 
Scraping data from ign.com

#### Popular games
scrape from ign website reviews category. This stands for recent reviews made
by ign editors. The popular games can reflect a trend towards nowadays game industry.

#### Top 100 games
scrape from top 100 all time games from ign. These games' information stands for the best
game made all time. With this information we can have an idea which genre or developer is most highly
rated all the time.
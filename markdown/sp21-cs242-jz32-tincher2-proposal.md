# A Mobile App Game Information Project
Jiaming Zhang (jz32) | Moderator: Bailey Tincher (tincher2)

This is a mobile app about a project for CS242

## "Popular Games"
### Project Purpose
I am thinking of building a mobile app that can help people, both customers and developers to see the mainstream of current video games industry.

### Project Motivation
I am very interested in both video game industry and software developing. I always talked to my game design mentor on what’s the industry trending now. 

## Technical Specification
- Platform: Cross-platform app (React Native)
- Programming Languages: JavaScript /Python for Flask backend and scraping
- Stylistic Conventions: Airbnb JavaScript Style Guide/PEP 8 guide
- SDK: Facebook SDK for React Native
- Databse: MongoDB
- Server: AWS to deploy my REST API
- IDE: Visual Studio Code
- Tools/Interfaces: Mobile devices
- Target Audience: Game developer/audience interested in game industry

## Functional Specification
### Features
- Displaying IGN's recent high score games' information(
  Including title, genre, developer studio, development scale, etc
)
- Displaying recent the most favorable game genre/scale based on the information above.
- Displaying the most favorable game genre/other information of all the time.(or set a filter on time since)
- Displaying review article of game from IGN

### Scope of the project
- There is no intension to build account system for the project, meaning not storaging preference setting and browsing data.
- I hope I can add account and forum/post system in the future to enable users to communicate and comment.
- Scope is to realize the features and display them in mobile app.

## Brief Timeline
- Week 1: Build a scraper to scrape IGN to gather game's information and review article information.
- Week 2: Build a RESTful API to manipulate data in week 1
- Week 3: Build a mobile app with recent top game information and trending/review article for those game along with filter.
- Week 4: Build top game information and review of all time.

## Rubrics
### Week 1
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  Scrapinging games information |  6  |  0: Didn't implement anything <br> 2: implemented top recent game basic function  <br> 3: implemented 1 & related review <br> 4: implemented 1 & 2 & all time game information <br> 6: implemented 1 & 2 & 3 & game related review(all)
|  Connecting to Database |  3  |  0: Didn't implement anything <br> 2: implemented get from database <br> 3: completed function
|  Simple Filter |  2  |  0: Didn't implement anything <br> 1: return recent most highly rated game information <br> 2: return all time most highly rated game information
|  Commandline interface |  2  |  0: Didn't implement anything <br> 1: showing interaction with database<br /> 2: showing how filter works through the CLI<br />
|  Pylint Setup |  2  |  0: Didn't setup pylint <br> -1: Pylint 2 score away from 10<br />
|  Unit Test |  5  |  +0.5 per unittest
|  Manual Test |  5  |  +1 per test

### Week 2
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
| API |  6  |  0 points: Lacks any API<br /> GET<br />+0.5 pt for each of two routes that supports getting either a single recent top game or all time game<br />+0.5 pt for supporting getting either a single recent top game or all time game related view article<br />POST<br />+0.5 pt for each of four routes that supports adding a new game(recent or all time)<br />+0.5 pt for corresponding review article <br />PUT +0.5 pt per route<br />DETELE: +0.5 pt per route<br />-0.5 pt for each wrong return types (200, 400, 415, 404) for each route<br />-0.5 pt for not reporting errors for each route<br />-0.5 pt for not returning valid JSON for each route, including static contents like HTML
|  API Deploy |  2  |  0: Didn't implement anything <br> 2: Deploy the API on AWS
|  Filter |  5  |  0: Didn't implement anything <br> +0.5 per filter keyword supported
|  Pylint Setup |  2  |  0: Didn't setup pylint <br> -1: Pylint 2 score away from 10<br />
|  Unit Test |  6  |  +0.5 per unittest
|  Spec docs |  4  |  -1 per route documentation missing, 0 for no docs at all


### Week 3
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  View Layer |  6  |  0: Didn't implement anything<br /> +1 pt: game stat view are implemented <br />+1 pt: game trend view are implemented<br />+1 pt: Navigation between screens<br />+1 pt: Clean separation between model and view<br />+1 pt: Loading views for both game view and trend view<br />+1 pt: Error handling view for both views
|  Model Interface |  4  |  +2 pt for each recent game/all time game parsing
|  Filter |  2  |  0: Didn't implement anything <br> +1 pt for a keyword filtering
|  Fetching data from API |  3  |  0: Didn't implement anything <br> +1 for each game/trend fetch
|  Unit Test |  4  |  +0.5 pt per unittest
|  Snapshot test |  4  |  +1 pt per screen test<br /> -1 pt: does not mock api call
|  Navigation test |  2  | -1 pt: per screen with navigation test missing


### Week 4
| Category  | Total Score Allocated | Detailed Rubrics                                                            |
|-----------|:---------:|-------------------------------------------------------------------------------|
|  View Layer |  6  |  0: Didn't implement anything<br /> +1 pt: recent game review view are implemented <br />+1 pt: all time game review view are implemented<br />+1 pt: Navigation between screens<br />+1 pt: Clean separation between model and view<br />+1 pt: Loading views for both views<br />+1 pt: Error handling view for both views
|  Model Interface |  4  |  +2 pt for each recent game/all time game reviewe article parsing
|  Filter |  2  |  0: Didn't implement anything <br> +1 pt for a keyword filtering update
|  Fetching data from API |  3  |  0: Didn't implement anything <br> +1 for each review fetch
|  Unit Test |  4  |  +0.5 pt per unittest
|  Snapshot test |  4  |  +1 pt per screen test <br /> -1 pt: does not mock api call
|  Navigation test |  2  | -1 pt: per screen with navigation test missing

### grading cal link
https://drive.google.com/drive/folders/1-8LsYMa5fiFyS9F-6twA2_CWbizgfMnz?usp=sharing

### Proposal Sketch
![RecentGame](../Picture/RecentGame.jpg)
![RecentTrend](../Picture/RecentTrend.jpg)
![ClassicGame](../Picture/ClassicGame.jpg)
![ClassicTrend](../Picture/ClassicTrend.jpg)
![ListPage](../Picture/ListPage.jpg)
![View](../Picture/View.jpg)

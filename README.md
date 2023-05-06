# Portal

## Description

Describe your project in one/two lines.

## User Stories

-  **Homepage:** As an anon/user I want to be able to access the homepage so that I see what the app is about, login and signup.
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start creating posts and saving games
-  **Login:** As a user I want to be able to log in on the webpage so that I can get back to my account
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **User Profile:** As a user I want to be able to see my posts and saved games as a list so that I can read easily
-  **Create Posts** As a user I can add a post of game so that I can share it with the community
-  **List Posts** As a anon/user I want to see the posts so that I can choose one to play
-  **See Details of Posts** As a anon/user I want to see the game details and descriptions of one post so that I can read in detail if I want to play and I comment below the post
-  **Search Games** As a user I want to search games by name so that I know if it´s already in the platform
-  **Save to favorites** As a user I want to add a game to favorite so that I can save the games that I liked the most


## Backlog

Quiz:
- Users can create quiz about game and other users can solve it
  
# Client

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /posts - post list
- /posts/create - create a post of game
- /posts/:id - post detail
- /search - search form
- /search?keyword= - search results
- /quizzes - quiz list to select
- /quizzes/create - create a quiz of game
- /quizzes/:id - quiz detail
- /userProfile/me - my details, my posts and favorite games
- /userProfile/me/gameList - list of all my favorite games
- /userProfile/:id - other user details and her/his posts

- 404

## Pages

- Home Page (public)
- Sign in Page (anon only)
- Log in Page (anon only)
- Post List Page (public)
- Post Create (user only)
- Post Detail Page (user only)
- Search Page (public)
- Search Result Page (public)
- Quiz List Page (public)
- Quiz Create (user only)
- Quiz Detail Page (user only)
- My Profile Page (user only)
- Other User Profile Page (user only)
- 404 Page (public)

## Components

<!-- - Restaurant Card component
  - Input: restaurant: any
  - Output: favorite(restaurantId: string, on: boolean) -->
- Search component
  - Output: change(terms: string)

## IO


## Services

<!-- - Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()
  - auth.getUser() // synchronous -->
<!-- - Restaurant Service
  - restaurant.list()
  - restaurant.create(data)
  - restaurant.detail(id)
  - restaurant.addFavorite(id)
  - restaurant.removeFavorite(id) -->   

# Server

## Models

User model

```
username - String // required
email - String // required & unique
password - String // required
```

Post model

```
title - String // required
author - ObjectID<User> // required
game name - String // required
genre - String // required
review - String // required
image - String
rating - Number // required
date - Date // required
```

Comment model

```
author - ObjectID<User> // required
post - ObjectID<Post> // required
message - String // required
date - Date // required
```

Quiz model

```
author - ObjectID<User> // required
difficulty - String // required
theme - String // required
question - String // required
answer - [String] // required
addedAnswer - [String]
```

List model

```
username - ObjectID<User> // required
listTitle - String // required
game - [String]
```

## API Endpoints/Backend Routes

- GET /auth/me
- POST /auth/signup
  - body:
    - username
    - email
    - password
- POST /auth/login
  - body:
    - username
    - password
- POST /auth/logout
  - body: (empty)
- POST /user/me/favorite
  - body:
    - restaurantId
- DELETE /user/me/favorite/:restaurantId
  - body: (empty)
- GET /restaurant
- POST /restaurant
  - body:
    - name
    - phone
    - address
- GET /restaurant/:id

  

## Links

### Trello/Kanban

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](http://github.com)
[Server repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
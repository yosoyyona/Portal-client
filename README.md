# Portal

## Description

Portal is a website where users create posts and ask questions about video games. Users can sign up to write/read posts, leave comments and create/solve quizzes. We wanted to make a website where users can share the games that they like or dislike.

## User Stories

-  **Homepage:** As an anon/user I want to be able to access the homepage so that I see what the app is about, login and signup.
-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the website so that I can start creating and reading posts
-  **Login:** As a user I want to be able to log in on the webpage so that I can get back to my account
-  **Logout:** As a user I can logout from the platform so no one else can use it
-  **Create Posts** As a user I can add a post of game so that I can share it with the community
-  **Edit Posts** As a user I can edit my posts of game so that I can change the contents.
-  **List Posts** As a user I want to see the posts so that I can choose one to play
-  **See Details of Posts** As a user I want to see the game details and descriptions of one post so that I can read in detail if I want to play and I comment below the post
-  **Search** As a anon/user I want to search keywords of games so that I know if it´s already in the platform


## Backlog

User Profile: 
- see posts and quizzes
- edit username and description

Quiz:
- create, read and solve quizzes about video game
  
About:
- read story about the website

# Client

## Routes

- / - Homepage
- /auth/signup - Signup form
- /auth/login - Login form
- /posts - Post list
- /posts/create - Create a post of game
- /posts/:postId - Post detail
- /posts/:postId/edit - Edit post
- /posts/:postId/comments - Leave a comment about post
- /quizzes - Select quiz
- /quizzes/create - Create a quiz of game
- /quizzes/:quizId - Quiz detail
- /quizzes/:quizId/edit - Edit quiz
- /quizzes/random - Random quiz
- /quizzes/difficulty - Select quiz by difficulty
- /search - Search form
- /userProfile/:userId - My profile or other users' profile, posts and quizzes
- /userProfile/:userId/edit - Edit my profile
- /about - Read about website
- 404

## Pages

- Home Page (public)
- Signup Page (anon only)
- Login Page (anon only)
- Post List Page (user only)
- Post Create Page (user only)
- Post Detail Page (user only)
- Post Edit Page (user only)
- Comment Page (user only)
- Quiz List Page (user only)
- Quiz Create Page (user only)
- Quiz Detail Page (user only)
- Quiz Edit Page (user only)
- Quiz Select page (public)
- Quiz Random Page (user only)
- Quiz Easy Page (user only)
- Quiz Intermediate Page (user only)
- Quiz Hard Page (user only)
- Search Page (public)
- User Page (user only)
- User Edit Page (user only)
- About page (public)
- Error Page (public)

## Components

- Navbar component
- Error component
- IsAnon component
- IsPrivate component
- Post component
- Post Detail component
- Comment componenet
- Quiz component
- Search Post component
- Search Quiz component
- Search User component


## Services

- API Service
  - uploadImage(file)


# Server

## Models

User model

```
email - String // required & unique, lowercase, trim
name - String // required
password - String // required
```

Post model

```
title - String // required
author - ObjectID<User> // required
game name - String // required
genre - String // required
review - String // required
imageUrl - String
rating - Number // required
date - Date
comments - [ObjectID<Comment>]
```

Comment model

```
author - ObjectID<User> // required
post - ObjectID<Post> // required
message - String // required
date - Date
```

Quiz model

```
author - ObjectID<User> // required
question - String // required
genre - String // required
difficulty - String // required
answer - [String] // required
answer2 - [String] // required
answer3 - [String] // required
answer4 - [String] // required
message - [String]
```


## API Endpoints/Backend Routes


### Auth route
- POST /auth/signup
  - body:
    - email
    - name
    - password
- POST /auth/login
  - body:
    - email
    - password
- POST /auth/verify

### User route
- Get /user/:userId
- Get /user/:userId/posts
- Get /user/:userId/quizzes
- Put /user/:userId/edit
  - body:
    - name
    - description

### Post route
- Get /posts
- Get /posts/:postId
- Post /posts/create
  - body:
    - title
    - author
    - gameName
    - genre
    - review
    - rating
    - imageUrl
    - date
- Put /posts/:postId/edit
  - body:
    - title
    - author
    - gameName
    - genre
    - review
    - rating
    - imageUrl
    - date
- Delete /posts/:postId

### Comment route
- Get /posts/:postId/comments
- Post /posts/:postId/comments
  - body:
    - author
    - post
    - message
    - date
- Delete /posts/:postId/comments/:commentId

### Quiz route
- Get /quizzes/all
- Get /quizzes/random
- Get /quizzes/:quizId
- Get /quizzes/difficulty/easy
- Get /quizzes/difficulty/intermediate
- Get /quizzes/difficulty/hard
- Post /quizzes/create
  - body:
    - author
    - question
    - genre
    - difficulty
    - answer
    - answer2
    - answer3
    - answer4
    - message
- Put /quizzes/:quizId/edit
  - body:
    - author
    - question
    - genre
    - difficulty
    - answer
    - answer2
    - answer3
    - answer4
    - message
- Delete /quizzes/:quizId

### Search route
- Get /search


## Links

### Work Board

[Excalidraw Workflow](https://excalidraw.com/#room=40391348256afb894ac5,viuPM37w2xXVjOuKtp4PVQ) 

### Git

[Client repository Link](http://github.com/yosoyyona/Portal-client)
[Server repository Link](http://github.com/ApollineStev/Portal-server)

[Deploy Link](http://portal-project.netlify.app)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1GlpA0romOB_P3_xUrFVCpSKHj77-nGVOJfwwY_eug0U/edit#slide=id.g249c0d27d79_0_2)
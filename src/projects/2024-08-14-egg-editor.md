---
title: Egg Editor
technologies: Express, React, MongoDB
id: egg-editor
featured: true
og: https://na-406607901.imgix.net/egg-editor/egg-editor.png
date: 2024-08-14
---
This project is a group project made for one of my university classes, here is the Github repo: [https://github.com/sonnyding1/CS35L-Egg](https://github.com/sonnyding1/CS35L-Egg)

The Egg Editor has the following features:

- **Profile page**: Users can create their accounts using either email password or Google OAuth. They can also view file created by the user, files like by the user, and edit user name.
- **Edit page**: Users can edit markdown files with LaTeX support. There is also a menu bar at the top of the page, which contains many useful features and shortcut keys, such as undo/redo, bold, italics, math...
- **File management**: Users can create new files, browse existing files, delete files, and search file content. Users can also toggle file visibility between public and private.
- **Community interaction**: Users can like and comment on other users' files. They can also view the specifics of each file.


## Tech Stack

- **Frontend**: JavaScript, React, Tailwind CSS, ShadCN UI, React-Router, React-Markdown
- **Backend**: Node.js, Express, MongoDB, Mongoose, Passport, Swagger

## Structure

The project is a monorepo, with a frontend folder and a backend folder. For the backend, I set up Express as the framework, and we decided to write RESTful API. The bulk of the backend work is populating CRUD operations with our database, in this case, MongoDB. The database contains several collections: users, files, comments. Users collection contains information about registered users. Although we have 2 methods of registering, either through email and password or through Google, each user's info is still stored in the same collection for the sake of brevity.

The frontend uses React and React-Router for creating a multi-page application. Our web app has some pages relating to the "community" aspect of the project, such as community page, profile page. Other pages are related to the "editor" aspect, they are browse page and edit page. The edit page's Markdown rendering is made possible by React Markdown.

I have also set up some GitHub actions that looks for any project breaking code and linting problems. I also experimented with Swagger as the backend documentation, but later we scratched that idea due to time constraint. I do believe Swagger can be a good documentation tool though.

## Auth Pain

I thought log in with Google would be a nice thing to have, so I went on to integrate it into our project. Thanks to Passport.js, it was not too much of a pain, but it was still confusing. Basically, with Passport.js, OAuth 2.0 with Google becomes the following steps:

1. Set up Google authentication strategy on GCP
2. Redirect user to an endpoint handled by Passport, which prompts "log in with Google"
3. After login, user gets redirected to a callback route with their user information
4. Store the information somewhere, in session or database or somewhere else
5. Redirect to home page

## Undo Redo is Kind of Hard



## Demo

![](https://na-406607901.imgix.net/egg-editor/demo-1.png)
![](https://na-406607901.imgix.net/egg-editor/demo-2.png)
![](https://na-406607901.imgix.net/egg-editor/demo-3.png)
![](https://na-406607901.imgix.net/egg-editor/demo-4.png)
![](https://na-406607901.imgix.net/egg-editor/demo-5.png)
![](https://na-406607901.imgix.net/egg-editor/demo-6.png)
![](https://na-406607901.imgix.net/egg-editor/demo-7.png)

## Going Forward

This has been a fun group project. 
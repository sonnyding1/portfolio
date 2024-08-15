---
title: Egg Editor
technologies:
  - Express
  - React
  - MongoDB
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

When I first tried the editor, I typed something then tried Ctrl-Z. Didn't work, because we didn't implement it. So I tried implementing it, but it seems more difficult than I thought.

How to achieve undo redo functionality? My first instinct is to use an array, record the newly typed text once in a while, and then undo removes those text, redo adds them back. Sure, this is probably going to work, but not before we answer 2 questions:

1. When do we save the newly inputted string? Would it be 1 second after the user stopped typing, or would it be once every 1 second, or would it be once per word typed?
2. What to do when an action is not simply adding text? What if the action is deletion, or bolding a piece of text?

Question 1 probably doesn't have a correct answer, I tried to "save" once per 500ms and it felt alright.

Question 2 is more tricky. If the action is deletion, then I need to record the action as "negative that string", which means I probably need another parameter to record if this is an add operation or delete operation. I also need another parameter to save the cursor position. I probably need even more parameters, because there are many strange cases to consider, for example, when we bold a text in Markdown it wraps the selected text with \*\*.

Implementing undo redo in this way would probably cost too much time, so I decided to trade the complexity with space. Instead, I saved the entire Markdown content every 500ms after the user stopped typing, praying the user won't write a huge file for an extended amount of time. This method still requires some work, for example, keeping track of cursor positions, but it is certainly much easier than the first.

Imagine if I want to add collaboration feature just like Google Docs, that would become a nightmare.

## Demo

![](https://na-406607901.imgix.net/egg-editor/demo-1.png)
![](https://na-406607901.imgix.net/egg-editor/demo-2.png)
![](https://na-406607901.imgix.net/egg-editor/demo-3.png)
![](https://na-406607901.imgix.net/egg-editor/demo-4.png)
![](https://na-406607901.imgix.net/egg-editor/demo-5.png)
![](https://na-406607901.imgix.net/egg-editor/demo-6.png)
![](https://na-406607901.imgix.net/egg-editor/demo-7.png)

## Going Forward

This has been a fun group project. There are a few more things I want to do with it though, first of them being hosting it on AWS. Right now it only runs locally. Then, I want to challenge myself and see if it is possible to create the collaboration feature on the editing page. But before that, I should probably rewrite the undo redo feature.

---
title: Interative Math Web App
technologies: Next.js, React.js, MongoDB
id: interactive-math-web-app
featured: true
og: https://na-406607901.imgix.net/math-webapp/math-webapp.png
date: 2023-11-01
---
My interactive math web app has the following features:

*   Generates math exercises (addition, multiplication, factorization) with difficulty selectors
    
*   Experience and level system
    
*   Account system so users can retain their levels
    

## Tech Stack

This project is a fullstack project, I mainly used Next.js. For the UI, I used Tailwind CSS and ShadCN UI. For the login functionality, instead of implementing login and auth functionalities on my own, I used a third party service called [Clerk](https://clerk.com/). I did use MongoDB for storing users' information such as number of problems solved, experience, and so on. To interact with MongoDB, I used an ORM called Prisma.

## Structure

For each problem page (Addition, Multiplication, Factorization), there is a corresponding API endpoint which is in charge of generating math problems, validating user answers.

As for the user's experience points, levels, and number of problems solved, we make request to an API endpoint in the backend, which then makes request to MongoDB. We have to consider 2 different situations: when the user is logged in and when the user is not logged in. If the user is not logged in, then return initial values like `level: 1, problems_solved: 0`. If the user is logged in, then fetch data from database. To ensure low latency and that the level and experience data is accessible everywhere, I also store variables in [Zustand](https://github.com/pmndrs/zustand).

![](https://na-406607901.imgix.net/math-webapp/structure.png)

## Rendering LaTeX

I used MathJax for rendering math equations into LaTeX forms. Specifically, I included MathJax script in root level `layout.tsx`, so now every math block may be rendered as LaTeX math block:

```tsx
<head>
  <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
</head>
```

## Unexpected pain: math input field

Now that I have a system that can generate random math problems, I need to work on the input field. If the problem itself is rendered using LaTeX, of course I would also like the user input field to render LaTeX as well.

But how to accomplish this functionality? I tried to create a preview area, using MathJax to re-render the preview area every time user inputs new characters, but it was not possible. I attempted this:

```tsx
const typeset = (selector: () => HTMLElement) => {
  const mathJax = (window as any).MathJax;
  // If MathJax script hasn't been loaded yet, then do nothing.
  if (!mathJax) {
      return null;
  }
  mathJax.startup.promise = mathJax.startup.promise
      .then(() => {
      selector();
      return mathJax.typesetPromise();
      })
      .catch((err: any) => console.error(`Typeset failed: ${err.message}`));
  return mathJax.startup.promise;
};

const ref = React.createRef<HTMLSpanElement>();
useEffect(() => {
    typeset(() => ref.current!);
}, [problem, answer]);
```

But it was not successful. Then, I tried searching for existing packages that would make good math input fields, and I found [MathLive](https://www.npmjs.com/package/mathlive), just what I needed. I was able to use it by attaching a `Script`, and then use it as such:

```tsx
<math-field
  id='answer'
  onInput={(e: React.ChangeEvent<HTMLInputElement> ) => {
    setUserAnswer(e.target.value);
  }}
>
  {userAnswer}
</math-field>
```

## Demo

![](https://na-406607901.imgix.net/math-webapp/math-web-app-demo.png)

## Going forward

There are a ton of features that I want to add to this web app. First of all, I can easily add a set of new problems, like solving Trigonometry problems, integration, differentiation... Then, I could also introduce a new mode that generates problem sets, and allow PDF export for students to practice on paper. I could also try to make use of the leveling system, such that as users' level become higher, they can get new themes and new problem sets unlocked. I could rewrite my login and auth system. I could also add a landing page, or refactor my code... Anyways, I am acutally very happy with what I've built, and I'd love to devote more time to this project and make it better.
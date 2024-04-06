---
title: Interative Math Web App
technologies: Next.js, React.js, MongoDB
id: interactive-math-web-app
featured: true
og: https://na-406607901.imgix.net/math-webapp/math-webapp.png
date: 2023-11-01
---
Under construction...

My interactive math web app has the following features:

- Generates math exercises (addition, multiplication, factorization) with difficulty selectors
- Experience and level system
- Account system so users can retain their levels

## Tech Stack

This project is a fullstack project, I mainly used Next.js. For the UI, I used Tailwind CSS and ShadCN UI. For the login functionality, instead of implementing login and auth functionalities on my own, I used a third party service called [Clerk](https://clerk.com/). I did use MongoDB for storing users' information such as number of problems solved, experience, and so on. To interact with MongoDB, I used an ORM called Prisma.

## Rendering LaTeX

I used MathJax for rendering math equations into LaTeX forms. Specifically, I included MathJax script in root level `layout.tsx`:

```tsx
<head>
  <Script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" />
</head>
```

And then, in the components that require LaTeX render, I need to apply typesetting after MathJax is loaded:

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

## Unexpected pain: math input field

Now that I have a system that can generate random math problems, I need to work on the input field. If the problem itself is rendered using LaTeX, of course I would also like the user input field to render LaTeX as well. 

But how to accomplish this functionality? 
# Pivo Crossover Developer Study - Experiment Statement

Group: 1
First 2 hours: traditional approach
Last 2 hours: Pivo (evolvable-by-design approach)

## Experiment Prerequisites

Before you start the experiment, please make sure that you have:

- Git installed
- [Node.js](https://nodejs.org) installed
- An IDE that you feel comfortable with to develop in JavaScript with React (such as VS Code)

## Getting Started

Go to the directory where you want to clone the experimentation repository. Then:

```bash
git clone https://github.com/evolvable-by-design/todomvc
cd todomvc
npm install
```

Then, we propose you to choose the paradigm you prefer the most with React: either imperative, i.e. using classes or functional, using React hooks. If you are not familiar with React hooks, we recommend you to go with the class version (imperative paradigm). To select a version, please go to `src/config.js` and configure the `app` field at line 2 with the paradigm you chose.

Then, if you chose the `imperative` paradigm, you can ignore the content of the `src/functional` directory. On the other hand if you chose the `functional` paradigm, you can ignore the content of the `src/imperative` directory.

### Git Management

Please create a new branch for each method (traditional and with pivo): `git checkout -b experiment/{{your-github-name}}/{{method}}` where method is either `pivo` or `traditional`. So, you will do it at the beginning of the experiment and after two hours when you start the implementation with the second approach.

Then within each branch, can you please create one commit per major step, for each version:

1. First implementation
2. Upgrade of the frontend to the REST API evolution 1
3. Upgrade of the frontend to the REST API evolution 2
4. Upgrade of the frontend to the REST API evolution 3
5. Upgrade of the frontend to the REST API evolution 4

### Project Structure

The project is a classic React project. So the root file is `src/index.js` and the main `App` component is in `src/App.jsx`. Yet, you should not need to modify these files.

Concerning the other folders, `commons` contain models and controllers and `functional` and `imperative` contain the React components.

To get started, open the `{{functional or imperative}}/TodoListPage.jsx` file and go to the next section.

## Method 1: traditional

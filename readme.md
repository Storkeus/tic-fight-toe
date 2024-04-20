# Tic Fight Toe
Browser game that is like tic tac toe but with knights, archers, mages and monsters instead of O’s and X’s.

**Work in progress** - this is an early version of planned game.

This game is planned to be a tactical turn-based strategy game. In each turn a player can place one of his fighters on the board. Every fighter has a special ability that is activated when a unit is placed. For example a knight can kill enemy unit near him and an archer can kill enemies away from him. To win the game player must put 3 of his fighters in a row.

*Keep in mind that graphics used currently in the game are mostly temporary. Many of them may not be present in the final game.*

![Basic look of the game](/screenshots/game.png)

## Based on Phaser 3 + TypeScript + Vite.js Template
(https://github.com/ourcade/phaser3-vite-template)

![License](https://img.shields.io/badge/license-MIT-green) (https://github.com/ourcade/phaser3-vite-template/blob/master/LICENSE)

This is a TypeScript specific fork of [phaser3-vite-template](https://github.com/ourcade/phaser3-vite-template).

## Prerequisites

You'll need [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed.

It is highly recommended to use [Node Version Manager](https://github.com/nvm-sh/nvm) (nvm) to install Node.js and npm.

For Windows users there is [Node Version Manager for Windows](https://github.com/coreybutler/nvm-windows).

Install Node.js and `npm` with `nvm`:

```bash
nvm install node

nvm use node
```

Replace 'node' with 'latest' for `nvm-windows`.

## Getting Started

Start development server:

```
npm run start
```

To create a production build:

```
npm run build
```

Production files will be placed in the `dist` folder. Then upload those files to a web server. 🎉

## Project Structure

```
    .
    ├── dist
    ├── node_modules
    ├── public
    ├── src
    │   ├── HelloWorldScene.ts
    │   ├── main.ts
	├── index.html
    ├── package.json
```

TypeScript files are intended for the `src` folder. `main.ts` is the entry point referenced by `index.html`.

## Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served from the root. For example: http://localhost:8000/images/my-image.png

Example `public` structure:

```
    public
    ├── images
    │   ├── my-image.png
    ├── music
    │   ├── ...
    ├── sfx
    │   ├── ...
```

They can then be loaded by Phaser with `this.image.load('my-image', 'images/my-image.png')`.

# TypeScript ESLint

This template uses a basic `typescript-eslint` set up for code linting.

It does not aim to be opinionated.

[See here for rules to turn on or off](https://eslint.org/docs/rules/).

## Dev Server Port

You can change the dev server's port number by modifying the `vite.config.ts` file. Look for the `server` section:

```js
{
	// ...
	server: { host: '0.0.0.0', port: 8000 },
}
```

Change 8000 to whatever you want.

## Blog
I plan to write summaries of my work on this project on my blog:
(https://blog.storkeus.xyz)

## License
[MIT License](https://github.com/Storkeus/tic-fight-toe/blob/master/LICENSE)
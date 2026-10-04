# Memory Game

A card-matching game built for the RS School course. Flip two cards at a time and find all 8 pairs in as few moves as possible.

**Play online:** https://adamksx3.github.io/memory-game/

## Features

- 16 cards (8 pairs), shuffled with the Fisher-Yates algorithm on every new game
- Move counter and found-pairs counter
- Mismatched cards close automatically after 1 second
- "New Game" button resets the board without reloading the page
- Victory window with the number of moves
- Leaderboard with the top 10 results, saved in localStorage

## Tech stack

- HTML, CSS, JavaScript (no libraries)
- All markup is generated with `document.createElement`

## How to run locally

1. Clone the repository: `git clone https://github.com/adamksX3/memory-game.git`
2. Switch to the working branch: `git checkout memory-game`
3. Open the project folder in VS Code and start it with the Live Server extension ("Go Live"), or serve the folder with any other local web server.

The game uses JavaScript modules, so it must be opened through a local server. Opening `index.html` directly as a file will not work.
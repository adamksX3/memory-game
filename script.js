function createElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    } 
    if (text) {
        element.textContent = text;
    }
    return element;
} 

const title = createElement("h1", "title", "Memory Game");
const header = createElement("header", "header");
const newGameButton = createElement("button", "button", "New Game");
const leaderboardButton = createElement("button", "button", "Leaderboard");
const movesCounter = createElement("p", "counter", "Moves: 0");
const pairsCounter = createElement("p", "counter", "Pairs: 0 / 8");
const main = createElement("main", "main");
const board = createElement("div", "board");

header.append(title, newGameButton, leaderboardButton, movesCounter, pairsCounter);
main.append(board);
document.body.append(header, main);
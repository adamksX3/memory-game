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

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createCard(symbol) {
    const card = createElement("button", "card");
    card.dataset.symbol = symbol;
    card.addEventListener('click', () => {
        openCard(card);
    });
    return card;
}

function openCard(card) {
    if (card.classList.contains("card--open")) {
        return;
    }
    card.classList.add("card--open");
    card.textContent = card.dataset.symbol;
}

const title = createElement("h1", "title", "Memory Game");
const header = createElement("header", "header");
const newGameButton = createElement("button", "button", "New Game");
const leaderboardButton = createElement("button", "button", "Leaderboard");
const movesCounter = createElement("p", "counter", "Moves: 0");
const pairsCounter = createElement("p", "counter", "Pairs: 0 / 8");
const main = createElement("main", "main");
const board = createElement("div", "board");

const symbols = ["🚀", "🌙", "⭐", "🔥", "💎", "🎮", "👾", "⚡"];
const deck = [...symbols, ...symbols];

header.append(title, newGameButton, leaderboardButton, movesCounter, pairsCounter);
main.append(board);
document.body.append(header, main);

function startGame() {
    board.replaceChildren();
    shuffle(deck).forEach((symbol) => {
        board.append(createCard(symbol));
    });
}

startGame();
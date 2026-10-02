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
    if (isLocked) {
        return;
    }
    if (card.classList.contains("card--open")) {
        return;
    }
    card.classList.add("card--open");
    card.textContent = card.dataset.symbol;
    if (firstCard === null) {
        firstCard = card;
        return;
    }
    secondCard = card;
    moves++;
    movesCounter.textContent = `Moves: ${moves}`;
    checkPair();
}

function checkPair() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        pairs++;
        pairsCounter.textContent = `Pairs: ${pairs} / 8`;
        firstCard = null;
        secondCard = null;
        return;
    }

    isLocked = true;
    closeTimer = setTimeout(() => {
        closeCard(firstCard);
        closeCard(secondCard);
        firstCard = null;
        secondCard = null;
        isLocked = false;
    }, 1000);
}

function closeCard(card) {
    card.classList.remove("card--open");
    card.textContent = "";
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

let firstCard = null;
let secondCard = null;
let isLocked = false;
let moves = 0;
let pairs = 0;
let closeTimer = null;

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
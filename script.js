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
        if (pairs === 8) {
            showWin();
        }
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

function openModal(titleText,...content) {
    const heading = createElement("h2", "modal-title", titleText);
    const closeButton = createElement("button", "button", "Close");
    closeButton.addEventListener("click", closeModal);
    modal.replaceChildren(heading, ...content, closeButton);
    overlay.classList.add("overlay--open");
}

function closeModal() {
    overlay.classList.remove("overlay--open");
}

function showWin () {
    saveResult();
    const moveWon = createElement("p", "modal-text", `You won in ${moves} moves!`);
    const againButton = createElement("button", "button", "New Game");
    againButton.addEventListener("click", () => {
        closeModal();
        startGame();
    });
    openModal("Victory!", moveWon, againButton);
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}.${date.getFullYear()}`;
}

function loadResults() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) {
        return [];
    }
    return JSON.parse(saved);
}

function saveResult() {
    const results = loadResults();
    results.push({ moves: moves, date: formatDate(new Date()) });
    results.sort((a, b) => a.moves - b.moves);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results.slice(0, 10)));
}

function showLeaderboard() {
    const results = loadResults();
    if (results.length === 0) {
        openModal("Leaderboard", createElement("p", "modal-text", "No results yet"));
        return;
    }
    const list = createElement("ul", "results");
    results.forEach((result, index) => {
        const line = `${index + 1}. ${result.moves} moves, ${result.date}`;
        list.append(createElement("li", "result", line));
    });
    openModal("Leaderboard", list);
}

const title = createElement("h1", "title", "Memory Game");
const header = createElement("header", "header");
const newGameButton = createElement("button", "button", "New Game");
const leaderboardButton = createElement("button", "button", "Leaderboard");
const movesCounter = createElement("p", "counter", "Moves: 0");
const pairsCounter = createElement("p", "counter", "Pairs: 0 / 8");
const main = createElement("main", "main");
const board = createElement("div", "board");
const overlay = createElement("div", "overlay");
const modal = createElement("div", "modal");

const symbols = ["🚀", "🌙", "⭐", "🔥", "💎", "🎮", "👾", "⚡"];
const deck = [...symbols, ...symbols];
const STORAGE_KEY = "memory-game-results";

let firstCard = null;
let secondCard = null;
let isLocked = false;
let moves = 0;
let pairs = 0;
let closeTimer = null;

overlay.append(modal);
header.append(title, newGameButton, leaderboardButton, movesCounter, pairsCounter);
main.append(board);
document.body.append(header, main, overlay);

function startGame() {
    clearTimeout(closeTimer);
    firstCard = null;
    secondCard = null;
    isLocked = false;
    moves = 0;
    pairs = 0;
    movesCounter.textContent = "Moves: 0";
    pairsCounter.textContent = "Pairs: 0 / 8";
    board.replaceChildren();
    shuffle(deck).forEach((symbol) => {
        board.append(createCard(symbol));
    });
}

newGameButton.addEventListener("click", startGame);

leaderboardButton.addEventListener("click", showLeaderboard);

overlay.addEventListener("click", (event) => {
    if (event.target === overlay) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});

startGame();

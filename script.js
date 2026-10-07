import { shuffle } from "./shuffle.js";
import { createElement } from "./factory.js";
import { state } from "./state.js";
import { movesCounter, pairsCounter } from "./dom.js";
import { createCard } from "./cards.js";

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
    const moveWon = createElement("p", "modal-text", `You won in ${state.moves} moves!`);
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
    results.push({ moves: state.moves, date: formatDate(new Date()) });
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
const main = createElement("main", "main");
const board = createElement("div", "board");
const overlay = createElement("div", "overlay");
const modal = createElement("div", "modal");

const symbols = ["🚀", "🌙", "⭐", "🔥", "💎", "🎮", "👾", "⚡"];
const deck = [...symbols, ...symbols];
const STORAGE_KEY = "memory-game-results";

overlay.append(modal);
header.append(title, newGameButton, leaderboardButton, movesCounter, pairsCounter);
main.append(board);
document.body.append(header, main, overlay);

function startGame() {
    clearTimeout(state.closeTimer);
    state.firstCard = null;
    state.secondCard = null;
    state.isLocked = false;
    state.moves = 0;
    state.pairs = 0;
    movesCounter.textContent = "Moves: 0";
    pairsCounter.textContent = "Pairs: 0 / 8";
    board.replaceChildren();
    shuffle(deck).forEach((symbol) => {
        board.append(createCard(symbol, showWin));
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

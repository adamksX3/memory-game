import { shuffle } from "./shuffle.js";
import { createElement } from "./factory.js";
import { state } from "./state.js";
import { movesCounter, pairsCounter, overlay, modal } from "./dom.js";
import { createCard } from "./cards.js";
import { openModal, closeModal } from "./modal.js";
import { saveResult, showLeaderboard } from "./leaderboard.js";

function showWin (onNewGame) {
    saveResult();
    const moveWon = createElement("p", "modal-text", `You won in ${state.moves} moves!`);
    const againButton = createElement("button", "button", "New Game");
    againButton.addEventListener("click", () => {
        closeModal();
        onNewGame();
    });
    openModal("Victory!", moveWon, againButton);
}

const title = createElement("h1", "title", "Memory Game");
const header = createElement("header", "header");
const newGameButton = createElement("button", "button", "New Game");
const leaderboardButton = createElement("button", "button", "Leaderboard");
const main = createElement("main", "main");
const board = createElement("div", "board");

const symbols = ["🚀", "🌙", "⭐", "🔥", "💎", "🎮", "👾", "⚡"];
const deck = [...symbols, ...symbols];

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
        board.append(createCard(symbol, () => showWin(startGame)));
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

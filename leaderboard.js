import { createElement } from "./factory.js";
import { state } from "./state.js";
import { openModal } from "./modal.js";

const STORAGE_KEY = "memory-game-results";

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

export function saveResult() {
    const results = loadResults();
    results.push({ moves: state.moves, date: formatDate(new Date()) });
    results.sort((a, b) => a.moves - b.moves);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(results.slice(0, 10)));
}

export function showLeaderboard() {
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
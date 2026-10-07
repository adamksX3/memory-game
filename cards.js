import { createElement } from "./factory.js";
import { movesCounter, pairsCounter } from "./dom.js";
import { state } from "./state.js";

export function createCard(symbol, onWin) {
    const card = createElement("button", "card");
    card.dataset.symbol = symbol;
    card.addEventListener('click', () => {
        openCard(card, onWin);
    });
    return card;
}

function openCard(card, onWin) {
    if (state.isLocked) {
        return;
    }
    if (card.classList.contains("card--open")) {
        return;
    }
    card.classList.add("card--open");
    card.textContent = card.dataset.symbol;
    if (state.firstCard === null) {
        state.firstCard = card;
        return;
    }
    state.secondCard = card;
    state.moves++;
    movesCounter.textContent = `Moves: ${state.moves}`;
    checkPair(onWin);
}

function checkPair(onWin) {
    if (state.firstCard.dataset.symbol === state.secondCard.dataset.symbol) {
        state.pairs++;
        pairsCounter.textContent = `Pairs: ${state.pairs} / 8`;
        if (state.pairs === 8) {
            onWin();
        }
        state.firstCard = null;
        state.secondCard = null;
        return;
    }

    state.isLocked = true;
    state.closeTimer = setTimeout(() => {
        closeCard(state.firstCard);
        closeCard(state.secondCard);
        state.firstCard = null;
        state.secondCard = null;
        state.isLocked = false;
    }, 1000);
}

function closeCard(card) {
    card.classList.remove("card--open");
    card.textContent = "";
}

import { createElement } from "./factory.js";

export const movesCounter = createElement("p", "counter", "Moves: 0");
export const pairsCounter = createElement("p", "counter", "Pairs: 0 / 8");
export const overlay = createElement("div", "overlay");
export const modal = createElement("div", "modal");
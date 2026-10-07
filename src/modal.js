import { createElement } from "./factory.js";
import { modal, overlay } from "./dom.js";

export function openModal(titleText,...content) {
    const heading = createElement("h2", "modal-title", titleText);
    const closeButton = createElement("button", "button", "Close");
    closeButton.addEventListener("click", closeModal);
    modal.replaceChildren(heading, ...content, closeButton);
    overlay.classList.add("overlay--open");
}

export function closeModal() {
    overlay.classList.remove("overlay--open");
}
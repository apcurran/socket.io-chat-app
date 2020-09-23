"use strict";

// Make connection
const socket = io.connect("https://apcurran-socketio-chat.herokuapp.com/");

const message = document.getElementById("message");
const handle = document.getElementById("handle");
const output = document.getElementById("output");
const chatForm = document.getElementById("chat-form");
const feedback = document.getElementById("feedback");

// Emit events
chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    socket.emit("chat", {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener("keypress", () => {
    socket.emit("typing", handle.value);
})

// Listen for events
socket.on("chat", (data) => {
    // Remove previous "***** is typing" messages
    removeAllChildEls(feedback);

    const paraEl = document.createElement("p");
    const strongEl = document.createElement("strong");
    const spanEl = document.createElement("span");

    strongEl.textContent = `${data.handle}: `;
    spanEl.textContent = data.message;

    paraEl.append(strongEl, spanEl);
    output.append(paraEl);
});

socket.on("typing", (data) => {
    const paraEl = document.createElement("p");
    const emEl = document.createElement("em");

    emEl.textContent = `${data} is typing a message...`;

    paraEl.append(emEl);

    // Remove previous elements in feedback div
    removeAllChildEls(feedback);

    feedback.append(paraEl);
});

function removeAllChildEls(parentEl) {
    while (parentEl.firstChild) {
        parentEl.removeChild(parentEl.firstChild);
    }
}
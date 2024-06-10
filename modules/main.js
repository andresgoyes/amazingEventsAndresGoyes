import * as globals from '../modules/functions.js';

let urlData = "https://aulamindhub.github.io/amazing-api/events.json";
let inputSearch = document.querySelector(".form-control");
let form = document.querySelector("form");
let cardsPlace = document.getElementById("cardsPlace");
let boxCheck = document.querySelector(".checkBox");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputSearch.value.trim() === "") {
        alert("What do you need? Let us help you find it!");
    }
});

fetch(urlData)
    .then(response => response.json())
    .then(data => {
        globals.generateCategoryCheckboxes(data, boxCheck);
        globals.cards(data.events, cardsPlace);
        boxCheck.addEventListener("change", () => globals.filterEvents(inputSearch, data, cardsPlace));
        inputSearch.addEventListener("input", () => globals.filterEvents(inputSearch, data, cardsPlace));
    })
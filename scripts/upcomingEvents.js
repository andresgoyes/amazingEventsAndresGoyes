import { generateCategoryCheckboxes, cards, filterEvents } from './modules.js';

let urlData = "https://aulamindhub.github.io/amazing-api/events.json";
let inputSearch = document.querySelector(".form-control");
let form = document.querySelector("form");
let cardsPlace = document.getElementById("cardsPlace");
let boxCheck = document.querySelector(".checkBox");
let data = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputSearch.value.trim() === "") {
        alert("What do you need? Let us help you find it!");
    }
});

fetch(urlData)
    .then(response => response.json())
    .then(fetchedData => {
        data = fetchedData;
        let nextEvents = data.events.filter(event => new Date(event.date) > new Date(data.currentDate));
        generateCategoryCheckboxes({ events: nextEvents }, boxCheck);
        cards(nextEvents, cardsPlace);
        boxCheck.addEventListener("change", () => filterEvents(inputSearch, { events: nextEvents }, cardsPlace));
        inputSearch.addEventListener("input", () => filterEvents(inputSearch, { events: nextEvents }, cardsPlace));
    })
    .catch(error => console.error('Error fetching data:', error));


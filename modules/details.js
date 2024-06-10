import * as globals from '../modules/functions.js';

let urlData = "https://aulamindhub.github.io/amazing-api/events.json";
let id = new URL(window.location.href).searchParams.get("id");
let container = document.getElementById("eventContainer");

fetch(urlData)
    .then(response => response.json())
    .then(data => {        
        globals.renderEvent(data.events, id, container);
    })




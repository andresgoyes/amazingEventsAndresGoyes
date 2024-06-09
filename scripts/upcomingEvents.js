let urlData = "https://aulamindhub.github.io/amazing-api/events.json";
let urlDetails = new URL("http://localhost:5500/details.html");
let inputSearch = document.querySelector(".form-control");
let form = document.querySelector("form");
let cardsHome = document.getElementById("cardsNext");
let boxCheck = document.querySelector(".checkBox");
let data = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (inputSearch.value == "") {
        alert("What do you need?. Let us help you find it!");
    } else {
        filterEvents();
    }
});

inputSearch.addEventListener("input", filterEvents);

fetch(urlData)
    .then(response => response.json())
    .then(fetchedData => {
        data = fetchedData;
        generateCategoryCheckboxes(data, boxCheck);
        cards(data.events, cardsHome);
    });

function generateCategoryCheckboxes(data, boxCheck) {
    let arrayCategories = [];

    for (let event of data.events) {
        if (event.date > data.currentDate) {
            if (!arrayCategories.includes(event.category)) {
                arrayCategories.push(event.category);
            }
        }
    }

    for (let category of arrayCategories) {
        let inputCheckbox = document.createElement("div");
        inputCheckbox.innerHTML = `
                <input class="form-check-input mt-0 inputCheckbox" id="${category}" type="checkbox" value="${category}" name="${category}" aria-label="${category}">
                <label for="${category}" class="ms-2">${category}</label>`;
        inputCheckbox.className = "input-group-text";
        boxCheck.appendChild(inputCheckbox);
    }

    const checkboxes = document.querySelectorAll("input[type=checkbox]");
    checkboxes.forEach(checkbox => checkbox.addEventListener("change", filterEvents));
}

function cards(array, cardsHome) {
    cardsHome.innerHTML = "";
    for (let event of array) {
        let urlTemp = urlDetails + "?id=" + event._id;
        if (event.date > data.currentDate) {
            let card = document.createElement("div");
            card.innerHTML = `
                <div class="card me-3 my-1 h-100 cards-i" style="width: 18rem">
                    <img src="${event.image}" class="card-img-top" alt="${event.name}" style="height: 20vh; object-fit: cover;"/>
                    <div class="card-body text-center d-flex flex-column justify-content-around">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                        <div class="d-flex justify-content-around align-items-baseline">
                            <p>US ${event.price} USD</p>
                            <a href="${urlTemp}" class="btn go-details">Details</a>
                        </div>
                    </div>
                </div>
            `;
            card.classList.add("my-3");
            cardsHome.appendChild(card);
        }
    }
}

function applyFilters(events, searchText, selectedCheckboxes) {
    let filteredEvents = events.filter(event =>
        event.name.toLowerCase().includes(searchText) ||
        event.description.toLowerCase().includes(searchText)
    );

    if (selectedCheckboxes.length > 0) {
        filteredEvents = filteredEvents.filter(event =>
            selectedCheckboxes.includes(event.category)
        );
    }

    if (filteredEvents.length > 0) {
        cards(filteredEvents, cardsHome);
    } else {
        showAlert("No events match the filters");
    }
}

function filterEvents() {
    const searchText = inputSearch.value.trim().toLowerCase();
    const selectedCheckboxes = [...document.querySelectorAll("input[type=checkbox]:checked")].map(checkbox => checkbox.value);
    applyFilters(data.events, searchText, selectedCheckboxes);
}

function showAlert(message) {
    cardsHome.innerHTML = "";
    const alert = document.createElement("div");
    alert.className = "alert alert-info p-4 my-5";
    alert.setAttribute("role", "alert");
    alert.innerText = message;
    cardsHome.appendChild(alert);
}
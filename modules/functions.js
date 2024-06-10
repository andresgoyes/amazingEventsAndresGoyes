let urlDetails = new URL("http://127.0.0.1:5500/details.html");

export function generateCategoryCheckboxes(data, boxCheck) {
    let arrayCategories = [];
    for (let event of data.events) {
        if (!arrayCategories.includes(event.category)) {
            arrayCategories.push(event.category);
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
}

export function cards(array, cardsPlace) {
    cardsPlace.innerHTML = "";
    for (let event of array) {
        let urlTemp = urlDetails + "?id=" + event._id;
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
        cardsPlace.appendChild(card);
    }
}

export function applyFilters(events, searchText, selectedCheckboxes, cardsPlace) {
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
        cards(filteredEvents, cardsPlace);
    } else {
        showAlert("No events match the filters", cardsPlace);
    }
}

export function filterEvents(inputSearch, data, cardsPlace) {
    let searchText = inputSearch.value.trim().toLowerCase();
    let selectedCheckboxes = [...document.querySelectorAll("input[type=checkbox]:checked")].map(checkbox => checkbox.value);
    applyFilters(data.events, searchText, selectedCheckboxes, cardsPlace);
}

export function showAlert(message, cardsPlace) {
    cardsPlace.innerHTML = "";
    let alert = document.createElement("div");
    alert.className = "alert alert-info p-4 my-5";
    alert.setAttribute("role", "alert");
    alert.innerText = message;
    cardsPlace.appendChild(alert);
}

export function renderEvent(events, id, container) {
    for (let event of events) {
        if (event._id == id) {
            const assistanceText = event.assistance ? `<p><strong>Assistance:</strong> ${event.assistance}</p>` : '';
            const estimateText = event.estimate ? `<p><strong>Estimate:</strong> ${event.estimate}</p>` : '';
            const card = document.createElement("div");
            card.className = "d-flex justify-content-center";
            card.innerHTML = `                      
            <img class="cardDetails rounded-start border-end-0 w-50 object-fit-cover" src="${event.image}" alt="${event.name}">
            <div class="cardDetails rounded-end border-start-0 text-center p-2 d-flex flex-column justify-content-center">               
                <h2 class=" display-4 d-md-none d-lg-block fs-1 text-center"><i><b>${event.name}</b></i></h2>                
                <p><strong>Description:</strong> ${event.description}</p>                    
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Place:</strong> ${event.place}</p>                    
                <p><strong>Category:</strong> ${event.category}</p>
                <p><strong>Capacity:</strong> ${event.capacity}</p>
                ${estimateText}
                ${assistanceText}
                <p><strong>Price:</strong> $${event.price}</p>
            </div>`;
            container.appendChild(card);
        }
    }
}
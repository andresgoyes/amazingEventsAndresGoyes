let id = new URL(window.location.href).searchParams.get("id");
let container = document.getElementById("eventContainer");

fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {
        renderEvent(data.events, id, container);
    })

function renderEvent(events, id, container) {
    for (let event of events) {
        if (event._id == id) {
            const assistanceText = event.assistance ? `<p><strong>Assistance:</strong> ${event.assistance}</p>` : '';
            const estimateText = event.estimate ? `<p><strong>Estimate:</strong> ${event.estimate}</p>` : '';
            const card = document.createElement("div");
            card.className = "d-flex justify-content-center";
            card.innerHTML = `                      
            <img class="cardDetails rounded-start border-end-0 w-50 object-fit-cover" src="${event.image}" alt="${event.name}">
            <div class="cardDetails rounded-end border-start-0 text-center p-2 bg-light d-flex flex-column justify-content-center">               
                <h2>${event.name}</h2>
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

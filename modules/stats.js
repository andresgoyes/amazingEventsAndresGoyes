import * as globals from '../modules/functions.js';
let urlData = "https://aulamindhub.github.io/amazing-api/events.json";

fetch(urlData)
    .then(response => response.json())
    .then(data => {
        let eventHighAssistance = globals.highestAssistance(data.events, data.currentDate);
        let eventLowAssistance = globals.lowestAssistance(data.events, data.currentDate);
        let eventHighCapacity = globals.highCapacity(data.events);
        let eventNameTr = document.getElementById('eventName');
        let eventNumbersTr = document.getElementById('eventNumbers');
        let upcomingTBody = document.getElementById('upcomingTBody');
        let pastEventTBody = document.getElementById('pastEventTBody');
        let statisticsUpcomingEvents = globals.statisticsEvents(globals.filterUpcomingEvents(data.events, data.currentDate));
        let statisticsPastEvents = globals.statisticsEvents(globals.filterPastEvents(data.events, data.currentDate));

        globals.statisticsCells(statisticsUpcomingEvents, upcomingTBody);
        globals.statisticsCells(statisticsPastEvents, pastEventTBody);

        eventNameTr.innerHTML = '';
        globals.appendCell(eventNameTr, eventHighAssistance.name);
        globals.appendCell(eventNameTr, eventLowAssistance.name);
        globals.appendCell(eventNameTr, eventHighCapacity.name);

        eventNumbersTr.innerHTML = '';
        globals.appendCell(eventNumbersTr, eventHighAssistance.percentage + "%");
        globals.appendCell(eventNumbersTr, eventLowAssistance.percentage + "%");
        globals.appendCell(eventNumbersTr, eventHighCapacity.capacity.toLocaleString('es-CO'));
    }
);
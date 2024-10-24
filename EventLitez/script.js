let events = [];

document.getElementById('event-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDate = document.getElementById('event-date').value;
    const eventTime = document.getElementById('event-time').value;
    const eventLocation = document.getElementById('event-location').value;
    const eventDescription = document.getElementById('event-description').value;

    if (eventName && eventDate && eventTime && eventLocation && eventDescription) {
        events.push({
            id: Date.now(),  // Unique ID for each event
            name: eventName,
            date: new Date(`${eventDate}T${eventTime}`), // Combine date and time into a Date object
            location: eventLocation,
            description: eventDescription
        });
        document.getElementById('event-form').reset();
    }
});

document.getElementById('display-events-btn').addEventListener('click', function () {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = ''; // Clear the list before displaying new events

    const currentDate = new Date(); // Get the current date

    // Filter upcoming events based on date
    const upcomingEvents = events.filter(event => event.date >= currentDate);

    if (upcomingEvents.length === 0) {
        eventList.innerHTML = '<p>No upcoming events.</p>';
    } else {
        upcomingEvents.forEach(event => {
            const eventItem = document.createElement('div');
            eventItem.classList.add('event');

            const eventTitle = document.createElement('h3');
            eventTitle.textContent = `${event.name} - ${event.date.toDateString()} ${event.date.toLocaleTimeString()}`; // Format date and time

            const eventLocation = document.createElement('p');
            eventLocation.innerHTML = `<strong>Location:</strong> ${event.location}`;

            const eventDesc = document.createElement('p');
            eventDesc.innerHTML = `<strong>Description:</strong> ${event.description}`;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.onclick = () => deleteEvent(event.id);  // Attach delete function

            eventItem.appendChild(eventTitle);
            eventItem.appendChild(eventLocation);
            eventItem.appendChild(eventDesc);
            eventItem.appendChild(deleteButton);

            eventList.appendChild(eventItem);
        });
    }

    eventList.style.display = 'block'; // Show the event list when button is clicked
});

function deleteEvent(eventId) {
    events = events.filter(event => event.id !== eventId);
    document.getElementById('display-events-btn').click(); // Refresh the list after deletion
}

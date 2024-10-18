// Maak een WebSocket-verbinding
const socket = new WebSocket('ws://localhost:3000');

// Wanneer de WebSocket opent
socket.onopen = function () {
    console.log('Verbonden met WebSocket server');
};

// Wanneer een bericht wordt ontvangen via de WebSocket
socket.onmessage = function (event) {
    const data = JSON.parse(event.data);

    // Bijwerken van actieve routes
    if (data.type === 'routes') {
        updateActieveRoutesUI(data.routes);
    }

    // Pop-up melding voor alle gebruikers
    if (data.type === 'melding') {
        showMeldingPopup(data.bericht, data.ontvanger);
    }
};

// Functie om de UI van actieve routes bij te werken
function updateActieveRoutesUI(routes) {
    const actieveRoutesDiv = document.getElementById('actieveRoutes');
    actieveRoutesDiv.innerHTML = '';

    if (routes.length === 0) {
        actieveRoutesDiv.innerHTML = '<p>Geen actieve routes op dit moment.</p>';
    } else {
        routes.forEach(route => {
            const routeElement = document.createElement('p');
            routeElement.textContent = `Chauffeur: ${route.chauffeur}, Bus: ${route.busNummer}, Route: ${route.routeNummer}`;
            actieveRoutesDiv.appendChild(routeElement);
        });
    }
}

// Ritbeheer Formulier
document.getElementById('ritbeheerForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const busNummer = document.getElementById('busNummer').value;
    const routeNummer = document.getElementById('routeNummer').value;
    const chauffeur = document.getElementById('chauffeur').value;

    // Stuur route-informatie naar de WebSocket server
    socket.send(JSON.stringify({ type: 'route', busNummer, routeNummer, chauffeur }));

    // Reset het formulier
    document.getElementById('ritbeheerForm').reset();
});

// Melding versturen via de WebSocket
document.getElementById('meldingForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const bericht = document.getElementById('bericht').value;
    const ontvanger = document.getElementById('ontvanger').value;

    // Stuur de melding naar de WebSocket server
    socket.send(JSON.stringify({ type: 'melding', bericht, ontvanger }));

    // Reset het formulier
    document.getElementById('meldingForm').reset();
});

// Pop-up melding functie
function showMeldingPopup(bericht, ontvanger) {
    const popup = document.createElement('div');
    popup.className = 'melding-popup';
    popup.textContent = `Melding voor ${ontvanger}: ${bericht}`;
    document.body.appendChild(popup);

    // Verwijder de pop-up na 5 seconden
    setTimeout(() => {
        popup.remove();
    }, 5000);
}

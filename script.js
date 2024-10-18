// Lijst met actieve routes
let actieveRoutes = [];

// Functie om de status van actieve routes weer te geven
function updateActieveRoutes() {
    const actieveRoutesDiv = document.getElementById('actieveRoutes');
    actieveRoutesDiv.innerHTML = '';

    if (actieveRoutes.length === 0) {
        actieveRoutesDiv.innerHTML = '<p>Geen actieve routes op dit moment.</p>';
    } else {
        actieveRoutes.forEach(route => {
            const routeElement = document.createElement('p');
            routeElement.textContent = `Chauffeur: ${route.chauffeur}, Bus: ${route.busNummer}, Route: ${route.routeNummer}`;
            actieveRoutesDiv.appendChild(routeElement);
        });
    }
}

// Ritbeheer Formulier
document.getElementById('ritbeheerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const busNummer = document.getElementById('busNummer').value;
    const routeNummer = document.getElementById('routeNummer').value;
    const chauffeur = document.getElementById('chauffeur').value;

    // Voeg de route toe aan de lijst met actieve routes
    actieveRoutes.push({ busNummer, routeNummer, chauffeur });

    // Update de weergave van de actieve routes
    updateActieveRoutes();

    // Hier zou een API-aanroep moeten komen naar Roblox of een backend om de bus en route te verwerken
    fetch('https://api.jouwserver.com/route-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ busNummer, routeNummer, chauffeur })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('statusBericht').textContent = 'Bus succesvol toegewezen aan route ' + routeNummer;
    })
    .catch(error => {
        document.getElementById('statusBericht').textContent = 'Er ging iets mis: ' + error.message;
    });

    // Reset het formulier
    document.getElementById('ritbeheerForm').reset();
});

// Melding versturen via Discord Webhook
document.getElementById('meldingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const bericht = document.getElementById('bericht').value;
    const ontvanger = document.getElementById('ontvanger').value;

    // Vervang met je eigen Discord Webhook URL
    const webhookURL = '';

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: `Melding voor ${ontvanger}: ${bericht}` })
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('meldingStatus').textContent = 'Bericht succesvol verstuurd!';
        } else {
            throw new Error('Mislukt om bericht te versturen.');
        }
    })
    .catch(error => {
        document.getElementById('meldingStatus').textContent = 'Er ging iets mis: ' + error.message;
    });

    // Reset het formulier
    document.getElementById('meldingForm').reset();
});

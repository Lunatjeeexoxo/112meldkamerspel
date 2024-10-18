// Ritbeheer Formulier
document.getElementById('ritbeheerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const busNummer = document.getElementById('busNummer').value;
    const routeNummer = document.getElementById('routeNummer').value;

    // Hier zou een API-aanroep moeten komen naar Roblox of een backend om de bus en route te verwerken
    // Voorbeeld API-aanroep (deze moet worden aangepast naar je eigen server of Roblox API)
    fetch('https://api.jouwserver.com/route-management', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ busNummer, routeNummer })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('statusBericht').textContent = 'Bus succesvol toegewezen aan route ' + routeNummer;
    })
    .catch(error => {
        document.getElementById('statusBericht').textContent = 'Er ging iets mis: ' + error.message;
    });
});

// Melding versturen via Discord Webhook
document.getElementById('meldingForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const bericht = document.getElementById('bericht').value;

    // Vervang met je eigen Discord Webhook URL
    const webhookURL = 'https://discord.com/api/webhooks/YOUR_WEBHOOK_URL';

    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: bericht })
    })
    .then(response => {
       

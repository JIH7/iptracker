var map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
}).setView([41.905062, -87.692431], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
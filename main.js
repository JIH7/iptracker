//Prevent scrolling because it is jank
window.onscroll = () => {
    window.scrollTo(0, 0);
};



let map = L.map('map', {
    zoomControl: false,
    attributionControl: false,
}).setView([41.905062, -87.692431], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

let locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize: [40, 50],
    iconAnchor: [23, 56],
    popupAnchor: [-3, -76],
});


const apiLink = 'https://geo.ipify.org/api/v2/country,city?apiKey=at_cZaGEutubEYwU36YA7lZO1HhS69Ad&';
//References to our text fields
const ipText = document.querySelector("#ip");
const locationText = document.querySelector("#location");
const timezoneText = document.querySelector("#timezone");
const ispText = document.querySelector("#isp");
const errText = document.querySelector("#errText");
//Reference to input
const inputField = document.querySelector("#inputField");

//Detect enter pressed on input field
inputField.addEventListener("keyup", async (event) => {
    if (event.key === "Enter") {
      await FetchData(inputField.value);
    }
  });

const inputButton = document.querySelector("#inputButton");

//Detect button click
inputButton.addEventListener('click', async () => {
    await FetchData(inputField.value);
});

//Check if input only contains numbers and dots
const IsIp = (input) => {
    const splitInput = input.split('');
    const pattern = new RegExp("[0-9.]");

    let isGood = true;

    splitInput.forEach((el) => {
        if(!pattern.test(el))
            isGood = false;
    });

    return isGood;
};

//Fetch API data and write to DOM
const FetchData = async (input) => {
    errText.innerText = "";
    let linkParam;
    if(IsIp(input)) {
        linkParam = 'ipAddress=';
    } else {
        linkParam = 'domain=';
    }

    let res = await fetch(apiLink + linkParam + input);
    let data = await res.json();

    if (data.code) {
        errText.innerText = `Error code ${data.code}. ${data.messages}`;
        ipText.innerText = '';
        locationText.innerText = '';
        timezoneText.innerText = '';
        ispText.innerText = '';
        return;
    }
    console.log(data);

    ipText.innerText = data.ip;
    locationText.innerText = `${data.location.city}, ${data.location.region} ${data.location.postalCode}`;
    timezoneText.innerText = `UTC ${data.location.timezone}`;
    ispText.innerText = data.isp;

    map.setView([data.location.lat, data.location.lng], 14);
    L.marker([data.location.lat, data.location.lng], {icon: locationIcon}).addTo(map);
}
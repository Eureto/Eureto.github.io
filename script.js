let mapTheme = "mapbox/dark-v10"
let selectedHour = null;
let cacheSelectedHour = null;
let selectedDay = 0;

function Start() {
    // let date = new Date('January 19, 2010 23:15:30');
    let date = new Date();

    let hour = date.getHours();

    if (hour < 21 && hour > 7) {
        loadLightTheme();
    } else {
        loadDarkTheme();
    }
    setInterval(showTime, 1000);
    //zapytanie o lokalizacje
    navigator.geolocation.getCurrentPosition(getLatLon, UserLocationDenied);

}

function showTime() {
    let localTime = new Date();

    let day = (localTime.getDay()) - selectedDay;
    if (day < 0) day = 6;
    if (day > 6) day = 0;
    switch (day) {
        case 0:
            document.getElementById("day").innerHTML = "Nd.";
            break;
        case 1:
            document.getElementById("day").innerHTML = "Pn.";
            break;
        case 2:
            document.getElementById("day").innerHTML = "Wt.";
            break;
        case 3:
            document.getElementById("day").innerHTML = "Śr.";
            break;
        case 4:
            document.getElementById("day").innerHTML = "Czw.";
            break;
        case 5:
            document.getElementById("day").innerHTML = "Pt.";
            break;
        case 6:
            document.getElementById("day").innerHTML = "So.";
            break;
    }

    if (selectedHour != null) {
        if (cacheSelectedHour == selectedHour) {
            document.getElementById("hour").innerHTML = selectedHour;
        } else {
            if (selectedHour < 10) {
                selectedHour = "0" + selectedHour;
            }
            selectedHour = selectedHour + ":";
            document.getElementById("hour").innerHTML = selectedHour;
            cacheSelectedHour = selectedHour;
        }
    } else {
        let hour = localTime.getHours();
        if (hour < 10) {
            hour = "0" + hour;
        }
        hour = hour + ":";
        document.getElementById("hour").innerHTML = hour;
    }
    let minute = localTime.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    }
    minute = minute + ":";
    document.getElementById("minute").innerHTML = minute;


    let second = localTime.getSeconds();
    if (second < 10) {
        second = "0" + second;
    }
    document.getElementById("second").innerHTML = second;


}

function loadDarkTheme() {


}

function loadLightTheme() {
    document.getElementById('LeftSide').style.backgroundColor = "#f4f4f1";
    document.getElementById('RightSide').style.backgroundColor = "#f4f4f1";
    document.getElementById('dot').style.backgroundColor = "#343332";
    document.getElementById('ChangeLocationButton').style.borderColor = "#343332";
    document.getElementById('earthIcon').src = '/icons/white-24dp/1x/outline_public_white_24dp.png';

    mapTheme = "mapbox/light-v10";
}

function ShowHideMap() {

    let leftSide = document.getElementById("LeftSide");

    if (document.getElementById("dot").style.left == "20px") {
        document.getElementById("dot").style.left = "0px";
    } else {
        document.getElementById("dot").style.left = "20px";
    }

    if (leftSide.style.width == "100vw") {
        leftSide.style.width = "50vw";
    } else {
        leftSide.style.width = "100vw";
    }

}

async function getTimeZone(lat, lng) {
    //let urlGeoNames = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=test1001`;
    let urlAskGeo = `https://api.askgeo.com/v1/3184/15d3f88ebfda51723889e9ce993da47e897fb09407fd60d2a1377a54d658e186/query.json?databases=TimeZone&points=${lat}%2C${lng}`;
    let urlProxy = 'https://cors-anywhere.herokuapp.com/';

    try {
        let response = await fetch(urlProxy + urlAskGeo);
        let JSON = await response.json();
        if (response.ok) {
            let MSecOffset = JSON.data["0"].TimeZone.CurrentOffsetMs;
            let hoursOffset = MSecOffset / 3600000;
            let utcHour = new Date().getUTCHours();
            selectedHour = hoursOffset + utcHour;
            if (selectedHour < 0) {
                selectedHour = 24 + selectedHour;
                selectedDay = 1;

            } else if (selectedHour > 23) {
                selectedHour = Math.abs(24 - selectedHour);
                selectedDay = -1;
            } else {
                selectedDay = 0;
            }
        }
    } catch (err) {
        let confirmRedirect = confirm(`Aby skorzystać z wszystkich funkcji strony należy udać sie pod adres https://cors-anywhere.herokuapp.com/ i klikąć w przycik :)
        Czy chcesz udać się pod ten adres ?`);
        if (confirmRedirect == true) {
            window.location = "https://cors-anywhere.herokuapp.com/";
        } else {
            alert("Nie możesz skorzystac z wszystkich funkcji");
        }
        console.error(err.message);
    }
}


function LoadMap(lat, lng) {

    var map = L.map('map', {
        'worldCopyJump': true
    }).setView([lat, lng], 10);

    var tiles = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 20,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: mapTheme,
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 2
    }).addTo(map);

    var marker = L.marker([lat, lng]).addTo(map);

    map.on('click', onMapClick);

    function onMapClick(e) {
        marker.setLatLng(e.latlng);
        getTimeZone(e.latlng.lat, e.latlng.lng);
    }

}

function getLatLon(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    LoadMap(latitude, longitude);
}

async function UserLocationDenied(error) {
    //Jeśli uzytkownik nie zgodzi sie na udostępnienie lokalizacji to na mapie pokaze sie likalizacja stolicy panstwa w ktorym jest
    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let timeZoneArr = timeZone.split('/');
    let capital = timeZoneArr[1];
    let continent = timeZoneArr[0];
    let cord, lng, lat;
    let response = await fetch(`/JSON/${continent}.json`);
    let JSON = await response.json();
    if (response.ok) {
        console.log(JSON);
        console.log(response);
        let JSONlen = JSON.length;
        for (let i = 0; i <= JSONlen; i++) {
            if (JSON[i].properties.capital == capital) {
                cord = JSON[i].geometry.coordinates;
                break;
            }
        }
        lng = cord[0];
        lat = cord[1];
    } else {
        lat = 0;
        lng = 0;
    }
    LoadMap(lat, lng);

    switch (error.code) {
        case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.")
            break;
        case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            break;
    }
}
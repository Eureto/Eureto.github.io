let mapTheme = "mapbox/dark-v10"
let CORSPromptOccured = false;
let timeOffset = 0;
let showLocalTimeInterval;
let firstTimeChangeMinuteFunction = true;
let firstTimeChangeSecondFunction = true;
let firstTimeChangeHourFunction = true;
let currentM = 3, currentH = 3, currentS = 3;
let prevM, prevS, prevH;
let min = [], sec = [], hour = [];

function Start() {
    let date = new Date('January 19, 2010 20:15:30');
    // let date = new Date();

    let hour = date.getHours();

    if (hour < 21 && hour > 7) {
        loadLightTheme();
    } else {
        loadDarkTheme();
    }
    showLocalTimeInterval = setInterval(ShowLocalTime, 1);
    //zapytanie o lokalizacje
    navigator.geolocation.getCurrentPosition(getLatLon, UserLocationDenied);

}

function ChangeSecond(s) {

    if (firstTimeChangeSecondFunction) {
        a = currentS - 2;
        b = currentS - 1;
        c = currentS;
        if (a == (-1)) {
            a = 2;
            b = 3
        }
        if (a == 0) a = 3;

        sec[a] = s + 1;
        sec[b] = s;
        sec[c] = s - 1;

        if (sec[a] > 59) {
            sec[a] = '0';
        }
        if (sec[a] < 10) {
            sec[a] = '0' + sec[a];
        }
        if (sec[b] < 10) {
            sec[b] = '0' + sec[b];
        }
        if (sec[c] < 0) {
            sec[c] = 59;
        }
        if (sec[c] < 10) {
            sec[c] = '0' + sec[c];
        }


        document.getElementById('second-1').innerHTML = sec[1];
        document.getElementById('second-2').innerHTML = sec[2];
        document.getElementById('second-3').innerHTML = sec[3];

        firstTimeChangeSecondFunction = false;
    } else {
        if (prevS != s) {
            document.getElementById('second-1').style.animationPlayState = "running";
            document.getElementById('second-2').style.animationPlayState = "running";
            document.getElementById('second-3').style.animationPlayState = "running";
            sec[currentS] = s + 1;
            if (sec[currentS] < 10) {
                sec[currentS] = '0' + sec[currentS];
            } else if (sec[currentS] == 60) {
                sec[currentS] = "00";
            }
            document.getElementById(`second-${currentS}`).innerHTML = sec[currentS];
            currentS--;
            if (currentS < 1) {
                currentS = 3;
            }
        }
    }
    prevS = s;
}

function ChangeMinute(m) {

    if (firstTimeChangeMinuteFunction) {
        a = currentM - 2;
        b = currentM - 1;
        c = currentM;
        if (a == (-1)) {
            a = 2;
            b = 3
        }
        if (a == 0) a = 3;

        min[a] = m + 1;
        min[b] = m;
        min[c] = m - 1;

        if (min[a] > 59) {
            min[a] = '0';
        }
        if (min[a] < 10) {
            min[a] = '0' + min[a];
        }
        if (min[b] < 10) {
            min[b] = '0' + min[b];
        }
        if (min[c] < 0) {
            min[c] = 59;
        }
        if (min[c] < 10) {
            min[c] = '0' + min[c];
        }


        document.getElementById('minute-1').innerHTML = min[1];
        document.getElementById('minute-2').innerHTML = min[2];
        document.getElementById('minute-3').innerHTML = min[3];

        firstTimeChangeMinuteFunction = false;
    } else {
        if (prevM != m) {
            document.getElementById('minute-1').style.animationPlayState = "running";
            document.getElementById('minute-2').style.animationPlayState = "running";
            document.getElementById('minute-3').style.animationPlayState = "running";
            min[currentM] = m + 1;
            if (min[currentM] < 10) {
                min[currentM] = '0' + min[currentM];
            } else if (min[currentM] == 60) {
                min[currentM] = "00";
            }
            document.getElementById(`minute-${currentM}`).innerHTML = min[currentM];
            currentM--;
            if (currentM < 1) {
                currentM = 3;
            }
        }
    }
    prevM = m;
}

function ChangeHour(h) {

    if (firstTimeChangeHourFunction) {
        a = currentH - 2;
        b = currentH - 1;
        c = currentH;
        if (a == (-1)) {
            a = 2;
            b = 3
        }
        if (a == 0) a = 3;

        hour[a] = h + 1;
        hour[b] = h;
        hour[c] = h - 1;

        if (hour[a] < 10) {
            hour[a] = '0' + hour[a];
        }
        if (hour[a] > 23) {
            hour[a] = '00';
        }
        if (hour[b] < 10) {
            hour[b] = '0' + hour[b];
        }
        if (hour[c] < 0) {
            hour[c] = 23;
        }
        if (hour[c] < 10) {
            hour[c] = '0' + hour[c];
        }


        document.getElementById('hour-1').innerHTML = hour[1];
        document.getElementById('hour-2').innerHTML = hour[2];
        document.getElementById('hour-3').innerHTML = hour[3];

        firstTimeChangeHourFunction = false;
    } else {
        if (prevH != h) {
            document.getElementById('hour-1').style.animationPlayState = "running";
            document.getElementById('hour-2').style.animationPlayState = "running";
            document.getElementById('hour-3').style.animationPlayState = "running";
            hour[currentH] = h + 1;
            if (hour[currentH] < 10) {
                hour[currentH] = '0' + hour[currentH];
            } else if (hour[currentH] == 24) {
                hour[currentH] = "00";
            }
            document.getElementById(`hour-${currentH}`).innerHTML = hour[currentH];
            currentH--;
            if (currentH < 1) {
                currentH = 3;
            }
        }
    }
    prevH = h;
}

function ShowLocalTime() {
    let localTime = new Date();

    let day = localTime.getDay();
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

    let hour = localTime.getHours();
    ChangeHour(hour);

    let minute = localTime.getMinutes();
    ChangeMinute(minute);

    let second = localTime.getSeconds();
    ChangeSecond(second);

}

function ShowSelectedTime() {
    let utc = new Date();
    let utcDate = new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate(), utc.getUTCHours(), utc.getUTCMinutes(), utc.getUTCSeconds());
    let selectedTime = new Date(utcDate.getTime() + timeOffset);

    let day = selectedTime.getDay();
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

    let hour = selectedTime.getHours();
    ChangeHour(hour);

    let minute = selectedTime.getMinutes();
    ChangeMinute(minute);

    let second = selectedTime.getSeconds();
    ChangeSecond(second);

}


function loadDarkTheme() {
    document.getElementById("LeftSide").style.color = "#9ca09b";
}

function loadLightTheme() {
    document.getElementById('LeftSide').style.backgroundColor = "#f4f4f1";
    document.getElementById('RightSide').style.backgroundColor = "#f4f4f1";
    document.getElementById('dot').style.backgroundColor = "#343332";
    document.getElementById('ChangeLocationButton').style.borderColor = "#343332";
    document.getElementById('earthIcon').src = '/icons/white-24dp/1x/outline_public_white_24dp.png';
    document.getElementById("showTime").style.setProperty('--main-color', '#454545');
    document.getElementById("showTime").style.setProperty('--sec-color', '#9ca09b');

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
    let urlAskGeo = `https://api.askgeo.com/v1/3184/15d3f88ebfda51723889e9ce993da47e897fb09407fd60d2a1377a54d658e186/query.json?databases=TimeZone&points=${lat}%2C${lng}`;
    let urlProxy = 'https://cors-anywhere.herokuapp.com/';

    try {
        let response = await fetch(urlProxy + urlAskGeo);
        let JSON = await response.json();
        if (response.ok) {
            timeOffset = JSON.data["0"].TimeZone.CurrentOffsetMs;
            clearInterval(showLocalTimeInterval);

            let showSelectedTimeInterval = setInterval(ShowSelectedTime, 1000);
            clearInterval(showSelectedTimeInterval);
            showSelectedTimeInterval = setInterval(ShowSelectedTime, 1000);

            firstTimeChangeMinuteFunction = true;
            firstTimeChangeSecondFunction = true;
            firstTimeChangeHourFunction = true;
        }
    } catch (err) {
        if (!CORSPromptOccured) {
            let confirmRedirect = confirm(`Aby skorzystać z wszystkich funkcji strony należy udać sie pod adres https://cors-anywhere.herokuapp.com/ i klikąć w przycik :)
        Czy chcesz udać się pod ten adres ?`);
            if (confirmRedirect == true) {
                window.location = "https://cors-anywhere.herokuapp.com/";
            } else {
                alert("Nie możesz skorzystac z wszystkich funkcji");
            }
            CORSPromptOccured = true;
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

// Pokazanie lokalizacji stolicy na mapie
async function UserLocationDenied(error) {

    let timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let timeZoneArr = timeZone.split('/');
    let capital = timeZoneArr[1];
    let continent = timeZoneArr[0];
    let cord, lng, lat;
    let response = await fetch(`/JSON/${continent}.json`);
    let JSON = await response.json();
    if (response.ok) {
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
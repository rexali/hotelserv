const x = document.getElementById("demo");

const options = {
    // enableHighAccuracy: true,
    // maximumAge: 0,
    // timeout: 0
}

let watchId;

class CircularGeofenceRegion {
    constructor(opts) {
        Object.assign(this, opts)
    }

    inside(lat2, lon2) {
        const lat1 = this.latitude
        const lon1 = this.longitude
        const R = 63710; // Earth's radius in m

        return Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)) * R < this.radius;
    }
}

class SquareGeofenceRegion {
    constructor(opts) {
        Object.assign(this, opts)
    }

    inside(lat, lon) {
        const x = this.latitude
        const y = this.longitude
        const { axis } = this

        return lat > (x - axis) && lat < (x + axis) && lon > (y - axis) && lon < (y + axis)
    }
}

const fenceA = new CircularGeofenceRegion({
    name: 'myfence',
    latitude: 6.5243793,//59.345635,
    longitude: 3.3792057,//18.059707,
    radius: 2 //1000 // meters
});

const fenceB = new SquareGeofenceRegion({
    name: 'myfence',
    latitude: 6.5243793, // 59.345635,
    longitude: 3.3792057, //18.059707,
    axis: 2 //1000 // meters in all 4 directions
});

const fences = [fenceA, fenceB];

function geofencingHandler({ coords }) {

    for (const fence of fences) {
        const lat = coords.latitude
        const lon = coords.longitude

        if (fence.inside(lat, lon)) {
            // do some logic
            console.log("I am watching you");
        } else {
            // do some logic
            console.log("You are out of the fence");
        }
    }
}

// get geolocation coordinates and watch;
function getLocation() {
    if (navigator.geolocation) {
        try {
            navigator.geolocation.getCurrentPosition(showPosition, showError, options);
            watchId = navigator.geolocation.watchPosition(geofencingHandler, showError, options);
        } catch (error) {
            console.log(error)
        }
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    let date = new Date(position.timestamp);
    x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
    x.innerHTML += "<br>Date: " + date;
    x.innerHTML += (position.coords.speed == null) ? "<br>Speed: " +  (0 + " m/s") : "<br>Speed: " +  position.coords.speed;
}

function clearWatchPosition() {
    navigator.geolocation.clearWatch(watchId);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

// navigator.geolocation.watchPosition(({ coords }) => {
//     for (const fence of fences) {
//         const lat = coords.latitude
//         const lon = coords.longitude

//         if (fence.inside(lat, lon)) {
//             // do some logic
//             console.log("I am watching you");

//         }
//     }
// }, console.error, options);
if (typeof (EventSource) !== "undefined") {
    // Yes! Server-sent events support!
    try {
        var enventSource = new EventSource('http://localhost:3030/events');

        enventSource.onmessage = function (event) {
            console.log(JSON.parse(event.data).name); // use this in your app
            document.getElementById("demo").innerHTML += event.data;
        };

        enventSource.onopen = () => {
            console.log("Connected to SSE endpoint")
        }

        enventSource.onerror = (err) => {
            console.log(err);
        }
    } catch (error) {
        console.log(err);
    }
    // Or
    // enventSource.addEventListener('message', function (event) {
    //     document.getElementById("demo").innerHTML += event.data;
    // });
} else {
    // Sorry! No server-sent events support..
    document.getElementById("demo").innerHTML += "Sorry! No server-sent events support..";
}
var es = new EventSource('http://localhost:3030/stream');
es.onmessage = function (event) {
    document.getElementById("demo").innerHTML = event.data;
};
// es.addEventListener('message', function (event) {
//     document.getElementById("demo").innerHTML += event.data;
// });
es.onopen = () => {
    console.log("Connected to SSE endpoint")
}
es.onerror = (err) => {
    console.log(err);
}
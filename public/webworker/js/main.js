
var w;

function startWorker() {
    try {
        if (typeof(Worker) !== "undefined") {
            if (typeof(w) == "undefined") {
              w = new Worker("js/worker.js");
            }
            w.onmessage = function(event) {
              document.getElementById("result").innerHTML = event.data;
            };
          } else {
            document.getElementById("result").innerHTML = "Sorry! No Web Worker support.";
          } 
    } catch (error) {
        console.log(error);
    }
  
}

function stopWorker() {
  w.terminate();
  w = undefined;
}
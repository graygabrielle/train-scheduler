var trains = [{Name: "Dublin", Destination: "San Fransisco", Frequency: 25, Next_Arrival: "03:10", Minutes_Away: 5}];

var i = 0;

console.log(trains[i].Name);

//appends your item to your chosen tag/element

function appendFunc(dest, item){
   dest.append(item);
}

function addTrain() {

let name = $("#train-name").val().trim();
let destination = $("#destination").val().trim();
let firstTrain = $("#first-train-time").val().trim();
let frequency = $("#frequency").val().trim();
let nextArrival = "moment.js";
let minutesAway = "moment.js";

let newTrain = {
    Name: name,
    Destination: destination,
    First_Train: firstTrain,
    Frequency: frequency,
    Next_Arrival: nextArrival,
    Minutes_Away: minutesAway
};

trains.push(newTrain);


var a = $("<tr>");

var nameCell = $("<td>");

var destinationCell = $("<td>")

var freqCell = $("<td>");

var arrivalCell = $("<td>");

var minCell = $("<td>");

appendFunc(nameCell, trains[i].Name);
appendFunc(destinationCell, trains[i].Destination);
appendFunc(freqCell, trains[i].Frequency);
appendFunc(arrivalCell, trains[i].Next_Arrival);
appendFunc(minCell, trains[i].Minutes_Away);
// nameCell.append(trains[i].Name);
// destinationCell.append(trains[i].Destination);
// freqCell.append(trains[i].Frequency);
// arrivalCell.append(trains[i].Next_Arrival);
// minCell.append(trains[i].Minutes_Away);


appendFunc(a, nameCell);
appendFunc(a,destinationCell);
appendFunc(a, freqCell);
appendFunc(a, arrivalCell);
appendFunc(a, minCell);
// a.append(nameCell);
// a.append(destinationCell);
// a.append(freqCell);
// a.append(arrivalCell);
// a.append(minCell);

$(".schedule-table").append(a);
}



$(".submit").on("click", function(event){
    event.preventDefault();
    i++;
    addTrain();
})


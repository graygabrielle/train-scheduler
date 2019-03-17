var trains = [{Name: "Dublin", Destination: "San Fransisco", Frequency: 25, Next_Arrival: "03:10", Minutes_Away: 5}];

var i = 0;

console.log(trains[i].Name);

//appends your item to your chosen tag/element

function appendFunc(dest, item){

   dest.append(item);
}

//pushes user input as an object into trains array, and posts it on html page
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


    appendFunc(a, nameCell);
    appendFunc(a,destinationCell);
    appendFunc(a, freqCell);
    appendFunc(a, arrivalCell);
    appendFunc(a, minCell);

    appendFunc($(".schedule-table"), a);
    console.log(newTrain);

} //========end of add train function=============

//clears out user input fields on html page
function clearInput() {
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
}


$(".submit").on("click", function(event){
    event.preventDefault();
    i++;
    addTrain();
    clearInput();
})


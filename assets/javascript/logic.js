var trains = [{Name: "Dublin", Destination: "San Fransisco", Frequency: 25, Next_Arrival: "03:10", Minutes_Away: 5}];

var i = 0;


//appends your item to your chosen tag/element

function appendFunc(dest, item){

   dest.append(item);
}

//pushes user input as an object into trains array, and posts it on html page
function addTrain() {

    //useful variables
    let currentTime = moment().format("HH:mm");
    let currentHoursAndMinutes = currentTime.split(":");
    let currentHour = parseInt(currentHoursAndMinutes[0]);
    let currentMinute = parseInt(currentHoursAndMinutes[1]);
    // console.log(currentHour);
    // console.log(typeof currentHour);
    // console.log(currentMinute);
    // console.log(typeof currentMinute);

    let firstTrain = $("#first-train-time").val().trim();
    let firstHoursAndMinutes = firstTrain.split(":");
    let firstHour = parseInt(firstHoursAndMinutes[0]);
    let firstMinute = parseInt(firstHoursAndMinutes[1]);
    // console.log(firstHour);
    // console.log(typeof firstHour);
    // console.log(firstMinute);
    // console.log(typeof firstMinute);

    let firstTrainAlready = false;
    let rightNow = false;

    if (currentHour>firstHour) {
        firstTrainAlready = true;
    }
    else if (currentHour===firstHour) {
        if(currentMinute>firstMinute){
            firstTrainAlready = true;
        }
        else if (currentMinute===firstMinute){
            rightNow = true;
        }
        else {
            firstTrainAlready = false;
        }
    }
    else {
        firstTrainAlready = false;
    }

    console.log(firstTrainAlready);
    console.log(rightNow);




    //variables that will be printed to the table
    let name = $("#train-name").val().trim();
    let destination = $("#destination").val().trim();
    let frequency = $("#frequency").val().trim();
    let nextArrival = "moment";
    let minutesAway = "moment";



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





var trains = [];

//variables that will be printed to the table

let name;
let destination;
let frequency;
let firstTrain;


//appends your item to your chosen tag/element

function appendFunc(dest, item){

   dest.append(item);
}

//pushes user input as an object into trains array, and posts it on html page
function addTrain() {
    name = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    frequency = $("#frequency").val().trim();
    firstTrain = $("#first-train-time").val().trim();
    newTrain = {
        Name: name,
        Destination: destination,
        First_Train: firstTrain,
        Frequency: frequency,
    };

    trains.push(newTrain);
    console.log(trains.length);

} 

//clears out user input fields on html page
function clearInput() {
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");
}


$(".submit").on("click", function(event){
    event.preventDefault();
    addTrain();
    checkTime();
    clearInput();

    
})


function checkTime() {
    $(".schedule-table").empty();
    let tableHead = $("<thead>");
    let trainName = $("<th>");
    trainName.append("Train Name");
    tableHead.append(trainName);
    let trainDestination = $("<th>");
    trainDestination.append("Destination");
    tableHead.append(trainDestination);
    let trainFrequency = $("<th>");
    trainFrequency.append("Frequency (min)");
    tableHead.append(trainFrequency);
    let trainNext = $("<th>");
    trainNext.append("Next Arrival");
    tableHead.append(trainNext);
    let trainMinutes = $("<th>");
    trainMinutes.append("Wait Time");
    tableHead.append(trainMinutes);





    $(".schedule-table").append(tableHead);


    for (let i=0; i<trains.length; i++){
        let firstTrainAlready = false;
        let rightNow = false;
        let nextArrival = "";
        let minutesAway = "";
        //parses the current hours and minutes
        let currentTime = moment().format("HH:mm");
        let currentHoursAndMinutes = currentTime.split(":");
        let currentHour = parseInt(currentHoursAndMinutes[0]);
        let currentMinute = parseInt(currentHoursAndMinutes[1]);
        // console.log(currentHour);
        // console.log(typeof currentHour);
        // console.log(currentMinute);
        // console.log(typeof currentMinute);

        //parses the first train hours and minutes
        let firstTrainTime = trains[i].First_Train;
        let firstHoursAndMinutes = firstTrainTime.split(":");
        let firstHour = parseInt(firstHoursAndMinutes[0]);
        let firstMinute = parseInt(firstHoursAndMinutes[1]);
        console.log(firstHour);
        console.log(typeof firstHour);
        console.log(firstMinute);
        console.log(typeof firstMinute);

        //determines if first train has already run or not

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
        }

        console.log("first train already: " + firstTrainAlready);

        if(firstTrainAlready) {
            add();
            function add(){
                firstMinute += parseInt(trains[i].Frequency)
                if (firstMinute>=60){
                    firstHour++;
                    firstMinute-=60;
                    console.log("added an hour, subtracted 60 minutes");
                    console.log(firstHour + " " + firstMinute);
                    //this works!
                };
                if (currentHour<firstHour) {

                    

                    if(firstMinute===0){
                        firstMinute="00";
                    }
                    nextArrival = `${firstHour}:${firstMinute}`
                    minutesAway = "soon";

                }
                else if (currentHour===firstHour) {
                    if(currentMinute<firstMinute){
                        nextArrival = `${currentHour}:${firstMinute}`;
                        minutesAway = `${firstMinute-currentMinute} min`;
                        console.log("current hour equals first hour");
                        //this works!
                    }
                    else if (currentMinute===firstMinute){
                        nextArrival = "Now";
                        minutesAway = "0 min";
                        console.log("last else if");
                        //this works!
                    }
                }
                else {
                    add();
                    //this works!
                }
                
            }
        }
        else if(rightNow){
            nextArrival = "Now";
            minutesAway = "0 min";
            //this works!
        }
        else {
            nextArrival = firstTrainTime;
            let hours = firstHour-currentHour;
            let minutes = firstMinute-currentMinute;
            if (minutes<0) {
                hours--;
                minutes+=60
            }
            if (hours===0){
                minutesAway = `${minutes} min`;
            }
            else{
                minutesAway = `${hours} hr ${minutes} min`;
            }
            //this works!!
        }

        //reprint whole array
        var a = $("<tr>");
        var nameCell = $("<td>");
        var destinationCell = $("<td>")
        var freqCell = $("<td>");
        var arrivalCell = $("<td>");
        var minCell = $("<td>");

        appendFunc(nameCell, trains[i].Name);
        appendFunc(destinationCell, trains[i].Destination);
        appendFunc(freqCell, trains[i].Frequency);
        appendFunc(arrivalCell, nextArrival);
        appendFunc(minCell, minutesAway);


        appendFunc(a, nameCell);
        appendFunc(a,destinationCell);
        appendFunc(a, freqCell);
        appendFunc(a, arrivalCell);
        appendFunc(a, minCell);

        appendFunc($(".schedule-table"), a);
            
    }
}


// Initialize Firebase
var config = {
apiKey: "AIzaSyDirwiAM1d_wyGqWQG2eS6Fs3z0LHzzK0o",
authDomain: "train-scheduler-69387.firebaseapp.com",
databaseURL: "https://train-scheduler-69387.firebaseio.com",
projectId: "train-scheduler-69387",
storageBucket: "train-scheduler-69387.appspot.com",
messagingSenderId: "607503733624"
};
firebase.initializeApp(config);


let trainData = firebase.database().ref();

// Button for adding trains
$(".submit").on("click", function() {
    event.preventDefault();
    // Grabs user input
    let trainName = $("#train-name").val().trim();
    let destination = $("#destination").val().trim();
    let firstTrain = moment($("#first-train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
    let frequency = $("#frequency").val().trim();

    // Creates local "temporary" object for holding train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    }

    // Uploads train data to the database
    trainData.push(newTrain);

    // Clears all of the text-boxes
    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

    return false;
});


// Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot) {

    let data = childSnapshot.val();
    let trainNames = data.name;
    let trainDestin = data.destination;
    let trainFrequency = data.frequency;
    let theFirstTrain = data.firstTrain;
    console.log(theFirstTrain);
    // Calculate the minutes until arrival using hardcore math
    // To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency  
    let tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
    let tMinutes = trainFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    let tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    // Add each train's data into the table 
    $(".schedule-table").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");

});
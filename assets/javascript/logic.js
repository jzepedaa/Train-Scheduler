$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyDXErsX4yIzi6Aq6Vf-C5lURfxGdN3ERNY",
        authDomain: "train-homework-7598a.firebaseapp.com",
        databaseURL: "https://train-homework-7598a.firebaseio.com",
        projectId: "train-homework-7598a",
        storageBucket: "",
        messagingSenderId: "419103180583"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // Capture Button Click
    $("#addTrain").on("click", function (event) {
        event.preventDefault();

        // Grabbed values from text boxes
        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var firstTrain = $("#firstTrain").val().trim();
        var freq = $("#interval").val().trim();

        // Code for handling the push
        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: freq
        });
    });



    database.ref().on("child_added", function (childSnapshot) {

        var newTrain = childSnapshot.val().trainName;
        var newLocation = childSnapshot.val().destination;
        var newFirstTrain = childSnapshot.val().firstTrain;
        var newFreq = childSnapshot.val().frequency;

        // First Time 
        var startTimeConverted = moment(newFirstTrain, "hh:mm").subtract(1, "years");

        // Current Time
        var currentTime = moment();

        // Difference between the times
        var diffTime = moment().diff(moment(startTimeConverted), "minutes");

        // Time apart 
        var tRemainder = diffTime % newFreq;

        // Minutes Until Train
        var tMinutesTillTrain = newFreq - tRemainder;

        // Next Train
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var catchTrain = moment(nextTrain).format("HH:mm");

        // Display On Page
        $("#all-display").append(
            ' <tr><td>' + newTrain +
            ' </td><td>' + newLocation +
            ' </td><td>' + newFreq +
            ' </td><td>' + catchTrain +
            ' </td><td>' + tMinutesTillTrain + ' </td></tr>');

        // Clear input fields
        $("#trainName, #destination, #firstTrain, #interval").val("");
        return false;
    },
        //Handle the errors
        function (errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });

});
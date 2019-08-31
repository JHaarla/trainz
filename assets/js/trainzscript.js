$(document).ready(function(){
    // MATERIALIZE.CSS STUFF GOES HERE______________

    // initialize parallax effect (materialize)
    $(".parallax").parallax();




    // Special JS dependent styling goes here________________

    // sticky-on-scroll navbar
    window.onscroll = function() { //watches the whole window for a scrolling
        stickyHead();
    }
    var navbar = document.getElementById("stickyScroll"); //grabs the navbar from the DOM - the part we want to "stick" to the top on scroll

    var sticky = navbar.offsetTop;
    // console.log(sticky);
    
    // this function switches classes for the header/navbar to make it stick to the top when it hits the top. Sticky is released on scrolldown of the page. Also activates a placeholder div so the content doesn't "jump" when the header becomes fixed
    function stickyHead() { 
        if (window.pageYOffset >= sticky) {
            navbar.classList.remove("navbar");
            navbar.classList.add("navbar-fixed");
            $(".header-placeholder").css({display: "block"});
        } else {
            navbar.classList.remove("navbar-fixed");
            navbar.classList.add("navbar");
            $(".header-placeholder").css({display: "none"});
        };
    };



    // Trainz App starts here

    // Firebase database info ___________________________
    var firebaseConfig = {
        apiKey: "AIzaSyCs9899Rgg7O6N3IY2P1NqNtuS2upO7oRk",
        authDomain: "train-schedules-d9841.firebaseapp.com",
        databaseURL: "https://train-schedules-d9841.firebaseio.com",
        projectId: "train-schedules-d9841",
        storageBucket: "",
        messagingSenderId: "726875827653",
        appId: "1:726875827653:web:170c79a25e3ba40b"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);



    //VARIABLES____________________________

    var database = firebase.database();

    var trainName = "";
    var trainDest = "";
    var trainFirst = "";
    var trainFreq = "";
    var minAway = "";
    var nextArrival = "";

    var trainID = 0;

    var trainData = {};


    // functions for the Trainz App____________________

    $(".inputField").keyup(function(){
        if ($("#trainName").val() != "" &&
        $("#trainDestination").val() != "" &&
        $("#firstTrain").val() != "" &&
        $("#frequency").val() != "") {
            $("#addTrainBtn").addClass("pulse").removeClass("disabled");
        } else {
            $("#addTrainBtn").addClass("disabled").removeClass("pulse");
        };

        
    })


    // main process for the Trainz App___________________

        // Grab the addTrain button
        $("#addTrainBtn").on("click", function(event) {
            event.preventDefault(); // I've never gotten this to work properly - doesn't seem to be working in the "solved" class projects either...

            // Grab user input
            trainName = $("#trainName").val().trim();
            trainDest = $("#trainDestination").val().trim();
            trainFirst = $("#firstTrain").val().trim(); // probably need some moment.js stuff here
            trainFreq = $("#frequency").val().trim();

            minAway = "";//moment.js stuff here
            nextArrival = "";// moment.js stuff here


            // object to store the above info in
            var newTrain = {
                name: trainName,
                destination: trainDest,
                frequency: trainFreq,
                next: nextArrival,
                away: minAway,
                first: trainFirst,
                ID: trainID
            };
        
            

            // upload newTrain object to firebase
            database.ref().push(newTrain);

            // do a timed toast here to show success or failure (5 seconds?)



            //clear text areas so they're ready for the next train
            $("#trainName").val("");
            $("#trainDestination").val("");
            $("#firstTrain").val(""); // probably need some moment.js stuff here
            $("#frequency").val("");

            // remove animation from button and disable it
            $("#addTrainBtn").addClass("disabled").removeClass("pulse");

            // remove class="active" from the labels - resets the form visually
            $(".validate").removeClass("valid");
            $("label").removeClass("active");
        });


        // Firebase event to add new train to DB & a new row to DOM 
        database.ref().on("child_added", function(childSnapshot) {

            // store DB info back into local variables
            trainName = childSnapshot.val().name;
            trainDest = childSnapshot.val().destination;
            // trainFirst = childSnapshot.val().
            trainFreq = childSnapshot.val().frequency;
            minAway = childSnapshot.val().away;
            nextArrival = childSnapshot.val().next;

            //create new row in table to append to (DOM stuff)
            var newTrainRow = $("<tr>").append(
                $("<td>").text(trainName),
                $("<td>").text(trainDest),
                $("<td>").text(trainFreq),
                $("<td>").text(nextArrival),
                $("<td>").text(minAway)
            );

            //append newTrainRow to the table on the DOM (DOM stuff)
            $("#trainz > tbody").append(newTrainRow);

        });



});
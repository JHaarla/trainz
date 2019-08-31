$(document).ready(function(){
    // MATERIALIZE.CSS STUFF GOES HERE______________

    // initialize parallax effect (materialize)
    $(".parallax").parallax();

    //initialize time picker (Materialize.css)
    // $(".timepicker").timepicker();

    var elems = document.querySelectorAll('.timepicker');
    M.Timepicker.init(elems, {
        showClearBtn: true,
        twelveHour:false,
        defaultTime: "08:00"
    });

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

    // var trainID = 0;

    // functions for the Trainz App____________________

    // limits user input to the required format HH:mm
    new Formatter(document.getElementById("firstTrain"),
      {pattern:"{{99}}:{{99}}",
      persistent: false
    }
    );

    function clearForm() {
        //clear text areas so they're ready for the next train
        $("#trainName").val("");
        $("#trainDestination").val("");
        $("#firstTrain").val("");
        $("#frequency").val("");

        // remove animation from button and disable it
        $("#addTrainBtn").addClass("disabled").removeClass("pulse");

        // remove class="active" from the labels and "valid" from the input fileds - resets the form visually
        $(".validate").removeClass("valid");
        $("label").removeClass("active");
        
    }

    // check for non-empty input fields on keyup. if not empty, activate & animate submit button - else keep the button inactive
    // $(".inputField").keyup(function(){
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

    
    // this will limit the Frequency field to only allow numbers
    $('#frequency').bind('input paste', function(){
        this.value = this.value.replace(/[^0-9]/g, '');
  });

    // $(".timepicker").focusin(function() {
    //     var elems = document.querySelectorAll('.timepicker');
    //     M.Timepicker.open(instance);
    // });

    // if ($("#fTrainTime").hasClass("active")) {
    //     timePick.open();
    // }
    //The above did not work as expected...



    //time calculation stuff with moment.js
    // var trainFirstConv = moment(trainFirst, "HH:mm").subtract(1, "years");
    // var timeDiff = moment().diff(moment(trainFirstConv), "minutes");
    // var timeRemainder = timeDiff % trainFreq;
    // minAway = trainFreq - timeRemainder;
    // nextArrival = moment().add(minAway, "minutes");


    // main process for the Trainz App___________________

        // Grab the addTrain button
        $("#addTrainBtn").on("click", function(event) {
            event.preventDefault(); // I've never gotten this to work properly - doesn't seem to be working in the "solved" class exercises either...

            // Grab user input
            trainName = $("#trainName").val().trim();
            trainDest = $("#trainDestination").val().trim();
            trainFirst = $("#firstTrain").val().trim(); 
            trainFreq = $("#frequency").val().trim();

            // minAway = "";//moment.js stuff here
            // nextArrival = "";// moment.js stuff here
            var trainFirstConv = moment(trainFirst, "HH:mm").subtract(1, "years");
            console.log("trainFirst: " + trainFirst);
            console.log("tFirstConverted: " + trainFirstConv);
            var timeDiff = moment().diff(moment(trainFirstConv), "minutes");
            console.log("timeDiff: " + timeDiff);
            var timeRemainder = timeDiff % trainFreq;
            console.log("timeRemainder: " + timeRemainder);
        
            minAway = trainFreq - timeRemainder;
            nextTrain = moment().add(minAway, "minutes");
            nextArrival = moment(nextTrain).format("hh:mm A");
            console.log("nextTrain: " + nextTrain);
            console.log("nextArrival: " + nextArrival);

            // object to store the above info in
            var newTrain = {
                name: trainName,
                destination: trainDest,
                frequency: trainFreq,
                next: nextArrival,
                away: minAway,
                first: trainFirst,
            };
        
            

            // upload newTrain object to firebase
            database.ref().push(newTrain);

            // do a timed toast here to show success or failure (5 seconds?)




            clearForm();
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
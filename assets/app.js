
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCgZjTbWf7pfiPEdJ-e3SDphWbq0bVRb_o",
    authDomain: "traintime-4ffab.firebaseapp.com",
    databaseURL: "https://traintime-4ffab.firebaseio.com",
    projectId: "traintime-4ffab",
    storageBucket: "",
    messagingSenderId: "100863301069"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var destination = "";
  var firstTrain = "";
  var frequency = "";

  $("#addTrain").on("click", function(event){
      event.preventDefault();
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrain = $("#firstTrain-input").val().trim();
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
          name: name,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency,        
      })
  });

  database.ref().on("child_added", function(snapshot){
      var sv = snapshot.val();

      var tFrequency = sv.frequency;
      
      var firstTrainConverted = moment(sv.firstTrain, "HH:mm").subtract(1, "days");
          
      var currentTime = moment(currentTime).format("hh:mm");
      
      var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
          
      var tRemainder = diffTime % tFrequency;
          
      var tMinutesTrain = tFrequency - tRemainder;
      
      var nextTrain = moment().add(tMinutesTrain, "minutes").format("hh:mm A");
      
      $("#trainInfo").append("<tr><td>"+ sv.name +"</td><td>"+ sv.destination + "</td><td>"+ sv.frequency + "</td><td>"+ nextTrain+"</td><td>"+tMinutesTrain+"</td><td></td></tr>")

  });
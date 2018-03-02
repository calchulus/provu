var newList = [];

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD__0sfP-c4tCStFArKsl3MyR2Y8WjRFP8",
    authDomain: "fantasy-crypto.firebaseapp.com",
    databaseURL: "https://fantasy-crypto.firebaseio.com",
    projectId: "fantasy-crypto",
    storageBucket: "fantasy-crypto.appspot.com",
    messagingSenderId: "1066538764682"
  };
firebase.initializeApp(config);

// New Firebase
var resourceDB = firebase.database().ref('entrep-resource-tip');
var resourceRef = resourceDB.orderByChild('tip');//limit to last

// orderByChild('tip')
//function sorting() {
//    x = document.getElement("text menu")
//}
//
//ref.orderByKey().on("child_added", function(snapshot) {
//  console.log(snapshot.key);
//});


// Form as a JSON
$(document).ready(function() {
  
  
  
   // Check for change & list Items
resourceRef.once("value")
  .then(function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // Get the Key & Child Data
    var key = childSnapshot.key;
    var tipsArray = childSnapshot.val();
      
      for (var prop in tipsArray){
        var str = '';
        var tipTime = moment.utc(tipsArray.tiptime).local().startOf('hour').fromNow();
        if (tipsArray.url.slice(-1) == "/") {
            var link = tipsArray.url.slice(0,-1);
        } else {
              var link = tipsArray.url;
          }
              str += '<div class="ui card"> <div class="content">' +
    '<a style="text-decoration: none;" href=' + link +
    '><div class="header" style="font-weight: bold; font-size: 1.28571429em; margin-top: -0.21425em; line-height: 1.28571429em; color: rgba(0, 0, 0, 0.85) !important" >' +
      tipsArray.tip + '  <div style="font-size: 0.6em;" class="ui blue  basic label">' + tipsArray.category + '</div> </div> <div class="meta"> <p>' + tipsArray.description + '</p></div></a></div></div>';        
        }
 
      // Create the list in HTML
      $('.resourceTipsList').append(str);
    });
  });

  
  // Add a New Item
  $("#resourceformTip").submit(function(event) {
      event.preventDefault();
    
    // Get the form data
    resourceDB.push({
      'category': $('select#category').val(),
      'tip': $('textarea#tip').val(),
      'url' : $('textarea#url').val(),
      'description' : $('textarea#description').val(),
      'tiptime': Date.now()
    });

    console.log("sent");
    resourceformTip.reset();

  });
});

//$('.ui.dropdown').dropdown({
//  allowAdditions: true,
//}); 



//    trying to do sorting by A-Z
//     writer choice, number of likes 
//    ref.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
//  console.log(snapshot.key);
//});
//});
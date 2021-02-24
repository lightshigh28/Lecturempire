// Initialize Firebase
var config = {
	apiKey: "AIzaSyCmDz2_yDsoFcSOomTSr-ovm0zi3ZPFj8Q",
	authDomain: "lecturempire.firebaseapp.com",
	databaseURL: "https://lecturempire-default-rtdb.firebaseio.com",
	projectId: "lecturempire",
	storageBucket: "lecturempire.appspot.com",
	messagingSenderId: "796467025045"
};
var newTime = new Date().getTime();

firebase.initializeApp(config);


document.addEventListener('DOMContentLoaded', function () {
    var input = document.getElementById('college');
    if (localStorage['college']) { // if job is set
        input.value = localStorage['college']; // set the value
    }
    input.onchange = function () {
         localStorage['college'] = this.value; // change localStorage on change
     }

     var input = document.getElementById('semister');
     if (localStorage['semister']) { // if job is set
         input.value = localStorage['semister']; // set the value
     }
     input.onchange = function () {
          localStorage['semister'] = this.value; // change localStorage on change
      }

      var input = document.getElementById('department');
      if (localStorage['department']) { // if job is set
          input.value = localStorage['department']; // set the value
      }
      input.onchange = function () {
           localStorage['department'] = this.value; // change localStorage on change
       }

       var input = document.getElementById('division');
       if (localStorage['division']) { // if job is set
           input.value = localStorage['division']; // set the value
       }
       input.onchange = function () {
            localStorage['division'] = this.value; // change localStorage on change
        }
});








// $('#finalB').hide();
// $('#finalT').hide();


function getLink(){
    var college = $("#college").val();
    var semister = $("#semister").val();
    var department = $("#department").val();
    var division = $("#division").val();
    // var setLink = $('#finalB')
    var setText = $('#finalT')

    d = new Date();
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    nd = new Date(utc + (3600000*+5.5));
    var ist =  nd.toLocaleString();
    var d = new Date(ist),
    minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
    hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
    days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
    // console.log(days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm);



    var rlcs = firebase.database().ref(college);
    rlcs.orderByChild('comps').on('child_added', function(snapshot) {
        var trade = snapshot.val();
    console.log(trade["comps"]["sem8"]["a"]["monday"].lectures[0])
    today = days[d.getDay()]
        var totalLectures = trade[department][semister][division][today].time.length;

        for (var i = 0; i < totalLectures; i++) {
            var currentTime = parseInt(String(hours) + String(minutes));
            var timeRange = trade[department][semister][division][today].time[i].split("-")
            var startTime = parseInt(timeRange[0]);
            var endTime = parseInt(timeRange[1]);

            if (startTime <= currentTime && currentTime <= endTime){
                var subName = trade[department][semister][division][today].lectures[i]
                $('#openLecture').empty();
                for (var j = 0; j < subName.length; j++){
                    var idk = '<a href="' + trade[department][semister][division].urls[subName[i]] + '" id="finalB">' + trade[department][semister][division][today].lectures[i][j] + '</a>'
                    $(idk).appendTo($('#openLecture')).show();
                }
                // console.log(subName)
                // console.log(trade.comps.sem8.a.urls[subName]);
                // setText.show();
                // setText.html("Click on the button to open the Lecture.")
                // setLink.show();
                // setLink.attr('href', "https://thatinsaneguy.netlify.app/");

            }

            else if (i != 0){
                
                setText.hide();
                // setLink.hide();

                var leftComp = parseInt(trade[department][semister][division][today].time[i-1].split("-")[1])
                var rightComp = parseInt(trade[department][semister][division][today].time[i].split("-")[0])
                var firstLec = parseInt(trade[department][semister][division][today].time[0].split("-")[0])
                var lastLec = parseInt(trade[department][semister][division][today].time[totalLectures - 1].split("-")[1])

                if (currentTime < firstLec){
                    nextTime = firstLec - currentTime
                    console.log("First Lecture in " + nextTime + " Minutes")
                    setText.show();
                    setText.html("First Lecture Starts in " + nextTime + " Minutes")
                }
                else if (leftComp <= currentTime && currentTime <= rightComp){
                    nextTime = rightComp - currentTime;
                    console.log("Next lec in " + nextTime + " Minutes")
                    setText.show();
                    setText.html("Next lec in " + nextTime + " Minutes")
                }
                else if (i == totalLectures - 1){
                    lastLec = parseInt(trade[department][semister][division][today].time[totalLectures - 1].split("-")[1])
                    if (currentTime > lastLec){
                        console.log("ALL LEC OVER")
                        setText.show();
                        setText.html("YOU ARE DONE FOR THE DAY, RELAX!")
                    }
                }
            }

        }
    });
}


// LecturEmpire = {
//         comps : {
//             sem8 : {
//                 a : {
//                     monday : {
//                         time : ["0925-1030", "1035-1140", "1150-1255"],
//                         lectures : [["DBM", "EDM", "FM"], ["HMI"], ["DC"]]
//                     },
//                     tuesday : {
//                         time : ["0925-1030", "1035-1140", "1150-1255"],
//                         lectures : [["DBM", "EDM", "FM"], ["DC"], ["NLP"]]
//                     },
//                     wednesday : {
//                         time : ["0925-1030", "1035-1140", "1150-1255"],
//                         lectures : [["DBM", "EDM", "FM"], ["NLP"], ["HMI"]]
//                     },
//                     thursday : {
//                         time : ["0925-1030", "1035-1140", "1150-1255"],
//                         lectures : [["HMI"], ["DC"], ["NLP"]]
//                     },
//                     friday : {
//                         time : ["0925-1030", "1035-1140", "1150-1255"],
//                         lectures : [["DC"], ["NLP"], ["HMI"]]
//                     },
//                     urls : {
//                         DBM : "http://DBM",
//                         EDM : "http://EDM",
//                         FM : "http://FM",
//                         HMI : "http://HMI",
//                         DC : "http://DC",
//                         NLP : "http://NLP",
//                         CCL : "http://CCL",
//                     }
//                 }
//             }
//         }
// }

// var myDataRef = firebase.database().ref('UCOE');
// myDataRef.push(LecturEmpire);
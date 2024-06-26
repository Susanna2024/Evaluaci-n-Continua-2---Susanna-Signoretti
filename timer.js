
// button add o remove

function hide() { 
  document.getElementById("myP").style.visibility = "hidden"; 
} 
function hide2() { 
  document.getElementById("myP2").style.visibility = "hidden"; 
}
function hide3() { 
  document.getElementById("myP3").style.visibility = "hidden"; 
} 
function show() { 
 document.getElementById("myP").style.visibility = "visible"; 
} 
function show2() { 
 document.getElementById("myP2").style.visibility = "visible"; 
} 

function show3() { 
 document.getElementById("myP3").style.visibility = "visible"; 
} 



// Autoplay for iframe
var videos = document.getElementsByTagName("iframe");
for (var i = 0; i < videos.length; i++) {
    videos[i].setAttribute("autoplay", "");
}


//TIMER
let timerInterval;
let timerRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;

function startTimer() {
    if (!timerRunning) {
        timerInterval = setInterval(updateTimer, 1000);
        timerRunning = true;
        document.getElementById('startButton').setAttribute('disabled', 'disabled');
        document.getElementById('stopButton').removeAttribute('disabled');
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    document.getElementById('startButton').removeAttribute('disabled');
    document.getElementById('stopButton').setAttribute('disabled', 'disabled');
}

function resetTimer() {
    clearInterval(timerInterval);
    timerRunning = false;
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('timerDisplay').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
    document.getElementById('startButton').removeAttribute('disabled');
    document.getElementById('stopButton').setAttribute('disabled', 'disabled');
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
          minutes = 0;
          hours++;
      }
  }
  document.getElementById('timerDisplay').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds);
}

function formatTime(time) {
  return (time < 10 ? '0' : '') + time;
}



// FORMAT /
function submitForm(event) {
  event.preventDefault(); 

  // read form value//
  var workoutName = document.getElementById("workoutName").value;
  var workoutDuration = document.getElementById("workoutDuration").value;
  var repetitions = document.getElementById("repetitions").value;
  var Weight = document.getElementById("weight").value;


  // Validation form
  var form = document.getElementById("workoutForm");
  if (!form.checkValidity()) {
      //error if not correct
      for (var i = 0; i < form.elements.length; i++) {
          var field = form.elements[i];
          if (field.tagName === 'INPUT' && !field.validity.valid) {
              field.setCustomValidity('Please fill out this field.');
              field.reportValidity();
          }
      }
      return; 
  }







  // new rows//
  var table = document.getElementById("workoutResultsBody");
  var newRow = table.insertRow();
  var cell1 = newRow.insertCell(0);
  var cell2 = newRow.insertCell(1);
  var cell3 = newRow.insertCell(2);
  var cell4 = newRow.insertCell(3);

  cell1.innerHTML = workoutName;
  cell2.innerHTML = workoutDuration;
  cell3.innerHTML = repetitions;
  cell4.innerHTML = Weight;


  // Reset form after send /
  document.getElementById("workoutForm").reset();
}

//CALORIES//
  // Function calculate kcal//
function calculateTotalCalories() {
  var rows = document.querySelectorAll("#workoutResultsBody tr");

  // start 0 kcal//
  var totalCalories = 0;

  // round for table rows//
  rows.forEach(function(row) {
    // Ottieni la durata e le ripetizioni dalla riga corrente
    var duration = parseFloat(row.cells[1].textContent);
    var repetitions = parseFloat(row.cells[2].textContent);

    // total kcal
    var calories = (duration * repetitions)*5;
    totalCalories += calories;
  });

  // tot kcal//
  return totalCalories;
}




// analyze workout//
function analyzeWorkout() {
  // Calcola le calorie totali
  var totalCalories = calculateTotalCalories();

  // num kcal burn  id "caloriesBurned"
  var caloriesBurnedElement = document.getElementById("caloriesBurned");
  caloriesBurnedElement.textContent = "Calories Burned: " + totalCalories;
}

//DOWNLOAD 
function downloadTableAsCSV() {
  var csvContent = [];
  var headerRow = ["Workout Name", "Duration (minutes)", "Repetitions", "Weight", "Kcal"]; // title

  // Add headers table
  csvContent.push(headerRow.join(","));

  // Add datos a csv
  var rows = document.querySelectorAll("#workoutResultsBody tr");
  rows.forEach(function(row) {
      var rowData = [];
      row.querySelectorAll("td").forEach(function(cell) {
          rowData.push(cell.textContent);
      });

      // cel and row same number
      while (rowData.length < headerRow.length) {
          rowData.push(""); // Add empy cel
      }

      csvContent.push(rowData.join(","));
  });

  // Add "caloriesBurned" to CSV
  var caloriesDivContent = document.getElementById("caloriesBurned").textContent;
  csvContent.push(["", "", "", "", caloriesDivContent].join(","));

  // add a link for download file CSV
  var csvString = csvContent.join("\n");
  var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  var link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "workout_results.csv");
  document.body.appendChild(link); // Add link to doc
  link.click(); // start download link
}








//CALORIES + strong//
  // Function calculate kcal//
  function calculateTotalCalories1() {
    var rows = document.querySelectorAll("#workoutResultsBody tr");
  
    // start 0 kcal//
    var totalCalories = 0;
  
    // round for table rows//
    rows.forEach(function(row) {
      // duration and repetion of the current line
      var duration = parseFloat(row.cells[1].textContent);
      var repetitions = parseFloat(row.cells[2].textContent);
  
      // total kcal
      var calories = (duration / repetitions)*10;
      totalCalories += calories;
    });
  
    // tot kcal//
    return totalCalories;
  }
  
  
  
  
  // analyze workout//
  function analyzeWorkout1() {
    // Calcolate the total kcal
    var totalCalories = calculateTotalCalories1();
  
    // num kcal burn  id "caloriesBurned"
    var caloriesBurnedElement = document.getElementById("caloriesBurned");
    caloriesBurnedElement.textContent = "Incresed Strength %: " + totalCalories;
  }
  
  //DOWNLOAD
function downloadTableAsCSV() {
  var csvContent = [];
  var headerRow = ["Workout Name", "Duration (minutes)", "Repetitions", "Weight", "% Strongness"]; // title

  // Add headers table
  csvContent.push(headerRow.join(","));

  // Add datos a csv
  var rows = document.querySelectorAll("#workoutResultsBody tr");
  rows.forEach(function(row) {
      var rowData = [];
      row.querySelectorAll("td").forEach(function(cell) {
          rowData.push(cell.textContent);
      });

      // cel and row same number
      while (rowData.length < headerRow.length) {
          rowData.push(""); // Add empy cel
      }

      csvContent.push(rowData.join(","));
  });

  // Add "caloriesBurned" to CSV
  var caloriesDivContent = document.getElementById("caloriesBurned").textContent;
  csvContent.push(["", "", "", "", caloriesDivContent].join(","));

  // add a link for download file CSV
  var csvString = csvContent.join("\n");
  var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  var link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "workout_results.csv");
  document.body.appendChild(link); // Add link to doc
  link.click(); // start download link
}
  
  
  //CALORIES + tonify//
  // Function calculate kcal//
  function calculateTotalCalories3() {
    var rows = document.querySelectorAll("#workoutResultsBody tr");
  
    // start 0 kcal//
    var totalCalories = 0;
  
   

      // Verify
      rows.forEach(function (row) {
        // durations and repetitions by the current line
        var duration = parseFloat(row.cells[1].textContent);
        var repetitions = parseFloat(row.cells[2].textContent);
        var Weight = parseFloat(row.cells[3].textContent);


// VERIFY
if (weight === 0 || isNaN(weight)) {
  weight = 1; // WEIGHT IGUAL 1 IF 0 
}

// MANAGE ERRORS
if (isNaN(duration) || isNaN(repetitions)) {
  console.error("Missing duration or repetitions for a workout");
  return; 
}

// Calc KCAL FOR EXERCIZE
var calories = (duration / repetitions) * weight;
totalCalories += calories; // ADD KCAL
});

return totalCalories; // RETURN KCAL
}
  
  
  
  
  // analyze workout//
  function analyzeWorkout3() {
    // Calcolate total kcal
    var totalCalories = calculateTotalCalories3();
  
    // num kcal burn  id "caloriesBurned"
    var caloriesBurnedElement = document.getElementById("caloriesBurned");
    caloriesBurnedElement.textContent = "Incresed Lean mass %: " + totalCalories;
  }
  
  
  //DOWNLOAD
function downloadTableAsCSV() {
  var csvContent = [];
  var headerRow = ["Workout Name", "Duration (minutes)", "Repetitions", "Weight", "Lean mass"]; // title

  // Add headers table
  csvContent.push(headerRow.join(","));

  // Add datos a csv
  var rows = document.querySelectorAll("#workoutResultsBody tr");
  rows.forEach(function(row) {
      var rowData = [];
      row.querySelectorAll("td").forEach(function(cell) {
          rowData.push(cell.textContent);
      });

      // cel and row same number
      while (rowData.length < headerRow.length) {
          rowData.push(""); // Add empy cel
      }

      csvContent.push(rowData.join(","));
  });

  // Add "caloriesBurned" to CSV
  var caloriesDivContent = document.getElementById("caloriesBurned").textContent;
  csvContent.push(["", "", "", "", caloriesDivContent].join(","));

  // add a link for download file CSV
  var csvString = csvContent.join("\n");
  var blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  var link = document.createElement("a");
  link.setAttribute("href", URL.createObjectURL(blob));
  link.setAttribute("download", "workout_results.csv");
  document.body.appendChild(link); // Add link to doc
  link.click(); // start download link
}
//faq section"
function toggleAnswer(id) {
  const answer = document.getElementById(id);
  if (answer.style.display === "none") {
      answer.style.display = "block";
  } else {
      answer.style.display = "none";
  }
}
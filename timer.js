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


// send format //
function submitForm(event) {
  event.preventDefault(); 

  // read form value//
  var workoutName = document.getElementById("workoutName").value;
  var workoutDuration = document.getElementById("workoutDuration").value;
  var repetitions = document.getElementById("repetitions").value;

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
  cell1.innerHTML = workoutName;
  cell2.innerHTML = workoutDuration;
  cell3.innerHTML = repetitions;

  // Reset form after send /
  document.getElementById("workoutForm").reset();
}

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
    var calories = duration * repetitions;
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

  
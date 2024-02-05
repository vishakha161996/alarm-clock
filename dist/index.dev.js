"use strict";

var currentTime = document.querySelector("#current-time");
var setHours = document.querySelector("#hours");
var setMinutes = document.querySelector("#minutes");
var setSeconds = document.querySelector("#seconds");
var setAmPm = document.querySelector("#am-pm");
var setAlarmButton = document.querySelector("#submitButton");
var alarmContainer = document.querySelector("#alarms-container"); // Adding Hours, Minutes, Seconds in DropDown Menu

window.addEventListener("DOMContentLoaded", function (event) {
  dropDownMenu(1, 12, setHours);
  dropDownMenu(0, 59, setMinutes);
  dropDownMenu(0, 59, setSeconds);
  setInterval(getCurrentTime, 1000);
  fetchAlarm();
}); // Event Listener added to Set Alarm Button

setAlarmButton.addEventListener("click", getInput);

function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var timeString = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
  document.getElementById('clock').textContent = timeString;
} // Update the clock every second


setInterval(updateClock, 1000);

function dropDownMenu(start, end, element) {
  for (var i = start; i <= end; i++) {
    var dropDown = document.createElement("option");
    dropDown.value = i < 10 ? "0" + i : i;
    dropDown.innerHTML = i < 10 ? "0" + i : i;
    element.appendChild(dropDown);
  }
}

function getCurrentTime() {
  var time = new Date();
  time = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  });
  currentTime.innerHTML = time;
  return time;
}

function getInput(e) {
  e.preventDefault();
  var hourValue = setHours.value;
  var minuteValue = setMinutes.value;
  var secondValue = setSeconds.value;
  var amPmValue = setAmPm.value;
  var alarmTime = convertToTime(hourValue, minuteValue, secondValue, amPmValue);
  setAlarm(alarmTime);
} // Converting time to 24 hour format


function convertToTime(hour, minute, second, amPm) {
  return "".concat(parseInt(hour), ":").concat(minute, ":").concat(second, " ").concat(amPm);
}

function setAlarm(time) {
  var fetching = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var alarm = setInterval(function () {
    if (time === getCurrentTime()) {
      alert("Alarm Ringing");
    }

    console.log("running");
  }, 500);
  addAlaramToDom(time, alarm);

  if (!fetching) {
    saveAlarm(time);
  }
} // Alarms set by user Dislayed in HTML


function addAlaramToDom(time, intervalId) {
  var alarm = document.createElement("div");
  alarm.classList.add("alarm", "mb", "d-flex");
  alarm.innerHTML = "\n              <div class=\"time\">".concat(time, "</div>\n              <button class=\"btn delete-alarm\" data-id=").concat(intervalId, ">Delete</button>\n              ");
  var deleteButton = alarm.querySelector(".delete-alarm");
  deleteButton.addEventListener("click", function (e) {
    return deleteAlarm(e, time, intervalId);
  });
  alarmContainer.prepend(alarm);
} // Is alarms saved in Local Storage?


function checkAlarams() {
  var alarms = [];
  var isPresent = localStorage.getItem("alarms");
  if (isPresent) alarms = JSON.parse(isPresent);
  return alarms;
} // save alarm to local storage


function saveAlarm(time) {
  var alarms = checkAlarams();
  alarms.push(time);
  localStorage.setItem("alarms", JSON.stringify(alarms));
} // Fetching alarms from local storage


function fetchAlarm() {
  var alarms = checkAlarams();
  alarms.forEach(function (time) {
    setAlarm(time, true);
  });
}

function deleteAlarm(event, time, intervalId) {
  var self = event.target;
  clearInterval(intervalId);
  var alarm = self.parentElement;
  console.log(time);
  deleteAlarmFromLocal(time);
  alarm.remove();
}

function deleteAlarmFromLocal(time) {
  var alarms = checkAlarams();
  var index = alarms.indexOf(time);
  alarms.splice(index, 1);
  localStorage.setItem("alarms", JSON.stringify(alarms));
}
//# sourceMappingURL=index.dev.js.map

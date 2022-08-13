const daysE1 = document.getElementById("DAYS");
const hoursE1 = document.getElementById("hours");
const minsE1 = document.getElementById("mins");
const secondsE1 = document.getElementById("seconds");

const newYears = "14 august 2022";

function countDown() {
  const newYearsDate = new Date(newYears);
  const currentDate = new Date();

  const totalSeconds = (newYearsDate - currentDate) / 1000;

  const DAYS = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const mins = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysE1.innerHTML = DAYS;
  hoursE1.innerHTML = hours;
  minsE1.innerHTML = mins;
  secondsE1.innerHTML = seconds;

  console.log(DAYS, hours, mins, seconds); // console printting also
}

function formatTime(time) {
  return time < 10 ? `(0$(time))` : time;
}

countDown();
setInterval(countDown, 1000);

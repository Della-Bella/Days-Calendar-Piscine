import { renderCalendar } from "./modules/calendarViewNew.mjs";

//Controls Elements

const calendarControls = document.querySelector("calendar-controls");
const prevMonthBtn = document.getElementById("prev-month-btn");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const nextMonthBtn = document.getElementById("next-month-btn");

//Calendar
const calendarContainer = document.getElementById("calendar-container");

// monst important variable= will track month and year displaying in the Calendar
let currentDate = new Date();

console.log("calendar const general");

//the single most important function in your project=
// will be responsible for drawing and re-drawing the entire calendar every time the month changes.

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function populateDropdowns() {
  // Fill month dropdown
  monthNames.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  for (let y = currentYear - 100; y <= currentYear + 100; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

monthSelect.value = currentDate.getMonth();
yearSelect.value = currentDate.getFullYear();
const currentYear = currentDate.getFullYear();

monthSelect.addEventListener("change", () => {
  currentDate.setMonth(parseInt(monthSelect.value));
  renderCalendar(currentDate);
});
yearSelect.addEventListener("change", () => {
  currentDate.setFullYear(parseInt(yearSelect.value));
  renderCalendar(currentDate);
});

populateDropdowns();
renderCalendar(currentDate, calendarContainer);

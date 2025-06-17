import { renderCalendar } from "./modules/calendarViewNew.mjs";
import { populateDropdowns } from "./modules/dropdowns.mjs";
import { setupNavigation } from "./modules/navigationButton.mjs";

//Controls Elements

const calendarControls = document.querySelector("calendar-controls");
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");

//Calendar
const calendarContainer = document.getElementById("calendar-container");

// monst important variable= will track month and year displaying in the Calendar
let currentDate = new Date();

console.log("calendar const general");

//the single most important function in your project=
// will be responsible for drawing and re-drawing the entire calendar every time the month changes.

function syncDropdownsToDate() {
  monthSelect.value = currentDate.getMonth();
  yearSelect.value = currentDate.getFullYear();
}

populateDropdowns(monthSelect, yearSelect, currentDate);
syncDropdownsToDate();

setupNavigation(
  currentDate,
  renderCalendar,
  syncDropdownsToDate,
  calendarContainer
);

// Setup dropdown event listeners
monthSelect.addEventListener("change", () => {
  currentDate.setMonth(parseInt(monthSelect.value));
  renderCalendar(currentDate, calendarContainer);
});

yearSelect.addEventListener("change", () => {
  currentDate.setFullYear(parseInt(yearSelect.value));
  renderCalendar(currentDate, calendarContainer);
});

renderCalendar(currentDate, calendarContainer);

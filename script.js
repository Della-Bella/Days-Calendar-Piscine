import { renderCalendar } from "./modules/calendarViewNew.mjs";
import { populateDropdowns } from "./modules/dropdowns.mjs";

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

populateDropdowns(monthSelect, yearSelect, currentDate);
renderCalendar(currentDate, calendarContainer);

import { renderCalendar } from "./modules/calendarViewNew.mjs";
import { populateDropdowns } from "./modules/dropdowns.mjs";
import { setupNavigation } from "./modules/navigationButton.mjs";
import { loadSpecialDays } from "./modules/loadSpecialDays.mjs";
import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";

// Controls Elements
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");

// Calendar container
const calendarContainer = document.getElementById("calendar-container");

// Track the currently displayed date
let currentDate = new Date();

function syncDropdownsToDate() {
  monthSelect.value = currentDate.getMonth();
  yearSelect.value = currentDate.getFullYear();
}

// Load and render calendar with commemorative dates
async function renderWithSpecialDays() {
  const allDays = await loadSpecialDays();
  const specialDates = getCommemorativeDates(
    allDays,
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  renderCalendar(currentDate, calendarContainer, specialDates);
}

populateDropdowns(monthSelect, yearSelect, currentDate);
syncDropdownsToDate();

setupNavigation(
  currentDate,
  renderWithSpecialDays,
  syncDropdownsToDate,
  calendarContainer
);

// Dropdown listeners
monthSelect.addEventListener("change", () => {
  currentDate.setMonth(parseInt(monthSelect.value));
  renderWithSpecialDays();
});

yearSelect.addEventListener("change", () => {
  currentDate.setFullYear(parseInt(yearSelect.value));
  renderWithSpecialDays();
});

// Initial render
renderWithSpecialDays();

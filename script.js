import { renderCalendar } from "./modules/calendarViewNew.mjs";
import { setupDropdowns } from "./modules/dropdowns.mjs";
import { setupNavigation } from "./modules/navigationButton.mjs";
import { loadSpecialDays } from "./modules/loadSpecialDays.mjs";
import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";

// --- DOM Elements ---
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarContainer = document.getElementById("calendar-container");

// --- Main State Variable ---
let currentDate = new Date();

// --- Main Rendering Function ---
// This function combines fetching data with rendering the calendar.
// This is the new logic from the 'main' branch.
async function renderApp() {
  const allDays = await loadSpecialDays();
  const specialDates = getCommemorativeDates(
    allDays,
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  // We pass the special dates to the renderCalendar function
  renderCalendar(currentDate, calendarContainer, specialDates);
}

// --- Setup Modules ---
// Here we use your clean, refactored structure.

const syncDropdowns = setupDropdowns(
   currentDate,
   monthSelect,
   yearSelect,
   renderApp, // Pass the new main rendering function
   calendarContainer
);

setupNavigation(
   currentDate,
   renderApp, // Pass the new main rendering function
   syncDropdowns,
   calendarContainer
);

// --- Initial Render ---
renderApp();
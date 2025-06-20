import { renderCalendar } from "./modules/calendarViewNew.mjs";
import { setupDropdowns } from "./modules/dropdowns.mjs";
import { setupNavigation } from "./modules/navigationButton.mjs";
import { loadSpecialDays } from "./modules/loadSpecialDays.mjs";
import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";

// DOM Elements
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarContainer = document.getElementById("calendar-container");

// Get current month and year for the calendar.
let currentDate = new Date();

// Loads the special days and then renders the calendar with those dates.
async function renderApp() {
    try {
      const allDays = await loadSpecialDays();
      const specialDates = getCommemorativeDates(
        allDays,
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      renderCalendar(currentDate, calendarContainer, specialDates);
    } catch (error) {
      console.error("Failed to load special days:", error);
      calendarContainer.innerHTML =
        "<p>Something went wrong loading commemorative days.</p>";
    }
}
// Setup Dropdowns and Navigation
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

// Initial render of the calendar
renderApp();
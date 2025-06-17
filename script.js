

import { renderCalendar } from "./modules/calendarViewNew.mjs";
import { setupDropdowns } from "./modules/dropdowns.mjs"; 
import { setupNavigation } from "./modules/navigationButton.mjs";

// --- DOM Elements ---
const monthSelect = document.getElementById("month-select");
const yearSelect = document.getElementById("year-select");
const calendarContainer = document.getElementById("calendar-container");

// --- Main Variable ---
let currentDate = new Date();

// --- 3. Setup Modules ---

// Call the setup function. It will handle populating, syncing, and event listeners:
const syncDropdowns = setupDropdowns(
   currentDate,
   monthSelect,
   yearSelect,
   renderCalendar,
   calendarContainer
);

// navigation module the sync functions.
setupNavigation(
   currentDate,
   renderCalendar,
   syncDropdowns, // Pass the returned function here
   calendarContainer
);

// --- Initial Render ---
renderCalendar(currentDate, calendarContainer);

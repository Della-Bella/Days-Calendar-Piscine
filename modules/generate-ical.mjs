

import ical from "ical-generator";
import fs from "node:fs";


import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";
import { loadSpecialDays } from "./modules/loadSpecialDays.mjs";

// Wrap the main logic in an async function to use 'await'
async function createIcalFile() {
   // Load all the holiday rules from JSON file at the start.
   const allHolidayRules = await loadSpecialDays();
   if (!allHolidayRules || allHolidayRules.length === 0) {
      console.error("Could not load any holiday rules. Aborting.");
      return;
   }
   // Initialize the iCal generator
   const cal = ical({ name: "Commemorative Days Calendar" });

   // Loop through the desired range of years
   for (let year = 2020; year <= 2030; year++) {
      // Loop through each month of the year (0-11)
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
         // Use the date logic function to calculate the special dates for this specific month
         const specialDatesInMonth = getCommemorativeDates(
            allHolidayRules,
            year,
            monthIndex
         );

         // If any special dates were found, create events for them
         if (specialDatesInMonth.length > 0) {
            for (const specialDay of specialDatesInMonth) {
               const eventDate = new Date(
                  Date.UTC(year, monthIndex, specialDay.day)
               );

               cal.createEvent({
                  start: eventDate,
                  end: eventDate,
                  summary: specialDay.name,
                  allDay: true,
               });
            }
         }
      }
   }

   // Write the final .ics file to disk
   fs.writeFileSync("days.ics", cal.toString());
   console.log("\nSuccessfully created days.ics file!");
}

// Call the function to execute the logic
createIcalFile();

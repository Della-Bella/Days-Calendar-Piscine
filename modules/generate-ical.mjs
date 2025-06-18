

import ical from "ical-generator";
import fs from "node:fs";


import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";
import { loadSpecialDays } from "./modules/loadSpecialDays.mjs";

// We wrap the main logic in an async function to use 'await'
async function createIcalFile() {
   console.log("Starting iCal generation process...");

   // 1. Load all the holiday rules from your JSON file ONCE at the start.
   const allHolidayRules = await loadSpecialDays();
   if (!allHolidayRules || allHolidayRules.length === 0) {
      console.error("Could not load any holiday rules. Aborting.");
      return;
   }
   console.log(`Loaded ${allHolidayRules.length} holiday rules.`);

   // 2. Initialize the iCal generator
   const cal = ical({ name: "Commemorative Days Calendar" });

   console.log("Generating events for years 2020-2030...");

   // 3. Loop through the desired range of years
   for (let year = 2020; year <= 2030; year++) {
      // 4. Loop through each month of the year (0-11)
      for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
         // 5. Use your powerful logic function to calculate the special dates for this specific month
         const specialDatesInMonth = getCommemorativeDates(
            allHolidayRules,
            year,
            monthIndex
         );

         // 6. If any special dates were found, create events for them
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

               console.log(
                  `  - Creating event: ${specialDay.name} on ${eventDate
                     .toISOString()
                     .slice(0, 10)}`
               );
            }
         }
      }
   }

   // 7. Write the final .ics file to disk
   fs.writeFileSync("days.ics", cal.toString());
   console.log("\nSuccessfully created days.ics file!");
}

// Run the main function to start the process
createIcalFile();

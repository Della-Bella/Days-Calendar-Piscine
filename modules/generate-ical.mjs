// modules/generate-ical.mjs

import ical from "ical-generator";
import fs from "node:fs";


// --- START OF TEMPORARY MOCK FUNCTION ---
function getSpecialDayFor(dateToCheck) {
   const month = dateToCheck.getMonth();
   const day = dateToCheck.getDate();

   if (month === 4 && day === 11) {
      // Fake: May 11th
      return "International Binturong Day";
   }
   if (month === 8 && day === 7) {
      // Fake: Sep 7th
      return "International Vulture Awareness Day";
   }
   return null;
}
// --- END OF TEMPORARY MOCK FUNCTION ---

// --- YOUR ICAL GENERATOR LOGIC STARTS HERE ---
const cal = ical({ name: "Commemorative Days Calendar" });
console.log("Generating iCal events from 2020 to 2030...");

for (let year = 2020; year <= 2030; year++) {
   for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(Date.UTC(year, month, day));

         // Call the MOCK function to see if this day is special
         const specialDayName = getSpecialDayFor(currentDate);

         if (specialDayName) {
            cal.createEvent({
               start: currentDate,
               end: currentDate,
               summary: specialDayName,
               allDay: true,
            });
            console.log(
               `  - Found: ${specialDayName} on ${currentDate
                  .toISOString()
                  .slice(0, 10)}`
            );
         }
      }
   }
}

fs.writeFileSync("days.ics", cal.toString());
console.log("\nSuccessfully created days.ics file!");

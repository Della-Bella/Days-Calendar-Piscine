import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";
import { promises as fs } from "fs";
import { createRequire } from "module";

// A helper to load the JSON file correctly in an ES Module
const require = createRequire(import.meta.url);
const allRules = require("./days.json");

console.log("Starting to generate iCal file...");

// Header for the .ics file
let icalString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourProjectName//Piscine Calendar//EN
`;

// Loop through each month of each year from 2020 to 2030
for (let year = 2020; year <= 2030; year++) {
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    // Use our function to find the correct dates for this month and year
    const foundDays = getCommemorativeDates(allRules, year, monthIndex);

    // Check if any special days were found for this month
    if (foundDays.length > 0) {
      // If so, loop through each day that was found
      for (const day of foundDays) {
        // Create Date object for the event's start date
        const startDate = new Date(Date.UTC(year, monthIndex, day.day));

        // Create end date by adding one day to the start date
        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        // Format dates to YYYYMMDD, string format
        const formatAsYYYYMMDD = (dateObj) => {
          const y = dateObj.getUTCFullYear();
          const m = String(dateObj.getUTCMonth() + 1).padStart(2, "0");
          const d = String(dateObj.getUTCDate()).padStart(2, "0");
          return `${y}${m}${d}`;
        };

        const formattedStartDate = formatAsYYYYMMDD(startDate);
        const formattedEndDate = formatAsYYYYMMDD(endDate);

        // Create a unique ID for each specific event day
        const uid = `${day.name.replace(
          /\s/g,
          ""
        )}-${formattedStartDate}@piscine-calendar.com`;

        // Build the VEVENT block using the corrected dates
        icalString += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formattedStartDate}T000000Z
DTSTART;VALUE=DATE:${formattedStartDate}
DTEND;VALUE=DATE:${formattedEndDate}
SUMMARY:${day.name}
DESCRIPTION:Description for ${day.name} will go here.
END:VEVENT
`;
      }
    }
  }
}

// End the calendar file
icalString += `END:VCALENDAR`;

// Write the generated iCal string to a file
try {
  await fs.writeFile("days.ics", icalString);
  console.log(" Success! The days.ics file has been generated.");
} catch (error) {
  console.error("Error writing file:", error);
}

// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

/// Import the functions and data we need
import { getCommemorativeDates } from './modules/getCommemorativeDates.mjs';
import { promises as fs } from 'fs';
import { createRequire } from 'module';

// A helper to load the JSON file correctly in an ES Module
const require = createRequire(import.meta.url);
const allRules = require('./days.json');

console.log('Starting to generate iCal file...');

// This is the header for the .ics file. It must be at the top.
let icalString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourProjectName//Piscine Calendar//EN
`;

// Loop through each year from 2020 to 2030, as required
for (let year = 2020; year <= 2030; year++) {
  // Loop through each month of the year (0 for Jan, 11 for Dec)
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    
    // Use your shared function to find the correct dates for this month and year
    const foundDays = getCommemorativeDates(allRules, year, monthIndex);

    // Check if any special days were found for this month
    if (foundDays.length > 0) {
      // If so, loop through each day that was found
      for (const day of foundDays) {
        
        // --- THIS IS THE CRITICAL FIX ---
        // 1. Create a proper Date object for the event's start date
        const startDate = new Date(Date.UTC(year, monthIndex, day.day));
        
        // 2. Create the end date by adding ONE DAY to the start date
        const endDate = new Date(startDate);
        endDate.setUTCDate(endDate.getUTCDate() + 1);

        // 3. Helper function to format dates into the required YYYYMMDD string format
        const formatAsYYYYMMDD = (dateObj) => {
            const y = dateObj.getUTCFullYear();
            const m = String(dateObj.getUTCMonth() + 1).padStart(2, '0');
            const d = String(dateObj.getUTCDate()).padStart(2, '0');
            return `${y}${m}${d}`;
        };

        const formattedStartDate = formatAsYYYYMMDD(startDate);
        const formattedEndDate = formatAsYYYYMMDD(endDate); // This is now one day after the start
        // --- END OF THE FIX ---

        // Create a unique ID for each specific event instance
        const uid = `${day.name.replace(/\s/g, '')}-${formattedStartDate}@piscine-calendar.com`;

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

// This is the footer for the .ics file. It must be at the very end.
icalString += `END:VCALENDAR`;

// Use fs.writeFile to save the entire string to the days.ics file
// This will create the file or overwrite it if it already exists.
try {
  await fs.writeFile('days.ics', icalString);
  console.log(' Success! The days.ics file has been generated.');
} catch (error) {
  console.error('Error writing file:', error);
}
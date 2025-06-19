// This is a placeholder file which shows how you can access functions and data defined in other files. You can delete the contents of the file once you have understood how it works.
// It can be run with `node`.

// Import the functions 
import { getCommemorativeDates } from './modules/getCommemorativeDates.mjs';
import { promises as fs } from 'fs';
import { createRequire } from 'module';

//  load the JSON in an ES Module
const require = createRequire(import.meta.url);
const allRules = require('./days.json');

console.log('Starting to generate iCal file...');

//  header for the .ics file. 
let icalString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//YourProjectName//Piscine Calendar//EN
`;

// Loop through each year from 2020 to 2030
for (let year = 2020; year <= 2030; year++) {
  // Loop through each month of the year (0 for Jan, 11 for Dec)
  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    
    
    // call  function 
    const foundDays = getCommemorativeDates(allRules, year, monthIndex);

    //  check if the function found any special days for this month
    if (foundDays.length > 0) {
      // If it did, loop through each day it found
      for (const day of foundDays) {
        // Prepare the date in the required YYYYMMDD format
        const month = String(monthIndex + 1).padStart(2, '0');
        const date = String(day.day).padStart(2, '0');
        const formattedDate = `${year}${month}${date}`;

        // Create a unique ID for each event instance
        const uid = `${day.name.replace(/\s/g, '')}-${formattedDate}@piscine-calendar.com`;

        // Build the VEVENT block for this single event
        icalString += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${formattedDate}T000000Z
DTSTART;VALUE=DATE:${formattedDate}
DTEND;VALUE=DATE:${formattedDate}
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
  console.error(' error');
}
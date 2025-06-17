

// It doesn't need to be exported= help function
function populateDropdowns(monthSelect, yearSelect, currentDate) {
   const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
   ];

   monthNames.forEach((month, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = month;
      monthSelect.appendChild(option);
   });

   const currentYear = currentDate.getFullYear();
   for (let y = currentYear - 100; y <= currentYear + 100; y++) {
      const option = document.createElement("option");
      option.value = y;
      option.textContent = y;
      yearSelect.appendChild(option);
   }
}

//main function:

export function setupDropdowns(
   currentDate,
   monthSelect,
   yearSelect,
   renderCalendar,
   calendarContainer
) {
  
   const syncDropdownsToDate = () => {
      monthSelect.value = currentDate.getMonth();
      yearSelect.value = currentDate.getFullYear();
   };

   // Step 1: Populate the dropdowns with month/year options
   populateDropdowns(monthSelect, yearSelect, currentDate);

   // Step 2: Set their initial value
   syncDropdownsToDate();

   // Step 3: Add the event listeners that update the calendar
   monthSelect.addEventListener("change", () => {
      currentDate.setMonth(parseInt(monthSelect.value));
      renderCalendar(currentDate, calendarContainer);
   });

   yearSelect.addEventListener("change", () => {
      currentDate.setFullYear(parseInt(yearSelect.value));
      renderCalendar(currentDate, calendarContainer);
   });

   // Step 4: IMPORTANT - Return the sync function so the navigation buttons can use it!
   return syncDropdownsToDate;
}

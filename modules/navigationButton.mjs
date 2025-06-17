// modules/navigationButton.mjs

export function setupNavigation(
  currentDate,
  renderCalendar,
  syncDropdownsToDate,
  calendarContainer
) {
  const prevMonthBtn = document.getElementById("prev-month-btn");
  const nextMonthBtn = document.getElementById("next-month-btn");

  prevMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    syncDropdownsToDate();
    renderCalendar(currentDate, calendarContainer);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    syncDropdownsToDate();
    renderCalendar(currentDate, calendarContainer);
  });
}

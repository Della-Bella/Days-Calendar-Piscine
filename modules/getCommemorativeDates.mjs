export function getCommemorativeDates(allDays, year, monthIndex) {
  const specialDates = [];

  for (const day of allDays) {
    const targetMonth = new Date(`${day.monthName} 1, ${year}`).getMonth();
    if (targetMonth !== monthIndex) continue;

    // Convert day.dayName (e.g., "Monday") to a number using built-in JS
    const targetDayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ].indexOf(day.dayName);

    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    const matchingDates = [];

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, monthIndex, d);
      if (date.getDay() === targetDayIndex) {
        matchingDates.push(d);
      }
    }

    let finalDay;
    if (day.occurence === "first") finalDay = matchingDates[0];
    else if (day.occurence === "second") finalDay = matchingDates[1];
    else if (day.occurence === "third") finalDay = matchingDates[2];
    else if (day.occurence === "last")
      finalDay = matchingDates[matchingDates.length - 1];

    if (finalDay) {
      specialDates.push({
        day: finalDay,
        month: monthIndex,
        name: day.name,
        url: day.descriptionURL,
      });
    }
  }

  return specialDates;
}


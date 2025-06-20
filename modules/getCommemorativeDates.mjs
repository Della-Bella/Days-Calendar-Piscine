const dayIndexMap = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

function toMondayBasedIndex(jsDayIndex) {
  return (jsDayIndex + 6) % 7;
}

export function getCommemorativeDates(allDays, year, monthIndex) {
  const specialDates = [];

  for (const day of allDays) {
    const targetMonth = new Date(`${day.monthName} 1, ${year}`).getMonth();
    if (targetMonth !== monthIndex) continue;

    const targetDayIndex = dayIndexMap[day.dayName];
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    const matchingDates = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, monthIndex, d);
      if (toMondayBasedIndex(date.getDay()) === targetDayIndex) {
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

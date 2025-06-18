// modules/calendarView.mjs

//the single most important function in the project=
// will be responsible for drawing and re-drawing the entire calendar every time the month changes.

export function renderCalendar(
  currentDate,
  calendarContainer,
  specialDates = []
) {
  console.log("Rendering calendar...table");

  calendarContainer.innerHTML = "";
  // Create Table Calendar elements : <table>, <thead>, <tbody>, <tr>, <th>, and <td> elements
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  //Header Row
  const headerRow = document.createElement("tr");
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  //loop to create the days

  for (const day of daysOfWeek) {
    const th = document.createElement("th");
    th.textContent = day;
    headerRow.appendChild(th);
  }

  thead.appendChild(headerRow);

  table.appendChild(thead);
  table.appendChild(tbody);

  // Filling it with the actual days of the month:

  // 1- Getting the Date Information
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate(); // numbers of days in a month
  const firstDayOfMonth = new Date(year, month, 1); //start day
  //This formula converts Sunday (0) to 6, Monday (1) to 0, Tuesday (2) to 1, etc.
  const paddingDays = (firstDayOfMonth.getDay() + 6) % 7;

  //2- PADDING= Adding padidng in rows for add the day exactl on the row of the week correspond

  //1=
  let weekRow = document.createElement("tr"); // Create the first week's row = hold the padding cells and the first few days of the month
  for (let i = 0; i < paddingDays; i++) {
    const emptyCell = document.createElement("td"); // Create an empty cell
    weekRow.appendChild(emptyCell); // Add the empty cell to the row
  }

  //3 = The Main Day Loop
  for (let day = 1; day <= daysInMonth; day++) {
    // This is a cleaner way to handle week breaks
    if (weekRow.children.length === 7) {
      tbody.appendChild(weekRow);
      weekRow = document.createElement("tr");
    }
    const dayCell = document.createElement("td");
    dayCell.textContent = day;

    const special = specialDates.find((d) => d.day === day);

    if (special) {
      dayCell.style.backgroundColor = "lightyellow";
      const nameDiv = document.createElement("div");
      nameDiv.textContent = special.name;
      nameDiv.style.fontSize = "0.7em";
      nameDiv.style.color = "darkred";
      dayCell.appendChild(document.createElement("br"));
      dayCell.appendChild(nameDiv);
    }

    weekRow.appendChild(dayCell);
  }

  // This prevents the "extra empty row" bug.
  // We only do this if the last week actually has some days in it.
  if (weekRow.children.length > 0) {
    tbody.appendChild(weekRow);
  }

  console.log({
    message:
      "Calendar Data for " +
      firstDayOfMonth.toLocaleString("default", { month: "long" }),
    year: year,
    monthIndex: month,
    daysInMonth: daysInMonth,
    startDayIndex: paddingDays, // 0=Mon, 1=Tue...
  });

  // Finally, add the fully constructed table to the page
  calendarContainer.appendChild(table);
}

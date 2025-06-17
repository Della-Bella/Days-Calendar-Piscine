// modules/dropdowns.mjs

export function populateDropdowns(monthSelect, yearSelect, currentDate) {
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

  // Populate months
  monthNames.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  const currentYear = currentDate.getFullYear();

  // Populate years
  for (let y = currentYear - 100; y <= currentYear + 100; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelect.appendChild(option);
  }
}

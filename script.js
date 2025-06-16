
//Controls Elements

const calendarControls = document.getElementById("calendar-controls");
const prevMonthBtn = document.getElementById("prev-month-btn");
const monthsSelect = document.getElementById("month-select");
const yearSelect= document.getElementById("year-select");
const nextMonthBtn = document.getElementById("next-month-btn");


//Calendar 
const calendarContainer = document.getElementById( "calendar-container")

// monst important variable= will track month and year displaying in the Calendar
let currentDate = new Date();

console.log ("calendar const general")

//the single most important function in your project= 
// will be responsible for drawing and re-drawing the entire calendar every time the month changes.

function renderCalendar(){
    console.log("Rendering calendar...")
};



calendarContainer.innerHTML= '';
// Create Table Calendar elements : <table>, <thead>, <tbody>, <tr>, <th>, and <td> elements
const table = document.createElement("table")
const thead = document.createElement("thead")
const tbody = document.createElement ("tbody")

//Header Row
const headerRow = document.createElement('tr');
const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
//loop to create the days

for (const day of daysOfWeek){
    const th= document.createElement ("th");
    th.textContent= day;
    headerRow.appendChild(th)
}

thead.appendChild(headerRow);

table.appendChild(thead);
table.appendChild(tbody);
calendarContainer.appendChild(table);






renderCalendar();
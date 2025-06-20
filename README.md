# Days Calendar Project

This is a learning project developed as part of our JavaScript curriculum. The goal is to build a fully functional web-based calendar that dynamically calculates and displays commemorative days which occur on non-fixed dates, such as "the second Tuesday of every October."

This project covers a wide range of essential web development concepts, from DOM manipulation and modern JavaScript modules to unit testing and back-end scripting with Node.js.

**Live Demo:** https://days-calendar-piscine.netlify.app/

---

## Features

This project implements all the required features from the project brief, including:

-   **Interactive Web Calendar:** A clean, responsive calendar interface built with vanilla JavaScript.
-   **Dynamic Date Calculation:** A robust logic module that correctly calculates the dates of recurring commemorative days based on a set of rules defined in `days.json`.
-   **Full Navigation:** Users can navigate between months using "Previous" and "Next" buttons, or jump directly to any month and year using dropdown selectors.
-   **Shared Logic:** The core date calculation logic is shared between the front-end web application and the back-end iCal generator, demonstrating the "Don't Repeat Yourself" (DRY) principle.
-   **Unit Tested:** Core logic is verified with unit tests using the Jest testing framework.
-   **iCal File Generator:** A Node.js script that generates a standard `.ics` file, which can be imported into Google Calendar, Apple Calendar, or other calendar applications.
-   **Accessible Design:** The web interface is designed to be fully accessible, achieving a 100% score in Lighthouse accessibility audits.

---

## Tech Stack

-   **Front-End:** HTML5 & JavaScript (ES Modules)
-   **Testing:** Jest
-   **Back-End Scripting:** Node.js

---

## Project Structure

Our application is organized into several key files to maintain a clean and modular codebase:

-   `index.html`: The main entry point for the web application.
-   `script.js`: Initializes the web application.
-   `/modules`: This directory contains all our JavaScript modules.
    -   `calendarViewNew.mjs`: Handles all DOM manipulation for rendering the calendar grid.
    -   `web.mjs`: The main "controller" for the web app, handling user input.
    -   `common.mjs`: The shared logic for calculating commemorative dates.
    -   `days.json`: The data file containing the rules for the commemorative days.
    -   `generate-ical.mjs`: The Node.js script for generating the `.ics` file.
    -   `common.test.mjs`: The Jest unit tests for our shared logic.

---

## Our Learning Journey

This project was a fantastic opportunity to put our JavaScript knowledge into practice. Key takeaways include:

-   **Structuring Code with Modules:** Breaking down a complex application into smaller, single-responsibility modules (`view`, `controller`, `logic`) makes the code easier to manage and debug.
-   **The Importance of Testing:** Writing unit tests for our core logic gave us the confidence to build other features on top of it, knowing that the foundation was solid.
-   **Writing Reusable Code:** The challenge of sharing logic between the front-end and a back-end script taught us the value of writing pure, decoupled functions.

---
Project Contributors:

Priscilla-EM - https://github.com/Priscilla-EM
Della Bella- https://github.com/Della-Bella

_This project was created as part of the CodeYourFuture curriculum._

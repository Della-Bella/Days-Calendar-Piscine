// /modules/getCommemorativeDates.test.mjs

import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";

// describe() groups all the tests for one function together.
describe("getCommemorativeDates", () => {
   // First, we need to create some "mock" data.
   // This simulates the data that would be loaded from your days.json file.
   const mockAllDays = [
      {
         monthName: "October",
         dayName: "Monday",
         occurence: "second",
         name: "Columbus Day",
         descriptionURL: "columbus-url",
      },
      {
         monthName: "May",
         dayName: "Monday",
         occurence: "last",
         name: "Memorial Day",
         descriptionURL: "memorial-url",
      },
      {
         monthName: "January",
         dayName: "Monday",
         occurence: "third",
         name: "Martin Luther King, Jr. Day",
         descriptionURL: "mlk-url",
      },
      {
         // This is a rule for a different month to make sure it gets ignored correctly.
         monthName: "December",
         dayName: "Wednesday",
         occurence: "first",
         name: "A December Holiday",
         descriptionURL: "december-url",
      },
   ];

   // Test Case 1: The "Happy Path" - a standard calculation.
   test("should correctly find the second Monday of October 2024", () => {
      const year = 2024;
      const monthIndex = 9; // October is month 9 (0-indexed).

      // We manually calculate the correct answer to test against.
      // In Oct 2024, Mondays are the 7th, 14th, 21st, 28th. The second is the 14th.
      const expectedResult = [
        { day: 14, month: 9, name: "Columbus Day", url: "columbus-url" },
      ];

      const actualResult = getCommemorativeDates(mockAllDays, year, monthIndex);

      // .toEqual() is used to compare objects and arrays for deep equality.
      expect(actualResult).toEqual(expectedResult);
   });

   // Test Case 2: Testing the "last" occurrence logic.
   test("should correctly find the last Monday of May 2025", () => {
      const year = 2025;
      const monthIndex = 4; // May is month 4.

      // In May 2025, Mondays are the 5th, 12th, 19th, 26th. The last is the 26th.
      const expectedResult = [
        { day: 26, month: 4, name: "Memorial Day", url: "memorial-url" },
      ];

      const actualResult = getCommemorativeDates(mockAllDays, year, monthIndex);

      expect(actualResult).toEqual(expectedResult);
   });

   // Test Case 3: Testing an edge case - a month with no matching rules.
   test("should return an empty array for a month with no applicable holidays", () => {
      const year = 2024;
      const monthIndex = 7; // August is month 7.

      // There are no rules for August in our mock data.
      const actualResult = getCommemorativeDates(mockAllDays, year, monthIndex);

      // The function should gracefully return an empty array.
      expect(actualResult).toEqual([]);
   });
});

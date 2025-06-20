// /modules/getCommemorativeDates.test.mjs

import { getCommemorativeDates } from "./modules/getCommemorativeDates.mjs";

// describe() groups all the tests for one function together
describe("getCommemorativeDates", () => {
   // mock of the data structure that getCommemorativeDates expects
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

   
   test("should correctly find the second Monday of October 2024", () => {
      const year = 2024;
      const monthIndex = 9; // October is month 9 

      // In Oct 2024, Mondays are the 7th, 14th, 21st, 28th. The second is the 14th.
      const expectedResult = [
         { day: 14, name: "Columbus Day", url: "columbus-url" },
      ];

      const actualResult = getCommemorativeDates(mockAllDays, year, monthIndex);

      // .toEqual() is used to compare objects and arrays for deep equality.
      expect(actualResult).toEqual(expectedResult);
   });

   
// Testing last occurrence rule
   test("should correctly find the last Monday of May 2025", () => {
      const year = 2025;
      const monthIndex = 4; // May is month 4.

      // In May 2025, Mondays are the 5th, 12th, 19th, 26th. The last is the 26th.
      const expectedResult = [
         { day: 26, name: "Memorial Day", url: "memorial-url" },
      ];

      const actualResult = getCommemorativeDates(mockAllDays, year, monthIndex);

      expect(actualResult).toEqual(expectedResult);
   });


   // Testing an edge case, a month with no matching rules.
   test("should return an empty array for a month with no applicable holidays", () => {
      const year = 2024;
      const monthIndex = 7; // August is month 7.

      // There are no rules for August in our mock data.
      const actualResult = getCommemorativeDates(mockAllDays, year, monthIndex);

      // The function should return an empty array.
      expect(actualResult).toEqual([]);
   });
});

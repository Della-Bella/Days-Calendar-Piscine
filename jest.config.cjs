/** @type {import('jest').Config} */
const config = {
   // Automatically clear mock calls, instances, contexts and results before every test
   clearMocks: true,

   // Indicates whether the coverage information should be collected while executing the test
   collectCoverage: true,

   // The directory where Jest should output its coverage files
   coverageDirectory: "coverage",

   // Indicates which provider should be used to instrument code for coverage
   coverageProvider: "v8",

   // The glob patterns Jest uses to detect test files
   // This is the part you need to change!
   testMatch: [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)",
      "**/?(*.)+(spec|test).mjs",
   ],
};

module.exports = config;

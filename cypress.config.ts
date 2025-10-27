import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    videosFolder: "cypress/videos",
    screenshotsFolder: "cypress/screenshots",
    // videoUploadOnPasses findes ikke i TS config – det styres nu af CI/upload
  },
  video: true, // optag video
  screenshotOnRunFailure: true, // screenshot ved failure
});

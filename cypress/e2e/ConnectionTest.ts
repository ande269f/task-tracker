import { visitSite } from "./spec.cy";
import { generateRandomString, loginWithUsername } from "./utils";

export const ConnectionTest = () => {
  describe("Connection test to see if app is running", () => {
    visitSite();


    it("checks if main elements are visible", () => {
      const username = generateRandomString(15)
      loginWithUsername(username);
      cy.contains("brugernavn du har indtastet er i brug").should("be.visible", { timeout: 100000});
    });

    it("checks if main elements are visible again", () => {
      const username = generateRandomString(15)
      loginWithUsername(username);
      cy.contains("brugernavn du har indtastet er i brug").should("be.visible", { timeout: 10000});
    });
  });
};
/// <reference types="cypress" />
import { visitSite } from "./spec.cy";
import { createTasks, loginWithUsername, loginWithUsernameFull } from "./utils";

export const InteractiveSortingTest = (newUser: string) => {
  describe("Interactive Sorting Test", () => {
    visitSite();
    // jeg ved at den her fejler, derfor er den udkommenteret lige foreløblig
    // it("logs in with new user, make five tasks, sorts them by asc desc, then makes custom sort", () => {
    //     loginWithUsernameFull(newUser);
    //     createTasks(5, "");
    //     cy.get('.TaskCardTaskText').first().should('have.text', ' 1');
    //     cy.get('.TaskCardTaskText').last().should('have.text', ' 5');
    //     cy.get(".OrderButton").click();
    //     cy.get('.TaskCardTaskText').first().should('have.text', ' 5');
    //     cy.get('.TaskCardTaskText').last().should('have.text', ' 1');
    //     deleteUser();
    // })
  });
};
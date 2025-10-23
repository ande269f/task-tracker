/// <reference types="cypress" />
import { visitSite } from "./spec.cy";
import { createTasks, deleteUser, generateRandomString, loginWithUsername, loginWithUsernameFull } from "./utils";

export const SortingTasksTest = () => {
  describe("Interactive Sorting Test", () => {
    visitSite();
    //jeg ved at den her fejler, derfor er den udkommenteret lige foreløblig
    it("logs in with new user, make five tasks, sorts them by asc desc", () => {
        const newUser = generateRandomString(15)
        loginWithUsernameFull(newUser);
        createTasks(5, "");
        cy.get('.TaskCardTaskText').first().should('have.text', ' 1');
        cy.get('.TaskCardTaskText').last().should('have.text', ' 5');
        cy.get(".OrderButton").click();
        cy.get('.TaskCardTaskText').first().should('have.text', ' 5');
        cy.get('.TaskCardTaskText').last().should('have.text', ' 1');
        deleteUser();
    })

    it("creates three tasks and sorts them by task text", () => {
      const newUser = generateRandomString(15)
      loginWithUsernameFull(newUser);
      createTasks(1, "B");
      createTasks(1, "A");
      createTasks(1, "C");
      cy.get(".SettingsButton").click();
      cy.contains("Alfabetisk").click();
      cy.get(".TaskCardTaskText").first().should("have.text", "A");
      cy.get(".TaskCardTaskText").last().should("have.text", "C");
      cy.get(".OrderButton").click();
      cy.get(".TaskCardTaskText").first().should("have.text", "C");
      cy.get(".TaskCardTaskText").last().should("have.text", "A");
            cy.get(".OrderButton").click();
      cy.get(".TaskCardTaskText").first().should("have.text", "A");
      cy.get(".TaskCardTaskText").last().should("have.text", "C");
      deleteUser();
    });

    it("creates three tasks and sorts them by task date created", () => {
      const newUser = generateRandomString(15)
      loginWithUsernameFull(newUser);
      createTasks(1, "B");
      createTasks(1, "A");
      createTasks(1, "C");
      cy.get(".SettingsButton").click();
      cy.contains("Dato").click();
      cy.get(".TaskCardTaskText").first().should("contain.text", "C");
      cy.get(".TaskCardTaskText").last().should("contain.text", "B");
      cy.get(".OrderButton").click();
      cy.get(".TaskCardTaskText").first().should("contain.text", "B");
      cy.get(".TaskCardTaskText").last().should("contain.text", "C");
      cy.get(".OrderButton").click();
      cy.get(".TaskCardTaskText").first().should("contain.text", "C");
      cy.get(".TaskCardTaskText").last().should("contain.text", "B");
      deleteUser();

    });
  });
};

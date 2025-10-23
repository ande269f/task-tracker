import { deleteUser, generateRandomString } from "./utils";
import { loginWithUsername } from "./utils";
import { createTasks } from "./utils";
import { visitSite } from "./spec.cy";


export const CreateDeleteUserTest = (existingUsername: string, newUsername: string) => {
describe("create user and log in, then create two tasks and log out, login existing user and check tasks difference. Delete user", () => {

  visitSite();

  it("create user, make two tasks and log in, then log out", () => {
    loginWithUsername(newUsername);

    cy.contains("brugernavn du har indtastet er i brug").should("be.visible");
    cy.get(".CreateNewUserButton").click();
    cy.get("button").contains("Fortsæt").click();

    createTasks(2, "Task");

    cy.contains("Task 1").should("be.visible");
    cy.contains("Task 2").should("be.visible");

    cy.get(".SettingsButton").click();
    cy.contains("Log ud").click();
  });
  it("log in with same user and see if tasks are there", () => {
    loginWithUsername(newUsername);
    cy.contains("Task 1").should("be.visible");
    cy.contains("Task 2").should("be.visible");
  });

  it("log in with existing user and see if tasks are not there", () => {
    cy.get("input").should("have.class", "UsernameForm").type(existingUsername);
    cy.get("button").contains("Log ind").click();
    cy.contains("Task 1").should("not.exist");
    cy.contains("Task 2").should("not.exist");
    cy.get(".SettingsButton").click();
    cy.contains("Log ud").click();
  });

  it("log in with first created user again to delete the user, try logging in again to check if it is deleted", () => {
    loginWithUsername(newUsername);
    deleteUser();
    loginWithUsername(newUsername);
    cy.contains("brugernavn du har indtastet er i brug").should("be.visible");
  });


});
}
import { deleteUser, generateRandomString, logoutUser } from "./utils";
import { loginWithUsername } from "./utils";
import { createTasks } from "./utils";
import { visitSite } from "./spec.cy";
import { logout } from "../../src/store/slices/loginSlice/thunks";


export const CreateDeleteUserTest = (existingUsername: string, newUsername: string) => {
describe("create user and log in, then create two tasks and log out, login existing user and check tasks difference. Delete user", () => {

  visitSite();

  it("create user, make two tasks and log in, then log out", () => {
    loginWithUsername(newUsername);

    cy.contains("brugernavn du har indtastet er i brug").should("be.visible");
    cy.get(".CreateNewUserButton").click();
    cy.get("button").contains("Fortsæt").click();

    createTasks(2, "Task");
    //createTasks tjekker om de er visible efter oprettelse

    cy.get(".SettingsButton").click();
    cy.contains("Log ud").click();
  });
  it("log in with same user and see if tasks are there", () => {
    loginWithUsername(newUsername);
    cy.contains("Task 1").should("be.visible");
    cy.contains("Task 2").should("be.visible");
  });

  it("log in with existing user and see if tasks are not there", () => {
    loginWithUsername(existingUsername);
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

  it("create new user and set password", () => {
    const newUsername = generateRandomString(15); 
    loginWithUsername(newUsername);
    cy.contains("brugernavn du har indtastet er i brug").should("be.visible");
    cy.get(".CreateNewUserButton").click();
    cy.get(".PasswordForm").type("SecurePassword123!");
    cy.get(".PasswordForm").type("{enter}");
    logoutUser();
    loginWithUsername(newUsername);
    cy.get(".PasswordForm").type("SecurePassword123!");
    cy.get("button").contains("Log ind").click();
    deleteUser();
  })


});
}
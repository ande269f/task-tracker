/// <reference types="cypress" />
import { generateRandomString } from "./utils";
import { InteractiveSortingTest } from "./InteractiveSortingTest";

const existingUsername = "anders1";
const newUsername = generateRandomString(15);

export const visitSite = () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
}

//CreateDeleteUserTest(existingUsername, newUsername);

InteractiveSortingTest(newUsername);



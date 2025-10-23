/// <reference types="cypress" />
import { generateRandomString } from "./utils";
import { SortingTasksTest } from "./SortingTasksTest";
import { CreateDeleteTaskTest } from "./CreateDeleteTaskTest";
import { EditTaskTest } from "./EditTaskTest";
import { CreateDeleteUserTest } from "./CreateDeleteUser";

const existingUsername = "anders1";
const newUsername = generateRandomString(15);

export const visitSite = () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
}

// CreateDeleteUserTest(existingUsername, newUsername);
//SortingTasksTest();
// CreateDeleteTaskTest();
// EditTaskTest();



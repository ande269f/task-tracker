/// <reference types="cypress" />
import { generateRandomString } from "./utils";
import { SortingTasksTest } from "./SortingTasksTest";
import { CreateDeleteTaskTest } from "./CreateDeleteTaskTest";
import { EditTaskTest } from "./EditTaskTest";
import { CreateDeleteUserTest } from "./CreateDeleteUser";
import { ConnectionTest } from "./ConnectionTest";

const existingUsername = "anders1";
const newUsername = generateRandomString(15);

export const visitSite = () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/task-tracker/");
  });
}
ConnectionTest()
CreateDeleteUserTest(existingUsername, newUsername);
SortingTasksTest();
CreateDeleteTaskTest();
EditTaskTest();



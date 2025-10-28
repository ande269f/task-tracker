import { visitSite } from "./spec.cy";
import {
  createTasks,
  deleteUser,
  loginWithUsernameFull,
  openDeletedTasksAndMakeAction,
  openTaskActionsDropdownAndMakeAction,
} from "./utils";
import { generateRandomString } from "../../src/utils/arrayUtils";

export const CreateDeleteTaskTest = () => {
  describe("Creating a task and then deleting it by dropdown, then restoring it and then deleting by task completed, then deleting it permanently", () => {
    visitSite();

    it("creates a task, deletes it by dropdown, restores it", () => {
        const username = generateRandomString(15)
        loginWithUsernameFull(username);
        //creates and deletes task
        createTasks(2, "Task to delete");
        cy.contains("Task to delete 1").should("be.visible");
        openTaskActionsDropdownAndMakeAction("Task to delete 1", "Slet");
        cy.contains("Task to delete 1").should("not.exist");

        //opens deleted tasks and restores the deleted task
        openDeletedTasksAndMakeAction("Task to delete 1", ".RestoreTaskButton");
        cy.get(".CancelDialogButton").click();
        cy.contains("To-do opdateret").should("be.visible");
        cy.reload()
        cy.contains("Task to delete 1").should("be.visible");
        cy.contains("Task to delete 2").should("be.visible");

        //deletes restored task again and deletes it permanently from deleted tasks
        openTaskActionsDropdownAndMakeAction("Task to delete 1", "Slet");
        openDeletedTasksAndMakeAction("Task to delete 1", ".DeleteTaskPermanentlyButton");
        cy.get(".CancelDialogButton").click();
        cy.reload()
        cy.contains("Task to delete 1").should("not.exist");
        cy.contains("Task to delete 2").should("be.visible");
        deleteUser();

    })

    it("deletes task by marking it as completed, then deletes permanently from deleted tasks", () => {
      const username = generateRandomString(15);
      loginWithUsernameFull(username);
      createTasks(3, "Task");
      cy.contains("Task 1").parent().click();
      cy.contains("Task 2").parent().click();
      cy.get(".RemoveFinishedTasksButton").click();
      cy.get(".ConfettiComponent").should("be.visible");
      cy.contains("Task 1").should("not.exist");
      cy.contains("Task 2").should("not.exist");
      cy.contains("Task 3").should("be.visible");
      openDeletedTasksAndMakeAction("", ".DeleteAllTasksPermanentlyButton");

      cy.get(".CancelDialogButton").click();
      cy.contains("Task 1").should("not.exist");
      cy.contains("Task 2").should("not.exist");
      cy.contains("Task 3").should("be.visible");
      cy.reload();
      cy.contains("Task 1").should("not.exist");
      cy.contains("Task 2").should("not.exist");
      cy.contains("Task 3").should("be.visible");
      deleteUser();
    });

    it("creates a task and deletes it, then tries to make a new task with the same name", () => {
        const username = generateRandomString(15)
        loginWithUsernameFull(username);
        //creates and deletes a task
        createTasks(2, "Task to delete");
        cy.contains("Task to delete 1").should("be.visible");
        openTaskActionsDropdownAndMakeAction("Task to delete 1", "Slet");
        cy.contains("Task to delete 1").should("not.exist");
        createTasks(1, "Task to delete");
        cy.contains("Task to delete 1").should("be.visible");
    })
  });
};

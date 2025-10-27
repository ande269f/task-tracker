import { visitSite } from "./spec.cy";
import {
  checkNumberOfTaskEditsInDialog,
  createTasks,
  deleteUser,
  loginWithUsernameFull,
  openTaskActionsDropdownAndMakeAction,
} from "./utils";
import { generateRandomString } from "../../src/utils/arrayUtils";

export const EditTaskTest = () => {
  describe("Editing a task's text and checks task edits to see if the changes is showed", () => {
    visitSite();

    it("creates a task, edits its text, reloads the page and checks if the edited text is visible", () => {
      const username = generateRandomString(15);
      loginWithUsernameFull(username);
      createTasks(3, "task to edit");

      //checks that task details shows empty state before edit
      openTaskActionsDropdownAndMakeAction("task to edit 2", "Detaljer");
      cy.get(".EmptyState").should("be.visible");
      cy.get(".CancelDialogButton").click();

      //edits task text
      openTaskActionsDropdownAndMakeAction("task to edit 2", "Redigér");
      cy.get(".TaskCard").contains("task to edit 2").type("edited");
      cy.get("button").contains("Gem").click();
      cy.contains("editedtask to edit 2").should("be.visible");
      cy.reload();
      cy.contains("editedtask to edit 2").should("be.visible");

      //checks that task details shows that task have been edited
    checkNumberOfTaskEditsInDialog("task to edit 2", 1);
      cy.get(".CancelDialogButton").click();
      cy.reload();
      cy.contains("editedtask to edit 2").should("be.visible");
    deleteUser();
    });

    it("completes a task and then checks if the edit is shown in task details", () => {
      const username = generateRandomString(15);
      loginWithUsernameFull(username);
      createTasks(1, "task");
      cy.contains("task 1").parent().click();
      checkNumberOfTaskEditsInDialog("task 1", 1);
      cy.contains("Fuldført")
      cy.get(".CancelDialogButton").click();
      cy.contains("task 1").parent().click();
      cy.reload();
      checkNumberOfTaskEditsInDialog("task 1", 2);
      cy.contains("Aktiv")
      cy.get(".CancelDialogButton").click();
      deleteUser();
    });
  });
};

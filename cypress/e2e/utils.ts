import { logout } from "./../../src/store/slices/loginSlice/thunks";
export const loginWithUsername = (username: string) => {
  cy.get("input").should("have.class", "UsernameForm").type(username);
  cy.get("button").contains("Log ind").click();
};

export const loginWithUsernameFull = (username: string) => {
  cy.get("input").should("have.class", "UsernameForm").type(username);
  cy.get("button").contains("Log ind").click();
  cy.contains("brugernavn du har indtastet er i brug").should("be.visible");
  cy.get(".CreateNewUserButton").click();
  cy.get("button").contains("Fortsæt").click();
};

export const createTasks = (numberOfTasks: number, taskName: string) => {
  for (let i = 1; i <= numberOfTasks; i++) {
    cy.wait(400);
    const taskText = `${taskName} ${i}`;

    // Sørg for input er klar og tom tom
    cy.get("#InputField")
      .should("be.visible")
      .should("be.enabled")
      .clear()
      .type(taskText, { delay: 20 })
      .should("have.value", taskText);

    // Klik på submit
    cy.get("#SubmitButton").should("be.visible").should("be.enabled").click();

    // Vent på at task faktisk oprettes i DOM
    cy.get(".TaskCardTaskText").contains(taskText).should("be.visible");
  }
};

export const deleteUser = () => {
  cy.get(".SettingsButton").click();
  cy.contains("Slet bruger").click();
  cy.contains("Din bruger er blevet slettet").should("be.visible");
};

export const logoutUser = () => {
  cy.get(".SettingsButton").click();
  cy.contains("Log ud").click();
  cy.get(".UsernameForm").should("be.visible");
};

export const openDeletedTasksAndMakeAction = (
  taskText: string,
  buttonClass: string
) => {
  cy.get(".SettingsButton").click();
  cy.contains("Papirkurv").click();
  if (taskText === "") {
    cy.get(buttonClass).click();
    return;
  } else {
    cy.get(".DeletedTaskContainer")
      .contains(taskText)
      .parent()
      .parent()
      .parent()
      .find(buttonClass)
      .click();
    cy.get(".DeleteHistoryDialogBody").contains(taskText).should("not.exist");
    cy.wait(500);
  }
};

export const openTaskActionsDropdownAndMakeAction = (
  taskText: string,
  buttonText: string
) => {
  cy.get(".TaskCardTaskText")
    .contains(taskText)
    .parent()
    .next()
    .children()
    .first()
    .click();
  cy.wait(500);
  cy.get(".chakra-menu__item").contains(buttonText).click();
  cy.wait(500);
};

export const checkNumberOfTaskEditsInDialog = (
  taskText: string,
  expectedCount: number
) => {
  openTaskActionsDropdownAndMakeAction(taskText, "Detaljer");
  cy.wait(300);
  cy.get(".TaskDetailsDialogBody")
    .find(".TaskEdit")
    .should("have.length", expectedCount);
  cy.wait(300);
  
};

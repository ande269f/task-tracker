import { logout } from './../../src/store/slices/loginSlice/thunks';
export const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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
    const taskText = `${taskName} ${i}`;
    cy.get("#InputField").should("be.visible").should("be.enabled");
    cy.get("#InputField").type(taskText);
    cy.contains(taskText);
    cy.get("#SubmitButton").click();
    cy.get(".TaskCardTaskText").contains(taskText, { timeout: 5000 }).should("be.visible");
  }
};

export const deleteUser = () => {
  cy.get(".SettingsButton").click();
  cy.contains("Slet bruger").click();
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
  cy.get(".chakra-menu__item").contains(buttonText).click();
};

export const checkNumberOfTaskEditsInDialog = (taskText: string, expectedCount: number) => { 
          openTaskActionsDropdownAndMakeAction(taskText, "Detaljer");
           cy.get(".TaskDetailsDialogBody")
         .find(".TaskEdit")
         .should("have.length", expectedCount);
}
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
    cy.get("#InputField").type(taskText);
    cy.get("#SubmitButton").click();
  }
};

export const deleteUser = () => {
  cy.get(".SettingsButton").click();
  cy.contains("Slet bruger").click();
};

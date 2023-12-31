Cypress.Commands.add("login", (username, password) => {
  cy.visit("/");
  cy.getByData("username").type(username);
  cy.getByData("password").type(password);
  cy.getByData("login-button").click();
});

Cypress.Commands.add("getByData", (selector) => {
  return cy.get(`[data-test=${selector}]`);
});

describe("User Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("user").then((user) => {
      this.user = user;

  });
  it("User can successfully log in", () => {
    cy.login(this.user.username, this.user.password);
    cy.url().should("include", "/inventory.html");
  });

  it("System displays an error message when the credentials are invalid", () => {
    cy.getByData("username").type("wrong_username");
    cy.getByData("password").type("wrong_password");
    cy.getByData("login-button").click();
    cy.getByData("error")
      .should("be.visible")
      .contains(
        "Epic sadface: Username and password do not match any user in this service"
      );
  });

  it("System displays an error message when the fields are empty", () => {
    cy.getByData("login-button").click();
    cy.getByData("error")
      .should("be.visible")
      .contains("Epic sadface: Username is required");
  });

  it("Logout link logs the user out of the system", function () {
    cy.get("#logout_sidebar_link").click();
    cy.url().should("eq", "/");
  });

  it("Verify the user cannot access the inventory page without logging in", () => {
    cy.visit("/inventory.html");
    cy.getByData("error")
      .should("be.visible")
      .should(
        "contain.text",
        "Epic sadface: You can only access '/inventory.html' when you are logged in."
      );
  });
});

describe("Products", () => {
  beforeEach(() => {
    cy.fixture("user.json").then((user) => {
      cy.login(user.username, user.password);
    });
  });

  it("should verify the number of products", () => {
    cy.get("#inventory_container")
      .find(".inventory_item")
      .should("have.length", 6);
  });

  it("should verify the product details are visible", () => {
    cy.get(".inventory_list .inventory_item")
      .first()
      .within(() => {
        cy.get(".inventory_item_img").should("be.visible");
        cy.get(".inventory_item_name").should("be.visible");
        cy.get(".inventory_item_desc").should("be.visible");
        cy.get(".inventory_item_price").should("be.visible");
        cy.getByData("add-to-cart-sauce-labs-backpack").should("be.visible");
      });
  });

  it("should verify the product details page", () => {
    cy.get(".inventory_item_name").first().click();
    cy.getByData("back-to-products").should("exist");
    cy.location("pathname").should("eq", "/inventory-item.html");
  });
});

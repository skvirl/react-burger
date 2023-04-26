describe("template spec", () => {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("should open burger constructor by default", function () {
    cy.contains("Соберите бургер");
  });

  it("should open burger constructor by default", function () {
    cy.get('[data-cy="ingredientGroup__bun"] > :nth-child(1)').click();
    cy.contains("Детали ингредиента");
  });

  it("should drag ingredient to the constructor list", () => {
    const dataTransfer = new DataTransfer();
    cy.viewport(1600, 1200); // Set viewport to 550px x 750px
    // cy.get('.BurgerConstructor_inredientList__bRnQs').as('inredientList');
    cy.get('[data-cy="inredientList"]').as("inredientList");
    cy.get('[data-cy="createOrder"]').as("createOrder");
    cy.get('[data-cy="ingredientGroup__bun"] > :nth-child(1)').as(
      "bunIngredient"
    );
    cy.get('[data-cy="ingredientGroup__sauce"] > :nth-child(1)').as(
      "sauceIngredient"
    );
    cy.get('[data-cy="ingredientGroup__main"] > :nth-child(1)').as(
      "mainIngredient1"
    );
    cy.get('[data-cy="ingredientGroup__main"] > :nth-child(7)').as(
      "mainIngredient7"
    );

    cy.get("@bunIngredient").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@inredientList").trigger("drop", {
      dataTransfer,
    });

    cy.get("@sauceIngredient").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@inredientList").trigger("drop", {
      dataTransfer,
    });

    cy.get("@mainIngredient1").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@inredientList").trigger("drop", {
      dataTransfer,
    });

    cy.get("@mainIngredient7").trigger("dragstart", {
      dataTransfer,
    });
    cy.get("@inredientList").trigger("drop", {
      dataTransfer,
    });
    cy.get('[data-cy="createOrder"]');

    cy.get(
      '[data-cy="inredientList"] > :nth-child(1) > div > [data-cy="dragIcon"]'
    ).as("dragIcon");

    cy.get("@dragIcon").trigger("dragstart", { dataTransfer });
    cy.get('[data-cy="inredientList"] > :nth-child(2) > div').trigger(
      "drop",
      80,
      60,
      { dataTransfer }
    );

    cy.get("@createOrder").click();

    cy.get('[data-cy="loginBtn"]').click();

    // cy.get("@createOrder").click();

    // cy.wait(15000);

    // cy.contains("Ваш заказ начали готовить");
  });
});

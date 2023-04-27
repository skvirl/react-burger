import reducer, {
  setBun,
  addConstrucorIngredient,
  cleanConstructor,
  moveConstructorIngredient,
  removeConstrucorIngredient,
} from "../../services/slices/burgerConstructor";

const createIngredient = (val) => ({ constructorId: val, _id: val });

const selectedBunId = "selectedBunId";

const burgerConstructorElement = { constructorId: "constructorId", _id: "_id" };

const emptyState = {
  burgerConstructor: null,
  selectedBunId: null,
};

describe("burgerConstructor reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(emptyState, {})).toEqual(emptyState);
  });

  it("should set 'selectedBunId' with 'setBun' action", () => {
    const result = reducer(emptyState, {
      type: setBun.type,
      payload: selectedBunId,
    }).selectedBunId;
    expect(result).toBe(selectedBunId);
  });

  it("should remove 'burgerConstructor' and 'selectedBunId' data", () => {
    expect(
      reducer(
        { burgerConstructor: [burgerConstructorElement], selectedBunId },
        {
          type: cleanConstructor.type,
        }
      )
    ).toEqual(emptyState);
  });

  it("should add new Ingredient entry to burgerConstructor array", () => {
    const initialState = {
      burgerConstructor: [burgerConstructorElement],
      selectedBunId,
    };

    const resultState = {
      burgerConstructor: [burgerConstructorElement, burgerConstructorElement],
      selectedBunId,
    };

    const action = {
      type: addConstrucorIngredient.type,
      payload: {
        constructorId: burgerConstructorElement.constructorId,
        ingredientId: burgerConstructorElement._id,
      },
    };

    const result = reducer(initialState, action);

    expect(result).toEqual(resultState);
  });

  it("should move array element", () => {
    const initialState = {
      burgerConstructor: [1, 2, 3].map(createIngredient),
      selectedBunId,
    };

    const resultState = {
      burgerConstructor: [1, 3, 2].map(createIngredient),
      selectedBunId,
    };

    const action = {
      type: moveConstructorIngredient.type,
      payload: {
        dragIndex: 2,
        hoverIndex: 1,
      },
    };

    const result = reducer(initialState, action);

    expect(result).toEqual(resultState);
  });

  it("should remove element from array", () => {
    const initialState = {
      burgerConstructor: [1, 2, 3].map(createIngredient),
      selectedBunId,
    };

    const resultState = {
      burgerConstructor: [1, 3].map(createIngredient),
      selectedBunId,
    };

    const action = {
      type: removeConstrucorIngredient.type,
      payload: 2,
    };

    const result = reducer(initialState, action);

    expect(result).toEqual(resultState);
  });
});

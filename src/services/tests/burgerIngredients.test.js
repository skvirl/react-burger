import { jest } from "@jest/globals";
import reducer, { fetchBurgerIngredients } from "../slices/burgerIngredients";
import { resolvedResponse, rejectedResponse } from "../../tests/fetchThunk";

const data = [
  {_id:'any'},
  {_id:'data'},
  {_id:'inside'},
];

describe("BurgerIngredients  thunk", () => {
  resolvedResponse({
    fetchFunction: fetchBurgerIngredients,
    fetchFunctionName: "fetchBurgerIngredients",
    response: { success: true, data  },
  });

  rejectedResponse({
    fetchFunction: fetchBurgerIngredients,
    fetchFunctionName: "fetchBurgerIngredients",
  });
});

describe("BurgerIngredients extra reducers", () => {
  const initialState = {
  burgerIngredients: null,
  burgerIngredientsLoadingError: null,
  };

  it("should change state with pending action", () => {
    const state = reducer(initialState, fetchBurgerIngredients.pending());
    expect(state.burgerIngredients).toBeNull();
    expect(state.burgerIngredientsLoadingError).toBeNull();
  });

  it("should change state with fulfilled action", () => {

    const state = reducer(
      initialState,
      fetchBurgerIngredients.fulfilled({
        success: true,
        data,
      })
    );
    expect(state.burgerIngredients).toEqual(data);
    expect(state.burgerIngredientsLoadingError).toBeNull();
  });

  it("should change state with rejected action", () => {
    const rejectMessage = "page not found";

    const state = reducer(initialState, fetchBurgerIngredients.rejected(rejectMessage));

    expect(state.burgerIngredients).toBeNull();
    expect(state.burgerIngredientsLoadingError).toBe(rejectMessage);
  });
});

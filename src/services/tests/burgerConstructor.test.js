// import * as actions from "./actions";
// import * as types from "./constants";
import reducer from "../../services/slices/burgerConstructor";

const initialState = {
  burgerConstructor: null,
  selectedBunId: null,
};
describe("setBun reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it("should handle setBun", () => {
    expect(
      reducer(initialState, {
        type: "burgerConstructor/setBun",
        payload: "11111111",
      })
    ).toEqual({
      ...initialState,
      selectedBunId: "11111111",
    });
  });
});

import reducer from "../../services/slices/burgerConstructor";

const strData = "someTestString";
const initialState = {
  burgerConstructor: null,
  selectedBunId: null,
};
describe("burgerConstructor reducer", () => {
  it("should return the initial state", () => {
    expect(reducer(initialState, {})).toEqual(initialState);
  });

  it("should handle setBun action", () => {
    expect(
      reducer(initialState, {
        type: "burgerConstructor/setBun",
        payload: strData,
      })
    ).toEqual({
      ...initialState,
      selectedBunId: strData,
    });
  });
});

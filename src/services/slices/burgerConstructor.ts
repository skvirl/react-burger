import { createSlice } from "@reduxjs/toolkit";

type TConstructorElement = { constructorId: string; _id: string };
type TInitialState = {
  burgerConstructor: null | TConstructorElement[];
  selectedBunId: null | string;
};

const initialState: TInitialState = {
  burgerConstructor: null,
  selectedBunId: null,
};

const burgerSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBun(state, action) {
      state.selectedBunId = action.payload;
    },
    cleanConstructor(state, action) {
      console.log(`cleanConstructor`);
      state.burgerConstructor = null;
      state.selectedBunId = null;
    },
    addConstrucorIngredient(state, action) {
      state.burgerConstructor = [
        ...(state.burgerConstructor ? state.burgerConstructor : []),
        {
          constructorId: action.payload.constructorId,
          _id: action.payload.ingredientId,
        },
      ];
    },
    moveConstructorIngredient(state, action) {
      if (state.burgerConstructor === null) return;

      const { dragIndex, hoverIndex } = action.payload;

      const movingElement = state.burgerConstructor[dragIndex];
      state.burgerConstructor.splice(dragIndex, 1);
      state.burgerConstructor.splice(hoverIndex, 0, movingElement);
    },
    removeConstrucorIngredient(state, action) {
      if (state.burgerConstructor === null) return;

      state.burgerConstructor = state.burgerConstructor.filter(
        (val) => val.constructorId !== action.payload
      );
    },
  },
});

export default burgerSlice.reducer;

export const {
  setBun,
  addConstrucorIngredient,
  moveConstructorIngredient,
  removeConstrucorIngredient,
  cleanConstructor,
} = burgerSlice.actions;

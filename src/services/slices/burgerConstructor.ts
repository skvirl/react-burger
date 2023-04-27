import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TConstructorElement = { constructorId: string; _id: string };
type TInitialState = {
  burgerConstructor: null | TConstructorElement[];
  selectedBunId: null | string;
};

const initialState: TInitialState = {
  burgerConstructor: null,
  selectedBunId: null,
};
export type TBurgerConstructorSlice = { burgerConstructor: TInitialState };

const burgerSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBun(state, action: PayloadAction<string>) {
      state.selectedBunId = action.payload;
    },
    cleanConstructor(state) {
      state.burgerConstructor = null;
      state.selectedBunId = null;
    },
    addConstrucorIngredient(
      state,
      action: PayloadAction<{ constructorId: string; ingredientId: string }>
    ) {
      state.burgerConstructor = [
        ...(state.burgerConstructor ? state.burgerConstructor : []),
        {
          constructorId: action.payload.constructorId,
          _id: action.payload.ingredientId,
        },
      ];
    },
    moveConstructorIngredient(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      if (state.burgerConstructor === null) return;

      const { dragIndex, hoverIndex } = action.payload;

      const movingElement = state.burgerConstructor[dragIndex];
      if (movingElement === undefined) return;

      state.burgerConstructor.splice(dragIndex, 1);
      state.burgerConstructor.splice(hoverIndex, 0, movingElement);
    },
    removeConstrucorIngredient(state, action: PayloadAction<string>) {
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

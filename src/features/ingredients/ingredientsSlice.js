import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { searchIngredients } from "../../api/repository";

const initialState = {
  hints: [],
  selected: [],
  status: "idle",
  error: {
    display: false,
    info: null,
  },
  hintsNumber: 10,
};

export const fetchHints = createAsyncThunk(
  "ingredients/fetchHints",
  async (value, { getState }) => {
    const { hintsNumber } = getState().ingredients;
    const response = await searchIngredients(value, hintsNumber);
    console.log("response", response);
    return response.results;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    reset: (state) => initialState,
    addIngredient: (state, action) => {
      /* add unique ingredients */
      const existingIngr = state.selected.filter(
        (ingr) => ingr.name === action.payload.name
      );
      if (existingIngr.length !== 0) {
        return state;
      }

      state.selected = state.selected.concat(action.payload);
    },
    removeIngredient: (state, action) => {
      state.selected = state.selected.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    cleanSelected: (state) => {
      state.selected = [];
    },
    cleanHints: (state) => {
      state.hints = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHints.pending, (state) => {
        state = {
          ...initialState,
          status: "loading",
        };
      })
      .addCase(fetchHints.rejected, (state, action) => {
        state.status = "failed";
        state.error = { display: true, info: { ...action.error } };
      })
      .addCase(fetchHints.fulfilled, (state, action) => {
        state.status = "idle";
        state.hints = action.payload;
      });
  },
});

export const {
  reset,
  cleanHints,
  cleanSelected,
  addIngredient,
  removeIngredient,
} = ingredientsSlice.actions;

export const selectHints = (state) => state.ingredients.hints;
export const selectIngredients = (state) => state.ingredients.selected;
export const selectError = (state) => state.ingredients.error;

export default ingredientsSlice.reducer;

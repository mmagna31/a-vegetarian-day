import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  searchRandomRecipes,
  searchRecipesByIngredients,
} from "../../api/spoonacular";

const initialState = {
  recipes: [],
  status: "idle",
  error: {
    display: false,
    info: null,
  },
  nextOffset: 0,
  number: 1,
  totalResults: 0,
  nextIngredients: [],
};

export const fetchByIngredients = createAsyncThunk(
  "recipes/fetchByIngredients",
  async (ingredients, { getState }) => {
    const { nextOffset, number } = getState().recipes;
    const response = await searchRecipesByIngredients(
      number,
      nextOffset,
      ...ingredients
    );
    return response;
  }
);

export const fetchByIngredientsNext = () => (dispatch, getState) => {
  const { nextIngredients } = getState().recipes;
  dispatch(fetchByIngredients(nextIngredients));
};
export const fetchByIngredientsFirst = (ingredients) => (dispatch) => {
  dispatch(setNextIngredients(ingredients));
  dispatch(fetchByIngredients(ingredients));
};

export const fetchRandom = createAsyncThunk(
  "recipes/fetchRandom",
  async (_, { getState }) => {
    const { number } = getState().recipes;
    const response = await searchRandomRecipes(number);
    return response.recipes;
  }
);

export const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    cleanRecipes: (state) => {
      state.recipes = [];
    },
    setNextIngredients: (state, action) => {
      state.nextIngredients = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchByIngredients.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchByIngredients.rejected, (state, action) => {
        state.status = "failed";
        state.error = { display: true, info: { ...action.error } };
      })
      .addCase(fetchByIngredients.fulfilled, (state, action) => {
        state.status = "idle";
        if (state.nextOffset === 0) {
          state.recipes = action.payload.results;
        } else {
          state.recipes = state.recipes.concat(action.payload.results);
        }
        state.nextOffset = action.payload.number + action.payload.offset;
        state.totalResults = action.payload.totalResults;
        state.number = action.payload.number;
      })
      .addCase(fetchRandom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRandom.rejected, (state, action) => {
        state.status = "failed";
        state.error = { display: true, info: { ...action.error } };
      })
      .addCase(fetchRandom.fulfilled, (state, action) => {
        state.status = "idle";
        state.recipes = action.payload;
      });
  },
});

export const { cleanRecipes, setNextIngredients } = recipesSlice.actions;

export const selectRecipes = (state) => state.recipes.recipes;
export const selectError = (state) => state.recipes.error;
export const selectStatus = (state) => state.recipes.status;
export const selectTotalResults = (state) => state.recipes.totalResults;
export const selectNextOffset = (state) => state.recipes.nextOffset;
export const selectNumber = (state) => state.recipes.number;

export default recipesSlice.reducer;

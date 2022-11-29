import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  searchRandomRecipes,
  searchRecipesByQuery,
  searchRecipesByIngredients,
} from "../../api/repository";

const initialState = {
  recipes: [],
  status: "idle",
  error: {
    display: false,
    info: null,
  },
  nextOffset: 0,
  number: 6,
  totalResults: null,
  nextIngredients: [],
  nextQuery: null,
};

const isFetchPending = (action) => {
  return action.type.startsWith("recipes") && action.type.endsWith("/pending");
};

const isFetchRejected = (action) => {
  return action.type.startsWith("recipes") && action.type.endsWith("/rejected");
};

const isFetchFullfilled = (action) => {
  return (
    action.type.endsWith("fetchByIngredients/fulfilled") ||
    action.type.endsWith("fetchByQuery/fulfilled")
  );
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

export const fetchByQuery = createAsyncThunk(
  "recipes/fetchByQuery",
  async (query, { getState }) => {
    const { nextOffset, number } = getState().recipes;
    const response = await searchRecipesByQuery(number, nextOffset, query);
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

export const fetchByQueryNext = () => (dispatch, getState) => {
  const { nextQuery } = getState().recipes;
  dispatch(fetchByQuery(nextQuery));
};
export const fetchByQueryFirst = (query) => (dispatch) => {
  dispatch(setNextQuery(query));
  dispatch(fetchByQuery(query));
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
    setNextQuery: (state, action) => {
      state.nextSearch = action.payload;
    },
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRandom.fulfilled, (state, action) => {
        state.status = "idle";
        state.recipes = action.payload;
        state.totalResults = null;
      })
      .addMatcher(isFetchPending, (state, action) => {
        state.status = "loading";
      })
      .addMatcher(isFetchRejected, (state, action) => {
        state.status = "failed";
        state.error = { display: true, info: { ...action.error } };
      })
      .addMatcher(isFetchFullfilled, (state, action) => {
        state.status = "idle";
        if (state.nextOffset === 0) {
          state.recipes = action.payload.results;
        } else {
          state.recipes = state.recipes.concat(action.payload.results);
        }
        state.nextOffset = action.payload.number + action.payload.offset;
        state.totalResults = action.payload.totalResults;
        state.number = action.payload.number;
      });
  },
});

export const { cleanRecipes, setNextIngredients, setNextQuery, reset } =
  recipesSlice.actions;

export const selectRecipes = (state) => state.recipes.recipes;
export const selectError = (state) => state.recipes.error;
export const selectStatus = (state) => state.recipes.status;
export const selectTotalResults = (state) => state.recipes.totalResults;
export const selectNextOffset = (state) => state.recipes.nextOffset;
export const selectNumber = (state) => state.recipes.number;
export const selectNextIngredients = (state) => state.recipes.nextIngredients;
export const selectNextQuery = (state) => state.recipes.nextQuery;

export default recipesSlice.reducer;

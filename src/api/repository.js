import axios from "axios";

const instance = axios.create({
  // baseURL: "https://api.spoonacular.com",
  // // baseURL: "https://0fb7a6bf-c01e-4fc8-a0cb-3bdf62856769.mock.pstmn.io",
  baseURL: "https://23f03bbd-1e24-4163-a922-aadca00ad617.mock.pstmn.io",
  params: {
    apiKey: process.env.REACT_APP_SPOONACOLAR_API_KEY,
  },
  timeout: 3000,
});

export const searchIngredients = async (value, number) => {
  const response = await instance.get("food/ingredients/search", {
    params: {
      query: value,
      number,
      sortDirection: "desc",
      metaInformation: "true",
    },
  });
  return response.data;
};

/** Return the image url as string  */
export const getUrlImageIngredient = (imageName, size = 100) => {
  const sizeAvailable = [100, 250, 500];
  const baseURL = "https://spoonacular.com";

  if (!sizeAvailable.includes(size)) {
    throw new Error(`Size is not one of ${sizeAvailable}`);
  }

  return `${baseURL}/cdn/ingredients_${size}x${size}/${imageName}`;
};

export const searchRecipesByIngredients = async (number, offset, ...args) => {
  const isString = (item) => typeof item === "string";

  if (args.length === 0 || !args.every((item) => isString(item))) {
    throw new Error(`Argument must be a string`);
  }

  const response = await instance.get("recipes/complexSearch", {
    params: {
      diet: "vegetarian",
      includeIngredients: args.join(), // apples,flour,sugar
      addRecipeInformation: true,
      instructionsRequired: true,
      fillIngredients: true,
      sort: "min-missing-ingredients",
      sortDirection: "desc",
      number,
      offset,
    },
  });

  return response.data;
};

export const searchRandomRecipes = async (number) => {
  const response = await instance.get("recipes/random", {
    params: {
      tags: "vegetarian",
      number,
    },
  });

  return response.data;
};

export const searchRecipesInformation = async (recipeId) => {
  const response = await instance.get(
    `/recipes/${recipeId}/information?includeNutrition=false`
  );

  return response.data;
};

export const searchRecipesByQuery = async (number, offset, query) => {
  const response = await instance.get("recipes/complexSearch", {
    params: {
      query,
      diet: "vegetarian",
      addRecipeInformation: true,
      instructionsRequired: true,
      fillIngredients: true,
      number,
      offset,
    },
  });

  return response.data;
};

import React from "react";
import Loading from "../../components/Loading";
import Section from "../../components/Section";
import TitleSection from "../../components/TitleSection";
import RecipesList from "./RecipesList";

const RecipesSection = ({
  totalRecipes,
  recipes,
  handleDispatch,
  recipesStatus,
}) => {
  return (
    <Section>
      <TitleSection>Recipes</TitleSection>
      <RecipesSubtitles
        recipesStatus={recipesStatus}
        recipes={recipes}
        totalRecipes={totalRecipes}
      />
      <RecipesList
        recipes={recipes}
        onDispatch={handleDispatch}
        totalRecipes={totalRecipes}
      />
      {recipesStatus === "loading" ? (
        <div className="text-center m-2">
          <Loading />
        </div>
      ) : (
        ""
      )}
    </Section>
  );
};

export default RecipesSection;

const RecipesSubtitles = ({ recipesStatus, recipes, totalRecipes }) => {
  return (
    <p className="text-muted text-center">
      {recipesStatus === "loading"
        ? "Loading"
        : recipes.length > 0 && !totalRecipes
        ? "Suggested for you"
        : totalRecipes > 0
        ? `We have ${totalRecipes} recipes`
        : totalRecipes === 0
        ? `No recipe found`
        : ""}
    </p>
  );
};

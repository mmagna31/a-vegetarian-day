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
      <p className="text-muted text-center">
        {totalRecipes > 0
          ? `We have ${totalRecipes} recipes`
          : recipes.length === 0
          ? "No recipes found for selected ingredients"
          : "Suggested"}
      </p>
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
      {recipes.length === 0
        ? "no recipes-----------imposta immagine problema con primo rendering"
        : ""}
    </Section>
  );
};

export default RecipesSection;

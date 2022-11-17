import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Sanitized from "../components/Sanitized";
import {
  GiKnifeFork,
  GiGrain,
  GiMilkCarton,
  GiThreeLeaves,
} from "react-icons/gi";
import { BiCopyright, BiDish, BiTimeFive } from "react-icons/bi";
import { Col, ListGroup, Row } from "react-bootstrap/esm";
import DisplayError from "../components/DisplayError";
import { searchRecipesInformation } from "../api/repository";
import Loading from "../components/Loading";
import { v4 as uuidv4 } from "uuid";
import GeneralInfo from "../features/recipes/GeneralInfo";
import IngredientsList from "../features/recipes/IngredientsList";
import InstructionsSteps from "./InstructionsSteps";
import RecipeShortInfo from "./RecipeShortInfo";

const RecipeDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ display: false, info: null });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const data = await searchRecipesInformation(id);
        setData(data);
      } catch (err) {
        setError({ display: true, info: err });
      } finally {
        setLoading(false);
      }
    };
    // fetchData();

    setData({
      title: "test",
      summary: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      image: "https://spoonacular.com/recipeImages/64694-556x370.jpg",
    });
  }, [id]);

  const handleClose = () => {
    setError({
      ...error,
      display: false,
    });
  };

  const {
    title,
    summary,
    image,
    servings,
    readyInMinutes,
    dishTypes,
    occasions,
    vegan,
    glutenFree,
    dairyFree,
    creditsText,
    extendedIngredients,
    analyzedInstructions,
  } = data;

  if (loading) {
    return (
      <div className="text-center m-5">
        <Loading />
      </div>
    );
  }

  if (error?.info?.code === "ERR_BAD_REQUEST") {
    return <Container>NO RECIPE FOUND</Container>;
  }

  return (
    <>
      {error.display && <DisplayError {...error} handleClose={handleClose} />}
      <Container>
        <h1 className="font-custom text-center my-3 text-primary">{title}</h1>
        <Sanitized className="justifyText" htmlString={summary} />

        <RecipeShortInfo {...data} />

        {/* {extendedIngredients?.length > 0 && (
          <IngredientsList extendedIngredients={extendedIngredients} />
        )}
        {analyzedInstructions?.length > 0 && (
          <InstructionsSteps analyzedInstructions={analyzedInstructions} />
        )}

        <p className="text-center">
          <BiCopyright /> {creditsText}
        </p> */}
      </Container>
    </>
  );
};

export default RecipeDetails;

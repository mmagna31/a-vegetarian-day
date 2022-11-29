import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Sanitized from "../components/Sanitized";
import { BiCopyright } from "react-icons/bi";
import { Col, Row } from "react-bootstrap/esm";
import DisplayError from "../components/DisplayError";
import { searchRecipesInformation } from "../api/repository";
import Loading from "../components/Loading";
import IngredientsList from "../features/recipes/IngredientsList";
import InstructionsSteps from "../features/recipes/InstructionsSteps";
import RecipeInfo from "../features/recipes/RecipeInfo";
import WrappedLink from "../components/WrappedLink";

const RecipeDetails = () => {
  const { id } = useParams();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ display: false, info: null });

  const handleClose = () => {
    setError({
      ...error,
      display: false,
    });
  };

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
    fetchData();
  }, [id]);

  const {
    title,
    summary,
    occasions,
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

  if (error.info?.code === "ERR_BAD_REQUEST") {
    return <NoRecipeFound />;
  }

  return (
    <>
      {error.display && <DisplayError {...error} handleClose={handleClose} />}

      <Container>
        <BackButton />
        <h1 className="font-custom text-center my-3 text-primary">{title}</h1>
        <p className="text-center text-muted">
          Ideal for{" "}
          {occasions ? (
            <span className="text-capitalize">{occasions.join(", ")}</span>
          ) : (
            "any occasions"
          )}
        </p>
        <Sanitized className="justifyText" htmlString={summary} />

        <RecipeInfo {...data} />

        <Row className="mt-2">
          <Col xs={12} md={6}>
            {extendedIngredients?.length > 0 && (
              <IngredientsList extendedIngredients={extendedIngredients} />
            )}
          </Col>

          <Col xs={12} md={6}>
            {analyzedInstructions?.length > 0 && (
              <InstructionsSteps analyzedInstructions={analyzedInstructions} />
            )}
          </Col>
        </Row>

        <p className="text-center">
          <BiCopyright /> {creditsText}
        </p>
        <BackButton />
      </Container>
    </>
  );
};

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button className="m-3" onClick={() => navigate(-1)}>
      Back to recipes
    </Button>
  );
};

const NoRecipeFound = () => {
  return (
    <Container className="text-center">
      <h1 className="font-custom display-1 pt-5 ">No recipe Found</h1>
      <WrappedLink to="/">
        <Button>Back to Home</Button>
      </WrappedLink>
    </Container>
  );
};

export default RecipeDetails;

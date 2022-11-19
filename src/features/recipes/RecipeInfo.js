import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./RecipeInfo.module.css";
import { GiKnifeFork, GiGrain, GiThreeLeaves } from "react-icons/gi";
import { BiDish, BiTimeFive } from "react-icons/bi";

const RecipeInfo = ({
  image,
  title,
  dishTypes,
  readyInMinutes,
  servings,
  vegan,
  glutenFree,
}) => {
  const shortInfo = [
    { icon: <BiDish />, text: dishTypes?.join(", ") },
    { icon: <BiTimeFive />, text: `${readyInMinutes} Min` },
    { icon: <GiKnifeFork />, text: servings },
    {
      icon: <GiThreeLeaves />,
      text: vegan ? "Vegan" : null,
    },
    { icon: <GiGrain />, text: glutenFree ? "Gluten Free" : null },
  ];

  return (
    <Container className="border rounded">
      <Row>
        <Col xs={12} md={{ span: 6, order: 1 }} className="p-0">
          <img className={styles.imgRecipe} src={image} alt={title} />
        </Col>
        <Col xs={12} md={{ span: 6, order: 0 }} className="p-0">
          <div className="py-3 d-flex justify-content-around flex-md-column h-100 align-items-center">
            {shortInfo.map((info) => {
              return (
                info.text && (
                  <span className="text-capitalize font-custom fs-3">
                    {info.icon} {info.text}
                  </span>
                )
              );
            })}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RecipeInfo;

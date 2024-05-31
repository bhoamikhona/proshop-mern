import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating.jsx";
import { truncText } from "../utils/displayUtils.js";

function Product({ product }) {
  return (
    <>
      {/* <Card className="my-3 p-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} Reviews`}
            />
          </Card.Text>
          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card> */}

      <Link to={`product/${product._id}`} className="card-link-text">
        <Card className="my-3">
          <CardImg variant="top" src={product.image} />
          <CardBody>
            <CardTitle className="product-title">{product.name}</CardTitle>
            <CardText>{truncText(String(product.description), 100)}</CardText>
            <div className="d-flex align-items-center justify-content-between">
              <strong className="text-success card-price">
                ${product.price}
              </strong>
              <Button variant="outline-primary">More &rarr;</Button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </>
  );
}

export default Product;

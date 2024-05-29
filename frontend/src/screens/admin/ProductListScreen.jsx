import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaTimes, FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { useGetProductsQuery } from "../../slices/productsApiSlice.js";

function ProductListScreen() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const deleteHandler = function () {};

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button className="btn-sm m-3 d-flex align-items-center justify-content-center">
            <FaEdit /> &nbsp; Create Product
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table hover responsive bordered className="table-sm">
          <thead>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th>ACTIONS</th>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <Button variant="light" className="btn-sm mx-2">
                      <FaEdit style={{ color: "teal" }} />
                    </Button>
                  </Link>

                  <Button
                    variant="light"
                    className="btn-sm mx-2"
                    onClick={(e) => deleteHandler(product._id)}
                  >
                    <FaTrash style={{ color: "tomato" }} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductListScreen;

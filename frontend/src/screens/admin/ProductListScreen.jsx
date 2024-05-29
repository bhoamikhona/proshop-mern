import React from "react";
import { Link } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {
  useGetProductsQuery,
  useCreateProductMutation,
} from "../../slices/productsApiSlice.js";
import { toast } from "react-toastify";

function ProductListScreen() {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const deleteHandler = function (id) {};

  const createProductHandler = async function () {
    if (window.confirm("Are you sure you want to create a new product?")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            className="btn-sm m-3 d-flex align-items-center justify-content-center"
            onClick={createProductHandler}
          >
            <FaEdit /> &nbsp; Create Product
          </Button>
        </Col>
      </Row>

      {loadingCreate && <Loader />}
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
                    className="btn-sm m-2"
                    onClick={() => deleteHandler(product._id)}
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

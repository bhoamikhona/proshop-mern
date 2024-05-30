import React from "react";
import { Link, useParams } from "react-router-dom";
import { Table, Button, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from "../../slices/productsApiSlice.js";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate.jsx";

function ProductListScreen() {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async function (id) {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success("Product Deleted");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

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
      {loadingDelete && <Loader />}
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
            {data.products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button
                        variant="primary"
                        className="btn-sm mx-2 d-flex align-items-center justify-content-center"
                      >
                        <FaEdit style={{ color: "white" }} />
                      </Button>
                    </Link>

                    <Button
                      variant="danger"
                      className="btn-sm m-2 d-flex align-items-center justify-content-center"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{ color: "white" }} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Paginate pages={data.pages} page={data.page} isAdmin={true} />
    </>
  );
}

export default ProductListScreen;

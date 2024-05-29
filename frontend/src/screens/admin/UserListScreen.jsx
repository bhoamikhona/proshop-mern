import React from "react";
import { Link } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import { FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";
import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { useGetUsersQuery } from "../../slices/usersApiSlice.js";
import { toast } from "react-toastify";

function UserListScreen() {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const deleteHandler = async function (id) {};

  return (
    <>
      <h1>Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: "forestgreen" }} />
                  ) : (
                    <FaTimes style={{ color: "tomato" }} />
                  )}
                </td>
                <td>
                  {!user.isAdmin && (
                    <div className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/admin/user/${user.id}/edit`}
                        style={{ marginRight: "10px" }}
                      >
                        <Button
                          variant="primary"
                          className="btn-sm d-flex align-items-center"
                        >
                          <FaEdit color="white" />
                        </Button>
                      </Link>
                      <Button
                        variant="danger"
                        className="btn-sm d-flex align-items-center"
                        onClick={() => deleteHandler(user._id)}
                      >
                        <FaTrash style={{ color: "white" }} />
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserListScreen;

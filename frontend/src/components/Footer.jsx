import React from "react";
import { Navbar } from "react-bootstrap";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Navbar
      as="footer"
      role="footer"
      bg="dark"
      className="d-flex align-items-center justify-content-center"
    >
      <p className="text-light">Proshop &copy; {currentYear}</p>
    </Navbar>
  );
}

export default Footer;

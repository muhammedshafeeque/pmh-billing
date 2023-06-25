import React from "react";
import './Header.scss'
import { Row } from "react-bootstrap";
function Header() {
  return (
    <div className="header_main_div">
        <h2 className="mt-3">PMH STORE</h2>
        <Row className="mt-4">
            <h6>User</h6>
        </Row>
    </div>
  );
}

export default Header;

import React from "react";
import './Header.scss'
import { Row } from "react-bootstrap";
import ProfileDropDown from "../ProfileDropDown/ProfileDropDown";
function Header() {
  return (
    <div className="header_main_div">
        <h2 className="mt-3">PMH STORE</h2>
        <Row className="mt-4">
            <ProfileDropDown/>
        </Row>
    </div>
  );
}

export default Header;

import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { nav } from "../../Constants/routes";
function ProfileDropDown() {
  const handlelogGout = () => {
    localStorage.clear();
    window.location.href = nav.LOGIN;
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        User Name
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={handlelogGout}>Logout </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropDown;

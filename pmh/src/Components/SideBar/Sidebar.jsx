import React from "react";
import "./Sidebar.scss";
import { HomeSidebar } from "../../Constants/HomeSidebar/HomeSidebar";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

import { Button } from "react-bootstrap";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      {HomeSidebar.map((item) => {
        return (
          <div key={item.name} className="sidebar-item ">
            {item.sub ? (
              <Dropdown drop="end">
                <Dropdown.Toggle
                  style={{ width: "100%" }}
                  variant="primary"
                  id="dropdown-basic"
               
                >
                  <span>
                    <item.icon style={{ color: "white" }} /> {item.name}
                  </span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {item.sub.map((menu, i) => {
                    return (
                      <Dropdown.Item key={i} href="#/action-3"    onClick={(e)=>{
                        e.preventDefault()
                        navigate(menu.nav)
                      }}>
                      <span><menu.icon/></span>  {menu.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button
                className="col-md-12"
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.nav);
                }}
              >
                {" "}
                <span>
                  <item.icon />
                </span>{" "}
                {item.name}
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

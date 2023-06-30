import React from "react";
import "./Sidebar.scss";
import { HomeSidebar } from "../../Constants/HomeSidebar/HomeSidebar";
import { useNavigate } from "react-router-dom";
function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      {HomeSidebar.map((item) => {
        return (
          <div key={item.name} className="sidebar-item">
            <h6
              onClick={(e) => {
                e.preventDefault()
                navigate(item.nav);
              }}
            >
              <span>
                <item.icon />
              </span>{" "}
              {item.name}
            </h6>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

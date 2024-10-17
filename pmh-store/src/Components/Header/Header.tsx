import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch } from "react-icons/fa";
import { BiSolidMessageDetail } from "react-icons/bi";
import { ROUTERS } from "../../Constants/Routes";
import AvatarMenu from "../AvatarMenu/AvatarMenu";


const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="admin-header">
      <div className="header-content">
        <div className="logo-container">
          <h2 
            className="logo" 
            onClick={() => navigate(ROUTERS.HOME_ROUTER)}
          >
            PMH STORE
          </h2>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <button className="search-button">
            <FaSearch />
          </button>
        </div>
        <div className="header-right">
          <button className="icon-button">
            <FaBell />
          </button>
          <button className="icon-button">
            <BiSolidMessageDetail />
          </button>
          <AvatarMenu />
        </div>
      </div>
    </header>
  );
}

export default Header;

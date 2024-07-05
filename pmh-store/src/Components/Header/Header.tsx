import React from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa6";
import { BiSolidMessageDetail } from "react-icons/bi";
import { ROUTERS } from "../../Constants/Routes";
import AvatarMenu from "../AvatarMenu/AvatarMenu";


const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="admin_header row align-items-center pt-2">
      <div className="col-md-4">

        <h2 onClick={() => {
            navigate(ROUTERS.HOME_ROUTER);
          }}>PMH STORE</h2>

      </div>

      <div className="col-md-8 d-flex justify-content-end align-items-center">
        <div className="header-right_inner_with-avatar">
          <FaBell size={20} style={{ marginRight: "10%", marginTop: '15px' }} />
          <BiSolidMessageDetail
            size={20}
            style={{ marginRight: "10%", marginTop: '15px' }}
            className="mr-3"
          />
          <AvatarMenu />
        </div>
      </div>
    </div>
  );
}

export default Header;

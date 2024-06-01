import React, { useState, forwardRef, ReactNode, MouseEvent } from "react";
import { Dropdown } from "react-bootstrap";
import Avatar from "react-avatar";
import { usePmh } from "../../Contexts/PmhContext";


const AvatarMenu: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout, user } = usePmh();

  return (
    <Dropdown show={showDropdown} align="end" onToggle={setShowDropdown}>
      <Dropdown.Toggle
        as={CustomToggle}
        variant="light"
        id="dropdown-custom-components"
      >
        <Avatar name={user ? user.name : 'user'} size="40" round />
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ right: "0", transform: "translateX(-5%)" }}>
        <Dropdown.Item onClick={() => logout()}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

interface CustomToggleProps {
  children: ReactNode;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
}

const CustomToggle = forwardRef<HTMLButtonElement, CustomToggleProps>(
  ({ children, onClick }, ref) => {
    return (
      <button
        ref={ref}
        className="btn btn-light dropdown-toggle"
        type="button"
        style={{ backgroundColor: "transparent", border: "none" }}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
);

export default AvatarMenu;

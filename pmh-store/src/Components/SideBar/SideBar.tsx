import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { useLocation, useNavigate } from "react-router-dom";

interface Item {
  name: string;
  path?: string;
  icon: React.ComponentType<{ size: number, style?: React.CSSProperties }>;
  children?: Item[];
  isOpen?: boolean;
}

interface SideBarProps {
  items: Item[];
}

const SideBar: React.FC<SideBarProps> = ({ items }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [listItems, setListItems] = useState<Item[]>([]);

  useEffect(() => {
    if (items && items.length) {
      const updatedItems = items.map((item) => {
        const isOpen =
          item.path === location.pathname ||
          (item.children &&
            item.children.some((child) => child.path === location.pathname));
        return {
          ...item,
          isOpen: isOpen,
        };
      });
      setListItems(updatedItems);
    }
  }, [items, location.pathname]);

  const handleItemClick = (e: React.MouseEvent<HTMLButtonElement>, item: Item) => {
    e.preventDefault();
    if (item.children && item.children.length > 0) {
      setListItems((prevItems) =>
        prevItems.map((prevItem) => ({
          ...prevItem,
          isOpen: prevItem === item ? !prevItem.isOpen : false,
        }))
      );
    } else {
      setListItems((prevItems) =>
        prevItems.map((prevItem) => ({
          ...prevItem,
          isOpen: false,
        }))
      );
      item.path&&
      navigate(item.path)
    }
  };

  return (
    <div className="col-md-12 mt-5 side_bar">
      {listItems.map((item, index) => (
        <React.Fragment key={index}>
          <button
            onClick={(e) => handleItemClick(e, item)}
            className="side_bar_button col-md-11 mt-3"
            style={{
              backgroundColor: item.isOpen ? "black" : (item.path===location.pathname ? "black" : "blue"),
              marginBottom: item.isOpen ? "0" : "10px",
            }}
          >
            <span>
              <item.icon size={30} style={{ marginRight: "10px" }} />
            </span>
            {item.name}
          </button>
          {item.children && item.children.length > 0 && item.isOpen && (
            <div className={`child-items ${item.isOpen ? "open" : ""}`}>
              {item.children.map((child, childIndex) => (
                <button
                  key={childIndex}
                  onClick={(e) => {
                    e.preventDefault();
                    child.path&&
                    navigate(child.path);
                  }}
                  className="side_bar_child_button col-md-11 mt-1"
                  style={{
                    backgroundColor:
                      child.path === location.pathname ? "black" : "blue",
                  }}
                >
                  <span>
                    <child.icon size={25} style={{ marginRight: "10px" }} />
                  </span>
                  {child.name}
                </button>
              ))}
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default SideBar;

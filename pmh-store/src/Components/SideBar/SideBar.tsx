import React, { useEffect, useState } from "react";
import "./SideBar.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

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
      const updatedItems = items.map((item) => ({
        ...item,
        isOpen: item.path === location.pathname ||
          (item.children && item.children.some((child) => child.path === location.pathname))
      }));
      setListItems(updatedItems);
    }
  }, [items, location.pathname]);

  const handleItemClick = (item: Item) => {
    if (item.children && item.children.length > 0) {
      setListItems((prevItems) =>
        prevItems.map((prevItem) => ({
          ...prevItem,
          isOpen: prevItem === item ? !prevItem.isOpen : prevItem.isOpen,
        }))
      );
    } else {
      item.path && navigate(item.path);
    }
  };

  return (
    <div className="sidebar">
      {listItems.map((item, index) => (
        <div key={index} className="sidebar-item">
          <button
            onClick={() => handleItemClick(item)}
            className={`sidebar-button ${item.path === location.pathname ? 'active' : ''}`}
          >
            <span className="sidebar-icon">
              <item.icon size={20} />
            </span>
            <span className="sidebar-text">{item.name}</span>
            {item.children && item.children.length > 0 && (
              <span className="sidebar-arrow">
                {item.isOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </span>
            )}
          </button>
          {item.children && item.children.length > 0 && (
            <div className={`sidebar-children ${item.isOpen ? 'open' : ''}`}>
              {item.children.map((child, childIndex) => (
                <button
                  key={childIndex}
                  onClick={() => child.path && navigate(child.path)}
                  className={`sidebar-child-button ${child.path === location.pathname ? 'active' : ''}`}
                >
                  <span className="sidebar-icon">
                    <child.icon size={16} />
                  </span>
                  <span className="sidebar-text">{child.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SideBar;

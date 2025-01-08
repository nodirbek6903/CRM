import React, { useState } from "react";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaUserGraduate,
  FaCalendarCheck,
  FaMoneyBill,
} from "react-icons/fa";
import "./VerticalBar.css";
import { Link } from "react-router-dom";

const VerticalBar = () => {
  const [activeItem, setActiveItem] = useState(() => {
    const savedItem = localStorage.getItem("activeMenuItem");
    return savedItem ? parseInt(savedItem) : 1;
  });

  

  const handleClickActiveItem = (id) => {
    setActiveItem(id);
    localStorage.setItem("activeMenuItem", id)
  };

  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      icon: <FaHome className="menu-icon" />,
      to: "/",
    },
    {
      id: 2,
      name: "Kurslar",
      icon: <FaBook className="menu-icon" />,
      to: "/courses",
    },
    {
      id: 3,
      name: "Guruhlar",
      icon: <FaUsers className="menu-icon" />,
      to: "/groups",
    },
    {
      id: 4,
      name: "Talabalar",
      icon: <FaUserGraduate className="menu-icon" />,
      to: "/students",
    },
    {
      id: 5,
      name: "Davomat",
      icon: <FaCalendarCheck className="menu-icon" />,
      to: "/attendance",
    },
    {
      id: 6,
      name: "To'lovlar",
      icon: <FaMoneyBill className="menu-icon" />,
      to: "/payments",
    },
  ];

  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            to={item.to}
            key={item.id}
            className={`menu-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleClickActiveItem(item.id)}
          >
            {item.icon} {item.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default VerticalBar;

import React, { useState } from 'react'
import Images from '../../../assets/Resumeimg.jpg'
import "./HorizontalBar.css"
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
 
const HorizontalBar = () => {

  const [isToggled, setIsToggled] = useState(() => {
    const savedState = localStorage.getItem("ToggleState");
    return savedState ? JSON.parse(savedState) : false;
  })

  const toggleBtn = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    localStorage.setItem("ToggleState", JSON.stringify(newState))

  }

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link className="logo">IT Academy</Link>
      </div>
      <div className="navbar-center">
        <input
          type="text"
          className="search-input"
          placeholder="Global search"
        />
      </div>
      <div className="navbar-right">
        <span className="desktop-span">Open for Desktop</span>
        <div className={`toggle-btn ${isToggled ? "toggled" : ""}`} onClick={toggleBtn}>
          <span className={`desktop-btn ${isToggled ? "toggled" : ""}`}></span>
        </div>
        <FaBell className="bell-icon" />
        <div className="profile-icon">
          <img
            src={Images}
            alt="profile"
          />
        </div>
      </div>
    </div>
  )
}

export default HorizontalBar
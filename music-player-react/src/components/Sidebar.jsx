import React from "react";

function Sidebar() {
  return (
    <div className="sideBar">
      <h2 className="logo">VagiMuse</h2>

      <nav className="menu">
        <a href="#" className="active">Home</a>
        <a href="#">Search</a>
        <a href="#">Your Library</a>
        <a href="#">Vibe Mode</a>
        <a href="#">Discover</a>
      </nav>
    </div>
  );
}

export default Sidebar;

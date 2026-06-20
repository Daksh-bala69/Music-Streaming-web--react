import React from "react";

function Sidebar({ activePage, setActivePage }) {
  return (
    <div className="sideBar">
      <h2 className="logo">VagiMuse</h2>

      <nav className="menu">
        <button
          className={activePage === "home" ? "active" : ""}
          onClick={() => setActivePage("home")}
        >
          Home
        </button>

        <button
          className={activePage === "search" ? "active" : ""}
          onClick={() => setActivePage("search")}
        >
          Search
        </button>

        <button
          className={activePage === "library" ? "active" : ""}
          onClick={() => setActivePage("library")}
        >
          Your Library
        </button>

        <button
          className={activePage === "vibe" ? "active" : ""}
          onClick={() => setActivePage("vibe")}
        >
          Vibe Mode
        </button>

        <button
          className={activePage === "discover" ? "active" : ""}
          onClick={() => setActivePage("discover")}
        >
          Discover
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;
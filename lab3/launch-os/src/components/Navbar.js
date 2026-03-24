import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <nav>
        <NavLink className="nav-logo" to="/">
          Launch<span>OS</span>
        </NavLink>

        <ul className="nav-links">
          <li>
            <NavLink to="/" end>
              Мій Стартап
            </NavLink>
          </li>
          <li>
            <NavLink to="/market">Ринок</NavLink>
          </li>
          <li>
            <NavLink to="/investors">Інвестори</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
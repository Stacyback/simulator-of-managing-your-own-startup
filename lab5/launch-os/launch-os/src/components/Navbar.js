import React from "react";
import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <header>
      <nav>
        <Link to="/" className="nav-logo">
          Launch<span>OS</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Про LaunchOS</Link>
          <Link to="/market">Ринок</Link>
          <Link to="/investors">Інвестори</Link>

          {user ? (
            <>
              <Link to="/startup">Мій стартап</Link>
              <button className="nav-btn-primary" onClick={onLogout}>
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Увійти</Link>
              <Link to="/register" className="nav-btn-primary">
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
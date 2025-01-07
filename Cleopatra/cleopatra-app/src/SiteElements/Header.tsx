import React from "react";
import { Link } from "react-router-dom"; // Import Link
import './../Styles/HeaderStyle.css'; // Import stylów

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        logo
      </div>
      <div className="links">
        <div>
          <Link to="/">menu</Link>
        </div>
        <div>
          <Link to="/services">uslugi</Link>
        </div>
        <div>
          <Link to="/prices">cennik</Link>
        </div>
        <div>
          <Link to="/team">nasz zespol</Link>
        </div>
        <div>
          <Link to="/contact">kontakt</Link>
        </div>
        <div className="login">
          <div>
            <Link to="/login">zaloguj</Link>
          </div>
          <div>
            <Link to="/register">zarejestruj</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
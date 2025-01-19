import React from "react";
import { Link } from "react-router-dom"; // Import Link
import './../Styles/HeaderStyle.css'; // Import stylów

const token = localStorage.getItem('token');
const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};
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
        <div className="profile">
          {token ? (
            <div>
              <div>
            <Link to="/profile">Profil</Link>
          </div>
          <div>
            <Link to="/" onClick={handleLogout}>Wyloguj</Link>
          </div>
            </div>
          ) : (
            <div>
              <div>
            <Link to="/login">zaloguj</Link>
          </div>
          <div>
            <Link to="/register">zarejestruj</Link>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
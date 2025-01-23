import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import './../Styles/HeaderStyle.css'; // Import stylów

const token = localStorage.getItem('token');
const role = localStorage.getItem('role'); // Pobranie roli z localStorage

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('rola'); // Usuwamy także rolę przy wylogowaniu
  window.location.href = '/';
};

export default function Header() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (role === "Admin") {
      navigate('/employee-profile'); // Przekierowanie do profilu pracownika (admina)
    } else if (role === "User") {
      navigate('/customer-profile'); // Przekierowanie do profilu klienta (usera)
    } else {
      alert("Nieznana rola użytkownika."); // Obsługa sytuacji, gdy rola jest nieokreślona
    }
  };

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
          <Link to="/appsch">harmonogram</Link>
        </div>
        <div>
          <Link to="/contact">kontakt</Link>
        </div>
        <div className="profile">
          {token ? (
            <div>
              <div>
                {/* Kliknięcie na "Profil" uruchamia funkcję handleProfileClick */}
                <Link to="#" onClick={handleProfileClick}>Profil</Link>
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

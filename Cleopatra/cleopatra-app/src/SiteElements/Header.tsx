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
    <header className="header">
      <div className="logo">
        <img src="/Pictures/cleopatra1.jpg" alt="Anita" className="logo-img"/>
      </div>
      <nav className="navigation">
        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Menu</Link></li>
          <li><Link to="/services" className="nav-link">Usługi</Link></li>
          <li><Link to="/prices" className="nav-link">Cennik</Link></li>
          <li><Link to="/team" className="nav-link">Nasz zespół</Link></li>
          <li><Link to="/contact" className="nav-link">Kontakt</Link></li>
        </ul>
        <div className="profile-links">
          {token ? (
            <div>
              <div>
                <Link to="#" onClick={handleProfileClick} className="profile-link">Profil</Link>
              </div>
              <div>
                <Link to="/" onClick={handleLogout} className="logout-link">Wyloguj</Link>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <Link to="/login" className="auth-link">Zaloguj</Link>
              </div>
              <div>
                <Link to="/register" className="auth-link">Zarejestruj</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

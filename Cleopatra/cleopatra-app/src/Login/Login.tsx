import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import do przekierowania
import '../Styles/LoginStyles.css'; 

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate(); // Hook do przekierowania

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Wysyłanie danych do API
    try {
      const response = await fetch("http://localhost:5227/api/account/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
      
      const data = await response.json();
      setSuccess(data.message);

      // Zapisanie tokena w localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);
      console.log(data);

      // Po udanym logowaniu przekierowanie na stronę główną
      window.location.href = '/';
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Logowanie</h2>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Wpisz swój email"
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">Hasło</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Wpisz swoje hasło"
            className="form-input"
          />
        </div>
        
        <button type="submit" className="btn-submit">Zaloguj się</button>
      </form>
      
      <p className="redirect-signup">
        Nie masz jeszcze konta? <a href="/register">Zarejestruj się</a>
      </p>
    </div>
  );
};

export default Login;

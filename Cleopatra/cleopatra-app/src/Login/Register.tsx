import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import do przekierowania
import '../Styles/RegisterStyle.css'; 

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: ""
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

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Sprawdzamy, czy hasło spełnia wymagania
    if (!validatePassword(formData.password)) {
      setError(
        "Hasło musi zawierać co najmniej 1 dużą literę, 1 małą literę, 1 cyfrę, 1 znak specjalny i mieć co najmniej 6 znaków."
      );
      return;
    }

    // Sprawdzamy, czy hasła się zgadzają
    if (formData.password !== formData.confirmPassword) {
      setError("Hasła nie są zgodne.");
      return;
    }

    // Przygotowanie danych do wysłania
    const payload = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      dateOfBirth: new Date(formData.dateOfBirth).toISOString().split("T")[0],
      password: formData.password,
      confirmPassword: formData.confirmPassword // Dodane pole
    };

    try {
      const response = await fetch(`http://localhost:5227/api/account/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload) // Wysyłamy ConfirmPassword
      });
      console.log(payload);
      console.log("Odpowiedź serwera:", response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log("Błąd odpowiedzi:", errorData);
      }

      const data = await response.json();
      setSuccess(data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Rejestracja</h2>
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Imię</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Numer telefonu</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateOfBirth">Data urodzenia</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Hasło</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Potwierdź hasło</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn-submit">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
};

export default Register;

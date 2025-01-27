import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../Styles/NewProductStyle.css';

export default function NewProduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantityInStock, setQuantityInStock] = useState<number | string>("");
  const [pricePerUnit, setPricePerUnit] = useState<number | string>("");
  const [lastRestockedDate, setLastRestockedDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API = "http://localhost:5227/api/Products/AddProduct";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        API,
        {
          Name: name,
          Brand: brand,
          QuantityInStock: Number(quantityInStock),
          PricePerUnit: Number(pricePerUnit),
          LastRestockedDate: lastRestockedDate,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Produkt został dodany!");
      navigate("/products-management");
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Nie udało się dodać produktu. Sprawdź wprowadzone dane.");
    }
  };

  return (
    <div className="new-product-container">
      <h1 className="form-title">Dodaj nowy produkt</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label className="form-label">Nazwa:</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Marka:</label>
          <input
            type="text"
            className="form-input"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Ilość w magazynie:</label>
          <input
            type="number"
            className="form-input"
            value={quantityInStock}
            onChange={(e) => setQuantityInStock(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Cena za użycie:</label>
          <input
            type="number"
            className="form-input"
            step="0.01"
            value={pricePerUnit}
            onChange={(e) => setPricePerUnit(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Data ostatniego uzupełnienia:</label>
          <input
            type="date"
            className="form-input"
            value={lastRestockedDate}
            onChange={(e) => setLastRestockedDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Dodaj
        </button>
      </form>
    </div>
  );
}

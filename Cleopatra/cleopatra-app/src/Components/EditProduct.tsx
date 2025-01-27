import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Product } from "../Models/Product";
import '../Styles/EditProductStyle.css';

export default function EditProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const { product }: { product: Product } = location.state;

  const [name, setName] = useState<string>(product.Name);
  const [brand, setBrand] = useState<string>(product.Brand);
  const [quantityInStock, setQuantityInStock] = useState<number | string>(product.QuantityInStock);
  const [pricePerUnit, setPricePerUnit] = useState<number | string>(product.PricePerUnit);
  
  // Bez konwertowania, trzymamy wartość daty bez zmian
  const [lastRestockedDate, setLastRestockedDate] = useState<string>(product.LastRestockedDate.toString().split('T')[0]); 

  const [error, setError] = useState<string | null>(null);

  const API = `http://localhost:5227/api/Products/UpdateProduct/${product.ProductId}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Walidacja pól formularza
    if (
      !name ||
      !brand ||
      quantityInStock === "" ||
      isNaN(Number(quantityInStock)) ||
      pricePerUnit === "" ||
      isNaN(Number(pricePerUnit)) ||
      !lastRestockedDate
    ) {
      setError("Wszystkie pola są wymagane i ceny oraz ilość muszą być liczbami.");
      return;
    }

    const updatedProduct = {
      ProductId: product.ProductId,
      Name: name,
      Brand: brand,
      QuantityInStock: Number(quantityInStock),
      PricePerUnit: parseFloat(pricePerUnit as string),
      LastRestockedDate: lastRestockedDate,  // Wysyłamy datę bez zmian
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(API, updatedProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Produkt został zaktualizowany pomyślnie!");
      navigate("/products-management");
    } catch (err) {
      console.error("Error updating product:", err);
      setError("Nie udało się zaktualizować produktu. Spróbuj ponownie.");
    }
  };

  return (
    <div className="edit-product-form">
      <h1 className="form-title">Edytuj produkt</h1>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label">
            <strong>Nazwa:</strong>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="input-group">
          <label className="input-label">
            <strong>Marka:</strong>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="input-group">
          <label className="input-label">
            <strong>Ilość w magazynie:</strong>
            <input
              type="number"
              value={quantityInStock}
              onChange={(e) => setQuantityInStock(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="input-group">
          <label className="input-label">
            <strong>Cena za użycie (zł):</strong>
            <input
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>
        <div className="input-group">
          <label className="input-label">
            <strong>Data ostatniego uzupełnienia:</strong>
            <input
              type="date"
              value={lastRestockedDate}
              onChange={(e) => setLastRestockedDate(e.target.value)}
              required
              className="input-field"
            />
          </label>
        </div>
        <button
          type="submit"
          className="submit-button"
        >
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
}

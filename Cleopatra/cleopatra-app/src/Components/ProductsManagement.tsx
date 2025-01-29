import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../Models/Product";
import axios from "axios";
import moment from "moment";
import '../Styles/ProductsListStyle.css';

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const API = "http://localhost:5227/api/Products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEditClick = (product: Product) => {
    navigate(`/edit-product`, { state: { product } });
  };

  if (loading) return <div className="loading">Ładowanie...</div>;
  if (error) return <div className="error-message">Błąd: {error}</div>;

  return (
    <div className="product-list">
      <h1 className="product-list-title">Produkty</h1>
      <button
        onClick={() => navigate("/new-product")}
        className="btn-new-product"
      >
        Dodaj nowy produkt
      </button>
      <ul className="product-items-list">
        {products.map((product) => (
          <li key={product.ProductId} className="product-item">
            <div>
              <div className="product-detail"><strong>Nazwa:</strong> {product.Name}</div><br></br>
              <div className="product-detail"><strong>Marka:</strong> {product.Brand}</div>
              <div className="product-detail"><strong>Ilość w magazynie:</strong> {product.QuantityInStock}</div>
              <div className="product-detail"><strong>Cena za użycie:</strong> {product.PricePerUnit}</div>
              <div className="product-detail">
                <strong>Data ostatniego uzupełnienia:</strong>{" "}
                {moment(product.LastRestockedDate).format("YYYY-MM-DD")}
              </div>
            </div><br></br>
            <div>
              <button
                onClick={() => handleEditClick(product)}
                className="btn-edit-product"
              >
                Edytuj
              </button>
            </div>
            
          </li>
        ))}
      </ul>
    </div>
  );
}

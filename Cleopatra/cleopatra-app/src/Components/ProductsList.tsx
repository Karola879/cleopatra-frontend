import { useState, useEffect } from "react";
import { Product } from "../Models/Product";
import axios from "axios";
import moment from "moment";
import '../Styles/ProductsListStyle.css';

export default function ServicesList() {

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();
  const token = localStorage.getItem("token");

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="product-list">
       <h1>Materiały</h1>
       <ul>
           {products.map((product) => (
               <li key={product.ProductId} className="product-item">
                   <div><strong>Nazwa:</strong> {product.Name}</div>
                    <div><strong>Marka:</strong> {product.Brand}</div>
                    <div><strong>Ilość w magazynie:</strong> {product.QuantityInStock}</div>
                    <div><strong>Cena za użycie:</strong> {product.PricePerUnit}</div>
                    <div><strong>Data ostatniego uzupełnienia:</strong> {moment(product.LastRestockedDate).format("YYYY-MM-DD")}</div>
               </li>
           ))}
       </ul>
   </div>
);
}

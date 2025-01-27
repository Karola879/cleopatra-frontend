import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../Styles/NewServiceStyles.css'; // Importowanie pliku CSS

export default function NewService() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState<number | string>("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const API = "http://localhost:5227/api/Services"; // Endpoint API

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Clear any previous errors

        // Validation
        if (!name || !description || price === "" || isNaN(Number(price))) {
            setError("Wszystkie pola są wymagane i cena musi być liczbą.");
            return;
        }

        const newService = {
            name,
            description,
            price: parseFloat(price as string),
        };

        try {
            const token = localStorage.getItem("token");
            await axios.post(API, newService, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Nowa usługa została dodana pomyślnie!");
            navigate("/services-management"); // Redirect to services list
        } catch (err) {
            console.error("Error creating service:", err);
            setError("Nie udało się dodać nowej usługi. Spróbuj ponownie.");
        }
    };

    return (
        <div className="new-service-form">
            <h1 className="form-heading">Dodaj nową usługę</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">
                        <strong>Nazwa:</strong>
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">
                        <strong>Opis:</strong>
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">
                        <strong>Cena (zł):</strong>
                    </label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button type="submit" className="submit-button">
                    Dodaj
                </button>
            </form>
        </div>
    );
}

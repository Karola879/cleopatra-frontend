import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Service } from "../Models/Service";
import '../Styles/EditServicesStyle.css';

export default function EditService() {
    const location = useLocation();
    const navigate = useNavigate();
    const { service }: { service: Service } = location.state;

    const [name, setName] = useState(service.name);
    const [description, setDescription] = useState(service.description);
    const [price, setPrice] = useState<number | string>(service.price);
    const [error, setError] = useState<string | null>(null);

    const API = `http://localhost:5227/api/Services/${service.serviceId}`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name || !description || price === "" || isNaN(Number(price))) {
            setError("Wszystkie pola są wymagane i cena musi być liczbą.");
            return;
        }

        const updatedService = {
            ...service,
            name,
            description,
            price: parseFloat(price as string),
        };

        try {
            const token = localStorage.getItem("token");
            await axios.put(API, updatedService, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Usługa została zaktualizowana pomyślnie!");
            navigate("/services-management");
        } catch (err) {
            console.error("Error updating service:", err);
            setError("Nie udało się zaktualizować usługi. Spróbuj ponownie.");
        }
    };

    return (
        <div className="edit-service-form">
            <h1 className="form-title">Edytuj usługę</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="input-label">
                        <strong>Nazwa:</strong>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                        />
                    </label>
                </div>
                <div className="input-group">
                    <label className="input-label">
                        <strong>Opis:</strong>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="textarea-field"
                        />
                    </label>
                </div>
                <div className="input-group">
                    <label className="input-label">
                        <strong>Cena (zł):</strong>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="input-field"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">
                    Zapisz zmiany
                </button>
            </form>
        </div>
    );
}

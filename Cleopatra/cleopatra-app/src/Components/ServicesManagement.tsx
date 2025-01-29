import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../Models/Service";
import axios from "axios";

export default function ServicesManagement() {
    const navigate = useNavigate();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();

    const API = "http://localhost:5227/api/Services";

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(API);
                setServices(response.data);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to fetch services.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleEditClick = (service: Service) => {
        navigate(`/edit-service`, { state: { service } });
    };

    const handleDeleteClick = async (serviceId: number) => {
        const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę usługę?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`${API}/${serviceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setServices((prev) => prev.filter((service) => service.serviceId !== serviceId));
            alert("Usługa została pomyślnie usunięta.");
        } catch (err) {
            console.error("Error deleting service:", err);
            setError("Nie udało się usunąć usługi. Spróbuj ponownie.");
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="prices-list">
            <h1>Usługi</h1>
            <ul>
                {services.map((service) => (
                    <li
                        key={service.serviceId}
                        className="service-item"
                    >
                        <div>
                            <strong>{service.name}</strong> <br /><br></br>
                            Opis: {service.description} <br /><br></br>
                            Cena: {service.price} zł <br />
                        </div>
                        
                        <div style={{ marginTop: "10px" }}>
                            <button
                                onClick={() => handleEditClick(service)}
                            >
                                Edytuj
                            </button>
                            <button
                                onClick={() => handleDeleteClick(service.serviceId)}
                            >
                                Usuń
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <button
                    className="add-service-button"
                    onClick={() => navigate("/new-service")}
                >
                    Dodaj nową usługę
                </button>
        </div>
    );
}

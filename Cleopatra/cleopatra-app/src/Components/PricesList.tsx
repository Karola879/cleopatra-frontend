import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../Models/Service";
import axios from "axios";
import "../Styles/PricesListStyle.css";

export default function Prices() {
    const navigate = useNavigate();

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const [isAdmin, setIsAdmin] = useState(false); // State to track role

    const API = "http://localhost:5227/api/Services";

    useEffect(() => {
        // Check role from localStorage
        const role = localStorage.getItem("role");
        setIsAdmin(role === "Admin");

        const fetchServices = async () => {
            try {
                const response = await axios.get(API);
                setServices(response.data);
                console.log(response.data);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError("Failed to fetch services.");
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error-message">Error: {error}</div>;

    const handleScheduleClick = (serviceId: number) => {
        const token = localStorage.getItem("token");

        if (!token) {
            // If token is missing, redirect to login
            navigate("/login");
        } else {
            // If token exists, navigate to the appointment scheduling page
            navigate(`/newappointment/${serviceId}`);
        }
    };

    return (
        <div className="prices-list">
            <h1 className="prices-title">Cennik</h1>
            <ul className="service-list">
                {services.map((service) => (
                    <li key={service.serviceId} className="service-item">
                        <div>
                            <strong className="service-name">{service.name}</strong><br></br><br></br>
                            <span className="service-duration">Czas trwania: 50 minut</span><br></br><br></br>
                            <span className="service-price">Cena: {service.price} zł</span>
                        </div>
                        <div>
                            {!isAdmin && (
                                <button
                                    onClick={() => handleScheduleClick(service.serviceId)}
                                    className="schedule-button"
                                >
                                    Umów usługę
                                </button>
                            )}
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

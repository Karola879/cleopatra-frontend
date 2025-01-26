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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

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
            <h1>Cennik</h1>
            <ul>
                {services.map((service) => (
                    <li key={service.serviceId} className="service-item">
                        <strong>{service.name}</strong> <br />
                        Czas trwania: 50 minut <br />
                        Cena: {service.price} zł <br />
                        {/* Show the button only if the user is not an Admin */}
                        {!isAdmin && (
                            <button onClick={() => handleScheduleClick(service.serviceId)}>
                                Umów usługę
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

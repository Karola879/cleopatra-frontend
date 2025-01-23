import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../Models/Service";
import axios from "axios";

export default function Prices() {
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
        navigate(`/newappointment/${serviceId}`);
    };

    return (
      <div className="person-list">
          <h1>Cennik</h1>
          <ul>
              {services.map((service) => (
                  <li key={service.serviceId} className="service-item">
                      <strong>{service.name}</strong> <br />
                      Czas trwania: 50 minut <br />
                      Cena: {service.price} zł <br />
                      <button onClick={() => handleScheduleClick(service.serviceId)}>
                          Umów usługę
                      </button>
                  </li>
              ))}
          </ul>
      </div>
  );
}

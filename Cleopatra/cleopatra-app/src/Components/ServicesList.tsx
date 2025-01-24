import { useState, useEffect } from "react";
import { Service } from "../Models/Service";
import axios from "axios";
import '../Styles/ServicesListStyle.css';

export default function ServicesList() {

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="person-list">
       <h1>Usługi</h1>
       <ul>
           {services.map((service) => (
               <li key={service.serviceId} className="service-item">
                   <strong>{service.name}</strong>  <br></br>{service.description}
               </li>
           ))}
       </ul>
   </div>
);
}

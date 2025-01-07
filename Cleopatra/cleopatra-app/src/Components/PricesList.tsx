import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../Models/Service";
import { ServicesData } from "../Data/ServicesData";

export default function Prices() {
    const [services] = useState<Service[]>(ServicesData);
    const navigate = useNavigate();

    const handleScheduleClick = (serviceId: number) => {
        navigate(`/newappointment/${serviceId}`);
    };

    return (
        <div className="person-list">
            <h1>Cennik</h1>
            <ul>
                {services.map((service) => (
                    <li key={service.id} className="service-item">
                        <strong>{service.name}</strong> Cena: {service.price} <br />
                        <button onClick={() => handleScheduleClick(service.id)}>
                            Umów usługę
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

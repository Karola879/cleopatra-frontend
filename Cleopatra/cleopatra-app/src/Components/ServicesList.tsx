import { useState } from "react";
import { Service } from "../Models/Service";
import {ServicesData} from "../Data/ServicesData"

export default function ServicesList() {

    // stan komponentu - hook useState
    const [services] = useState<Service[]>(ServicesData);

    return (
         <div className="person-list">
            <h1>Usługi</h1>
            <ul>
                {services.map((service) => (
                    <li key={service.id} className="service-item">
                        <strong>{service.name}</strong>  <br></br>{service.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}
import { useState } from "react";
import { Service } from "../Models/Service";

export default function Prices() {

    // stan komponentu - hook useState
    const [services, setServices] = useState<Service[]>([
        {
            id: 1,
            name: 'aa',
            description: '1aa',
            price: 44,
            durations: 45,
        },
        {
            id: 2,
            name: 'ss',
            description: '1ss',
            price: 34,
            durations: 60,
        },
        {
            id: 3,
            name: 'dd',
            description: '1dd',
            price: 67,
            durations: 45,
        },
        {
            id: 4,
            name: 'ff',
            description: '1ff',
            price: 12,
            durations: 50,
        },
        {
            id: 5,
            name: 'gg',
            description: '1gg',
            price: 66,
            durations: 45,
        },
        {
            id: 6,
            name: 'hh',
            description: '1hh',
            price: 55,
            durations: 35,
        },
    ]);

    return (
         <div className="person-list">
            <h1>Cennik</h1>
            <ul>
                {services.map((service) => (
                    <li key={service.id} className="service-item">
                        <strong>{service.name}</strong> Cena:{service.price} <br></br>
                        <button>Umów usługę</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
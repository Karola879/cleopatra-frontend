import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/CustomerProfileStyle.css';

export default function CusrtomerProfile() {
    

    const navigate = useNavigate();

    const handleNavigateAppointments= () => {
        navigate("/future-appointments");
    };

    const handleNavigateHistory= () => {
        navigate("/history"); 
    };


    return (
        <div className='customer-profile'>
            <h1>Profil klienta</h1>
            <button onClick={handleNavigateAppointments} className="btn">
                Wizyty
            </button>
            <button onClick={handleNavigateHistory} className="btn">
                Historia
            </button>
        </div>
    )
}
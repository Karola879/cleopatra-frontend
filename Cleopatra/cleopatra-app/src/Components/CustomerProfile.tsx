import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CusrtomerProfile() {
    

    const navigate = useNavigate();

    const handleNavigateAppointments= () => {
        navigate("/future-appointments");
    };

    const handleNavigateHistory= () => {
        navigate("/history"); 
    };


    return (
        <div>
            <h1>Customer Profile</h1>
            <button onClick={handleNavigateAppointments} className="btn">
                Wizyty
            </button>
            <button onClick={handleNavigateHistory} className="btn">
                Historia
            </button>
        </div>
    )
}
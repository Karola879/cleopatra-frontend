import { useNavigate } from "react-router-dom";

export default function EmployeeProfile() {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/appointment-schedule"); // Ścieżka do komponentu AppointmentSchedule
    };

    return (
        <div>
            <h1>Employee Profile</h1>
            <button onClick={handleNavigate} className="btn">
                Harmonogram
            </button>
        </div>
    );
}

import { useNavigate } from "react-router-dom";

export default function EmployeeProfile() {
    const navigate = useNavigate();

    const handleNavigateAppointments= () => {
        navigate("/appointment-schedule"); 
    };

    const handleNavigateProducts= () => {
        navigate("/products"); 
    };

    const handleNavigateEmployeeSchedule= () => {
        navigate("/employee-schedule");
    };
    return (
        <div>
            <h1>Employee Profile</h1>
            <button onClick={handleNavigateAppointments} className="btn">
                Wizyty
            </button>
            <button onClick={handleNavigateProducts} className="btn">
                Materiały
            </button>
            <button onClick={handleNavigateEmployeeSchedule} className="btn">
                Harmonogram
            </button>
        </div>
    );
}

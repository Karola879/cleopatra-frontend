import { useNavigate } from "react-router-dom";
import '../Styles/EmployeeProfileStyle.css';

export default function EmployeeProfile() {
    const navigate = useNavigate();

    const handleNavigateAppointments = () => {
        navigate("/appointment-schedule");
    };

    const handleNavigateProducts = () => {
        navigate("/products-management");
    };

    const handleNavigateEmployeeSchedule = () => {
        navigate("/employee-schedule");
    };
    const handleNavigateServices = () => {
        navigate("/services-management");
    };

    return (
        <div className='employee-profile'>
            <h1>Profil Pracownika</h1>
            <div className="profile-buttons">
                <button onClick={handleNavigateAppointments} className="ebtn">
                    Wizyty
                </button>
                <button onClick={handleNavigateProducts} className="ebtn">
                    Produkty
                </button>
                <button onClick={handleNavigateEmployeeSchedule} className="ebtn">
                    Harmonogram
                </button>
                <button onClick={handleNavigateServices} className="ebtn">
                    Usługi
                </button>
            </div>
        </div>
    );
}

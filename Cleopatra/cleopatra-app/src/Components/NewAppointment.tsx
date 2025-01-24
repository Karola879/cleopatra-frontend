import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { EmployeeData } from "../Data/EmployeeData";
import { ScheduleData } from "../Data/ScheduleData";

export default function NewAppointment() {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<{ serviceId: number; name: string; price: number } | null>(null);

    // Stałe ID klienta
    const customerId = 1;

    const token = localStorage.getItem('token');

    // Hooki
    const [employeeId, setEmployeeId] = useState<number>(0);
    const [employeeName, setEmployeeName] = useState<string>('');
    const [appointmentDateTime, setAppointmentDateTime] = useState<string>('');
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [timesByDate, setTimesByDate] = useState<Record<string, string[]>>({});
    const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Pobierz dane usługi na podstawie ID
    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.get(`http://localhost:5227/api/Services/${serviceId}`);
                setService(response.data);
            } catch (error) {
                console.error("Error fetching service:", error);
                setErrorMessage("Nie udało się pobrać danych usługi.");
            }
        };

        fetchService();
    }, [serviceId]);

    // Obsługa zmian pracownika i harmonogramu
    useEffect(() => {
        if (employeeId) {
            const schedule = ScheduleData.filter((s) => s.employeeId === employeeId);
            const dates: string[] = [];
            const timesByDate: Record<string, string[]> = {};

            schedule.forEach((s) => {
                const start = s.startDateTime;
                const end = s.endDateTime;

                let currentTime = new Date(start.getTime());
                while (currentTime < end) {
                    const availableDate = currentTime.toLocaleDateString('sv-SE');
                    if (availableDate >= tomorrow.toLocaleDateString('sv-SE')) {
                        if (!dates.includes(availableDate)) {
                            dates.push(availableDate);
                        }

                        const time = currentTime.toLocaleString('sv-SE').slice(11, 16);
                        if (!timesByDate[availableDate]) {
                            timesByDate[availableDate] = [];
                        }
                        timesByDate[availableDate].push(time);
                    }
                    currentTime.setMinutes(currentTime.getMinutes() + 60);
                }
            });

            setAvailableDates(dates);
            setTimesByDate(timesByDate);
            if (dates.length > 0) {
                setSelectedDate(dates[0]);
                setAvailableTimes(timesByDate[dates[0]]);
            }
        }
    }, [employeeId]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!service) {
            setErrorMessage("Nie wybrano usługi.");
            return;
        }

        const newAppointment = {
            customerId,
            employeeId,
            appointmentDateTime,
            duration: 50, // Przyjęty czas trwania wizyty
            serviceType: service.name,
        };

        try {
            const response = await axios.post("http://localhost:5227/api/Appointments/CreateAppointment", newAppointment, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Appointment created:", response.data);
            setAppointmentConfirmed(true);
        } catch (error) {
            console.error("Error creating appointment:", error);
            setErrorMessage("Nie udało się utworzyć wizyty. Spróbuj ponownie.");
        }
    };

    const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEmployeeId = Number(e.target.value);
        const selectedEmployee = EmployeeData.find(employee => employee.employeeId === selectedEmployeeId);
        if (selectedEmployee) {
            setEmployeeId(selectedEmployeeId);
            setEmployeeName(selectedEmployee.name);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
        setAvailableTimes(timesByDate[selectedDate] || []);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAppointmentDateTime(e.target.value);
    };

    if (!service) {
        return <div>Ładowanie danych usługi...</div>;
    }

    return (
        <div className="appointment-form-container">
            {appointmentConfirmed ? (
                <div className="confirmation-message">
                    <h2>Wizyta umówiona!</h2>
                    <p>Wizyta została pomyślnie dodana.</p>
                    <button onClick={() => navigate("/prices")}>Powrót do cennika</button>
                </div>
            ) : (
                <form onSubmit={handleFormSubmit} className="appointment-form">
                    <h2>Umów wizytę</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div>
                        <label>Klient ID:</label>
                        <input type="number" value={customerId} disabled />
                    </div>
                    <div>
                        <label>Wybierz pracownika:</label>
                        <select value={employeeId} onChange={handleEmployeeChange} required>
                            <option value="">-- Wybierz pracownika --</option>
                            {EmployeeData.map((employee) => (
                                <option key={employee.employeeId} value={employee.employeeId}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Wybierz datę wizyty:</label>
                        <select value={selectedDate} onChange={handleDateChange} required>
                            <option value="">-- Wybierz datę --</option>
                            {availableDates.map((date, index) => (
                                <option key={index} value={date}>
                                    {date}
                                </option>
                            ))}
                        </select>
                    </div>
                    {selectedDate && (
                        <div>
                            <label>Wybierz godzinę:</label>
                            <select value={appointmentDateTime} onChange={handleTimeChange} required>
                                <option value="">-- Wybierz godzinę --</option>
                                {availableTimes.map((time, index) => (
                                    <option key={index} value={`${selectedDate}T${time}`}>
                                        {time}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    <div>
                        <label>Nazwa usługi:</label>
                        <input type="text" value={service.name} disabled />
                    </div>
                    <div>
                        <label>Cena:</label>
                        <input type="text" value={service.price} disabled />
                    </div>
                    <div>
                        <button type="submit">Umów</button>
                        <button type="button" onClick={() => navigate("/prices")}>
                            Anuluj
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

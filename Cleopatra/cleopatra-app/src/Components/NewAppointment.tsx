import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Appointment } from "../Models/Appointment";
import { ServicesData } from "../Data/ServicesData";
import { EmployeeData } from "../Data/EmployeeData";
import { ScheduleData } from "../Data/ScheduleData"; // Importujemy dane harmonogramów

export default function NewAppointment() {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();

    // Znajdź usługę na podstawie ID
    const service = ServicesData.find((s) => s.serviceId === Number(serviceId));

    // Hooki
    const [customerId, setCustomerId] = useState<number>(0);
    const [employeeId, setEmployeeId] = useState<number>(0);
    const [employeeName, setEmployeeName] = useState<string>('');
    const [appointmentDateTime, setAppointmentDateTime] = useState<string>("");
    const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean>(false);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]); // Dostępne godziny pracy pracownika
    const [selectedDate, setSelectedDate] = useState<string>(''); // Wybrana data
    const [availableDates, setAvailableDates] = useState<string[]>([]); // Dostępne daty
    const [timesByDate, setTimesByDate] = useState<Record<string, string[]>>({});



    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Ustawiamy datę na następny dzień

    useEffect(() => {
        if (employeeId) {
            const schedule = ScheduleData.filter((s) => s.employeeId === employeeId);
            const dates: string[] = [];
            const timesByDate: Record<string, string[]> = {};
    
            schedule.forEach((s) => {
                const start = s.startDateTime;
                const end = s.endDateTime;
                const breakTime = s.breakTimes;
    
                let currentTime = new Date(start.getTime());
                while (currentTime < end) {
                    const availableDate = currentTime.toLocaleDateString('sv-SE'); // Tylko data
                    if (availableDate >= tomorrow.toLocaleDateString('sv-SE')) { // Tylko daty od jutra
                        if (!dates.includes(availableDate)) {
                            dates.push(availableDate);
                        }
    
                        const time = currentTime.toLocaleString('sv-SE').slice(11, 16); // Godzina
                        if (!timesByDate[availableDate]) {
                            timesByDate[availableDate] = [];
                        }
                        timesByDate[availableDate].push(time);
                    }
                    currentTime.setMinutes(currentTime.getMinutes() + 60); // Co godzinę
                }
            });
    
            setAvailableDates(dates); // Ustawiamy dostępne daty
            setTimesByDate(timesByDate); // Ustawiamy dostępne godziny na podstawie dat
            if (dates.length > 0) {
                setSelectedDate(dates[0]); // Domyślnie wybieramy pierwszą datę
                setAvailableTimes(timesByDate[dates[0]]); // Ustawiamy godziny dla tej daty
            }
        }
    }, [employeeId]);
    
    
    if (!service) {
        return <div>Nie znaleziono usługi o podanym ID.</div>;
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAppointment: Appointment = {
            appointmentId: 1, // Na razie stałe ID
            customerId,
            employeeId,
            serviceId: service.serviceId,
            appointmentDateTime: new Date(appointmentDateTime),
            duration: 0,
            status: "do potwierdzenia",
            notes: "puste",
        };
        console.log("New Appointment:", newAppointment);

        // Po zapisaniu wizyty, ustawiamy status jako umówioną (do potwierdzenia)
        setAppointmentConfirmed(true);
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
        setAvailableTimes(timesByDate[selectedDate] || []); // Ustawiamy dostępne godziny dla wybranej daty
    };    
    
    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAppointmentDateTime(e.target.value);
    };
    
    return (
        <div className="appointment-form-container">
            {appointmentConfirmed ? (
                <div className="confirmation-message">
                    <h2>Wizyta umówiona!</h2>
                    <p>Wizyta oczekuje na zatwierdzenie. Po jej zatwierdzeniu otrzymasz wiadomość e-mail.</p>
                    <button onClick={() => navigate("/prices")}>Powrót do cennika</button>
                </div>
            ) : (
                <form onSubmit={handleFormSubmit} className="appointment-form">
                    <h2>Umów wizytę</h2>
                    <div>
                        <label>ID Klienta:</label>
                        <input
                            type="number"
                            value={customerId}
                            onChange={(e) => setCustomerId(Number(e.target.value))}
                            required
                        />
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
                            <select
                                value={appointmentDateTime}
                                onChange={handleTimeChange}
                                required
                            >
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

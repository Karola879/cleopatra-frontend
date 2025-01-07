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
    const service = ServicesData.find((s) => s.id === Number(serviceId));

    // Hooki
    const [customerId, setCustomerId] = useState<number>(0);
    const [employeeId, setEmployeeId] = useState<number>(0);
    const [employeeName, setEmployeeName] = useState<string>('');
    const [appointmentDateTime, setAppointmentDateTime] = useState<string>("");
    const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean>(false);
    const [availableTimes, setAvailableTimes] = useState<string[]>([]); // Dostępne godziny pracy pracownika

    useEffect(() => {
        if (employeeId) {
            // Filtrujemy dostępne godziny na podstawie harmonogramu pracownika
            const schedule = ScheduleData.filter((s) => s.employeeId === employeeId);
            const times: string[] = [];

            schedule.forEach((s) => {
                const start = s.startDateTime;
                const end = s.endDateTime;
                const breakTime = s.breakTimes; // Czas przerwy w minutach

                let currentTime = new Date(start.getTime());
                while (currentTime < end) {
                    // Sprawdzamy dostępność co godzinę z uwzględnieniem przerw
                    let availableTime = new Date(currentTime.getTime());
                    times.push(availableTime.toLocaleString('sv-SE').slice(0, 16)); // Format ISO bez strefy czasowej

                    // Przesuwamy czas o godzinę
                    currentTime.setHours(currentTime.getHours() + 1);
                }
            });
            setAvailableTimes(times); // Ustawiamy dostępne godziny w stanie
        }
    }, [employeeId]);

    if (!service) {
        return <div>Nie znaleziono usługi o podanym ID.</div>;
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newAppointment: Appointment = {
            id: 1, // Na razie stałe ID
            customerId,
            employeeId,
            serviceId: service.id.toString(),
            appointmentDateTime: new Date(appointmentDateTime),
            durations: 0,
            status: "do potwierdzenia",
            notes: "puste",
        };
        console.log("New Appointment:", newAppointment);

        // Po zapisaniu wizyty, ustawiamy status jako umówioną (do potwierdzenia)
        setAppointmentConfirmed(true);
    };

    const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEmployeeId = Number(e.target.value);
        const selectedEmployee = EmployeeData.find(employee => employee.id === selectedEmployeeId);
        if (selectedEmployee) {
            setEmployeeId(selectedEmployeeId);
            setEmployeeName(selectedEmployee.name);
        }
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
                                <option key={employee.id} value={employee.id}>
                                    {employee.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Data i godzina wizyty:</label>
                        <input
                            type="datetime-local"
                            value={appointmentDateTime}
                            onChange={(e) => setAppointmentDateTime(e.target.value)}
                            required
                            min={availableTimes[0]} // Min. dostępna godzina
                            max={availableTimes[availableTimes.length - 1]} // Max. dostępna godzina
                            step="900" // Co 15 minut (w minutach)
                            list="available-times" // Użyj daty, by wybierać z dostępnych godzin
                        />
                        <datalist id="available-times">
                            {availableTimes.map((time, index) => (
                                <option key={index} value={time} />
                            ))}
                        </datalist>
                    </div>
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

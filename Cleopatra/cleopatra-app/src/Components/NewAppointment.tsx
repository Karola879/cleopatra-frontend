import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Schedule } from "../Models/Schedule";
import '../Styles/NewAppointmentStyle.css';

export default function NewAppointment() {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const [service, setService] = useState<{ serviceId: number; name: string; price: number } | null>(null);

    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const [employees, setEmployees] = useState<{ employeeId: number; name: string }[]>([]);
    const [employeeId, setEmployeeId] = useState<number>(0);
    const [employeeName, setEmployeeName] = useState<string>('');
    const [appointmentDateTime, setAppointmentDateTime] = useState<string>('');
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [timesByDate, setTimesByDate] = useState<Record<string, string[]>>({});
    const [appointments, setAppointments] = useState<any[]>([]); // Wizyty pracownika
    const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() +1);

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

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get("http://localhost:5227/api/Employees", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const employeeData = response.data.map((employee: any) => ({
                    employeeId: employee.EmployeeId,
                    name: employee.Name,
                }));
                setEmployees(employeeData);
            } catch (error) {
                console.error("Error fetching employees:", error);
                setErrorMessage("Nie udało się pobrać danych pracowników.");
            }
        };
        fetchEmployees();
    }, [token]);

    useEffect(() => {
        const fetchScheduleAndAppointments = async () => {
            try {
                const [scheduleResponse, appointmentsResponse] = await Promise.all([
                    axios.get("http://localhost:5227/api/Schedule", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get(`http://localhost:5227/api/Appointments/GetAppointments/${employeeId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
    
                const scheduleData: Schedule[] = scheduleResponse.data.filter(
                    (schedule: Schedule) => schedule.EmployeeId === employeeId
                );
    
                const employeeAppointments = appointmentsResponse.data.map((appointment: any) => ({
                    dateTime: new Date(appointment.AppointmentDateTime),
                }));
                setAppointments(employeeAppointments);
    
                const dates: string[] = [];
                const timesByDate: Record<string, string[]> = {};
    
                scheduleData.forEach((s) => {
                    const start = new Date(s.StartDateTime);
                    const end = new Date(s.EndDateTime);
    
                    let currentTime = new Date(start.getTime());
                    while (currentTime < end) {
                        const availableDate = currentTime.toLocaleDateString('sv-SE');
                        if (availableDate >= tomorrow.toLocaleDateString('sv-SE')) {
                            if (!dates.includes(availableDate)) {
                                dates.push(availableDate);
                            }
    
                            const time = currentTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
                            if (!timesByDate[availableDate]) {
                                timesByDate[availableDate] = [];
                            }
                            timesByDate[availableDate].push(time);
                        }
                        currentTime.setMinutes(currentTime.getMinutes() + 60);
                    }
                });
    
                // Posortuj daty w porządku rosnącym
                const sortedDates = dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
                setAvailableDates(sortedDates);
                setTimesByDate(timesByDate);
    
                if (sortedDates.length > 0) {
                    setSelectedDate(sortedDates[0]);
                    setAvailableTimes(timesByDate[sortedDates[0]]);
                }
            } catch (error) {
                console.error("Error fetching schedule or appointments:", error);
                setErrorMessage("Nie udało się pobrać danych harmonogramu lub wizyt.");
            }
        };
        fetchScheduleAndAppointments();
    }, [employeeId, token]);

    useEffect(() => {
        if (selectedDate && timesByDate[selectedDate]) {
            const bookedTimes = appointments
                .filter((appointment) => appointment.dateTime.toLocaleDateString('sv-SE') === selectedDate)
                .map((appointment) => appointment.dateTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }));
            const filteredTimes = timesByDate[selectedDate].filter((time) => !bookedTimes.includes(time));
            setAvailableTimes(filteredTimes);
        }
    }, [selectedDate, appointments, timesByDate]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!service) {
            setErrorMessage("Nie wybrano usługi.");
            return;
        }

        const newAppointment = {
            customerId: userId,
            employeeId,
            appointmentDateTime,
            serviceId: service.serviceId,
        };

        try {
            const response = await axios.post("http://localhost:5227/api/Appointments/CreateAppointment", newAppointment, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppointmentConfirmed(true);
        } catch (error) {
            console.error("Error creating appointment:", error);
            setErrorMessage("Nie udało się utworzyć wizyty. Spróbuj ponownie.");
        }
    };

    const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedEmployeeId = Number(e.target.value);
        const selectedEmployee = employees.find(employee => employee.employeeId === selectedEmployeeId);
        if (selectedEmployee) {
            setEmployeeId(selectedEmployeeId);
            setEmployeeName(selectedEmployee.name);
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
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
                    <button onClick={() => navigate("/prices")}>Powrót do cennika</button>
                </div>
            ) : (
                <form onSubmit={handleFormSubmit} className="appointment-form">
                    <h2>Umów wizytę</h2>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="form-group">
                        <label>Wybierz pracownika:</label>
                        <select value={employeeId} onChange={handleEmployeeChange} required className="form-select">
                            <option value="">-- Wybierz pracownika --</option>
                            {employees.map((employee) => (
                                <option key={employee.employeeId} value={employee.employeeId}>{employee.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Wybierz datę wizyty:</label>
                        <select value={selectedDate} onChange={handleDateChange} required className="form-select">
                            <option value="">-- Wybierz datę --</option>
                            {availableDates.map((date, index) => (
                                <option key={index} value={date}>{date}</option>
                            ))}
                        </select>
                        {selectedDate && (
                            <>
                                <label>Wybierz godzinę:</label>
                                <select value={appointmentDateTime} onChange={handleTimeChange} required className="form-select">
                                    <option value="">-- Wybierz godzinę --</option>
                                    {availableTimes.map((time, index) => (
                                        <option key={index} value={`${selectedDate}T${time}`}>{time}</option>
                                    ))}
                                </select>
                            </>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Nazwa usługi:</label>
                        <input type="text" value={service.name} disabled className="form-input" />
                    </div>
                    <div className="form-group">
                        <label>Cena:</label>
                        <input type="text" value={service.price} disabled className="form-input" />
                    </div>
                    <button type="submit" className="submit-button">Umów</button>
                </form>
            )}
        </div>
    );
}

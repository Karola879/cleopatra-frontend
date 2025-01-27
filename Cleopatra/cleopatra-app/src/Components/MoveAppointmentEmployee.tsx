import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Schedule } from "../Models/Schedule";
import { Appointment } from "../Models/Appointment";
import '../Styles/NewAppointmentEmployeeStyle.css';

const MoveAppointmentEmployee = () => {
    const location = useLocation();
    const { appointmentId } = location.state || {};
    const [newDateTime, setNewDateTime] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const navigate = useNavigate();
    const [appointmentDateTime, setAppointmentDateTime] = useState<string>('');
    const [availableTimes, setAvailableTimes] = useState<string[]>([]);
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [timesByDate, setTimesByDate] = useState<Record<string, string[]>>({});
    const [appointments, setAppointments] = useState<any[]>([]); // Wizyty pracownika
    const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);

    const token = localStorage.getItem("token");
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const userId = localStorage.getItem("userId");
    const employeeId = userId ? parseInt(userId, 10) : 0;


    useEffect(() => {
        if (employeeId) {
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

                    setAvailableDates(dates);
                    setTimesByDate(timesByDate);
                    if (dates.length > 0) {
                        setSelectedDate(dates[0]);
                        setAvailableTimes(timesByDate[dates[0]]);
                    }
                } catch (error) {
                    console.error("Error fetching schedule or appointments:", error);
                    setErrorMessage("Nie udało się pobrać danych harmonogramu lub wizyt.");
                }
            };
            fetchScheduleAndAppointments();
        }
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

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAppointmentDateTime(e.target.value);
    };


    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const response = await axios.put(`http://localhost:5227/api/Appointments/MoveAppointment/${appointmentId}`,
            {
            NewDateTime: appointmentDateTime,  // Przesyłamy datę w formacie UTC
            },
            {
            headers: {
                Authorization: `Bearer ${token}`,
                },
            }
            );

            if (response.status === 200) {
                alert("Wizyta została pomyślnie przeniesiona.");
                navigate("/appointment-schedule");  // Przekierowanie na stronę harmonogramu wizyt
            }
        } catch (error) {
            console.error("Błąd podczas przenoszenia wizyty:", error);
            if (axios.isAxiosError(error) && error.response) {
                const { data, status } = error.response;
                setErrorMessage(`Błąd serwera (${status}): ${data?.message || "Spróbuj ponownie."}`);
        } else {
            setErrorMessage("Wystąpił błąd. Spróbuj ponownie.");
        }
        }
    };

  return (
    <div>
      <form onSubmit={handleFormSubmit} className="appointment-form">
            <h2>Przełóż wizytę</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <div>
                <label>Wybierz datę wizyty:</label>
                <select value={selectedDate} onChange={handleDateChange} required>
                    <option value="">-- Wybierz datę --</option>
                    {availableDates.map((date, index) => (
                        <option key={index} value={date}>{date}</option>
                    ))}
                </select>
                {selectedDate && (
                    <>
                    <br></br>
                    <label>Wybierz godzinę:</label>
                        <select value={appointmentDateTime} onChange={handleTimeChange} required>
                            <option value="">-- Wybierz godzinę --</option>
                            {availableTimes.map((time, index) => (
                                <option key={index} value={`${selectedDate}T${time}`}>{time}</option>
                            ))}
                        </select>
                        </>
                )}
            </div>
            <button type="submit">Przełóż</button>
        </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default MoveAppointmentEmployee;

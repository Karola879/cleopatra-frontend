import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Schedule } from "../Models/Schedule";
import { Appointment } from "../Models/Appointment";
import '../Styles/AppointmentCustomerStyle.css';
import '../Styles/MoveAppointmentCustomerStyle.css';

const MoveAppointmentCustomer = () => {
  const location = useLocation();
  const { appointmentId } = location.state || {};
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const customerId = userId ? parseInt(userId, 10) : 0;

  const [appointmentDateTime, setAppointmentDateTime] = useState<string>("");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableDates, setAvailableDates] = useState<string[]>([]);
  const [timesByDate, setTimesByDate] = useState<Record<string, string[]>>({});
  const [employeeAppointments, setEmployeeAppointments] = useState<Appointment[]>([]);
  const [employeeId, setEmployeeId] = useState<number | null>(null);
  const [currentAppointment, setCurrentAppointment] = useState<Appointment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  useEffect(() => {
    const fetchAppointmentsAndSchedule = async () => {
      try {
        const [scheduleResponse, appointmentsResponse] = await Promise.all([
          axios.get("http://localhost:5227/api/Schedule", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:5227/api/Appointments/history/${customerId}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const scheduleData: Schedule[] = scheduleResponse.data;
        const appointmentsData: Appointment[] = appointmentsResponse.data.FutureAppointments;

        // Find the current appointment
        const appointment = appointmentsData.find(
          (appt) => appt.AppointmentId === appointmentId
        );

        if (appointment) {
          setCurrentAppointment(appointment);
          setEmployeeId(appointment.EmployeeId);
        }

        const dates: string[] = [];
        const timesByDate: Record<string, string[]> = {};

        scheduleData
          .filter((s) => s.EmployeeId === appointment?.EmployeeId) // Only consider this employee's schedule
          .forEach((s) => {
            const start = new Date(s.StartDateTime);
            const end = new Date(s.EndDateTime);

            let currentTime = new Date(start.getTime());
            while (currentTime < end) {
              const availableDate = currentTime.toLocaleDateString("sv-SE");
              if (availableDate >= tomorrow.toLocaleDateString("sv-SE")) {
                if (!dates.includes(availableDate)) {
                  dates.push(availableDate);
                }

                const time = currentTime.toLocaleTimeString("sv-SE", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
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
        }
      } catch (error) {
        console.error("Error fetching schedule or appointments:", error);
        setErrorMessage("Nie udało się pobrać danych harmonogramu lub wizyt.");
      }
    };

    if (customerId) {
      fetchAppointmentsAndSchedule();
    }
  }, [customerId, token, appointmentId]);

  useEffect(() => {
    const fetchEmployeeAppointments = async () => {
      if (employeeId) {
        try {
          const response = await axios.get(
            `http://localhost:5227/api/Appointments/GetAppointments/${employeeId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setEmployeeAppointments(response.data);
        } catch (error) {
          console.error("Error fetching employee appointments:", error);
        }
      }
    };

    fetchEmployeeAppointments();
  }, [employeeId, token]);

  useEffect(() => {
    if (selectedDate && timesByDate[selectedDate] && employeeAppointments.length > 0) {
      const employeeBookedTimes = employeeAppointments
        .filter(
          (appointment) =>
            new Date(appointment.AppointmentDateTime).toLocaleDateString("sv-SE") === selectedDate
        )
        .map((appointment) =>
          new Date(appointment.AppointmentDateTime).toLocaleTimeString("sv-SE", {
            hour: "2-digit",
            minute: "2-digit",
          })
        );

      const filteredTimes = timesByDate[selectedDate].filter(
        (time) => !employeeBookedTimes.includes(time)
      );

      setAvailableTimes(filteredTimes);
    } else if (selectedDate) {
      setAvailableTimes(timesByDate[selectedDate] || []);
    }
  }, [selectedDate, timesByDate, employeeAppointments]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5227/api/Appointments/MoveAppointment/${appointmentId}`,
        {
          NewDateTime: appointmentDateTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Wizyta została pomyślnie przeniesiona.");
        navigate("/future-appointments");
      }
    } catch (error) {
      console.error("Błąd podczas przenoszenia wizyty:", error);
      setErrorMessage("Wystąpił błąd. Spróbuj ponownie.");
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAppointmentDateTime(e.target.value);
  };

  return (
    <div className="appointment-form-container">
      <form onSubmit={handleFormSubmit} className="appointment-form">
        <h2>Przełóż wizytę</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {currentAppointment && (
          <div className="current-appointment">
            <p>
              Obecna data wizyty:{" "}
              {new Date(currentAppointment.AppointmentDateTime).toLocaleDateString("sv-SE")}
            </p>
            <p>
              Obecna godzina wizyty:{" "}
              {new Date(currentAppointment.AppointmentDateTime).toLocaleTimeString("sv-SE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        )}
        <div>
          <label className="form-label">Wybierz datę wizyty:</label>
          <select className="form-select" value={selectedDate} onChange={handleDateChange} required>
            <option value="">-- Wybierz datę --</option>
            {availableDates.map((date, index) => (
              <option key={index} value={date}>
                {date}
              </option>
            ))}
          </select>
          {selectedDate && (
            <>
              <br />
              <label className="form-label">Wybierz godzinę:</label>
              <select className="form-select" value={appointmentDateTime} onChange={handleTimeChange} required>
                <option value="">-- Wybierz godzinę --</option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={`${selectedDate}T${time}`}>
                    {time}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>
        <button type="submit" className="submit-button">Zmień wizytę</button>
      </form>
    </div>
  );
};

export default MoveAppointmentCustomer;

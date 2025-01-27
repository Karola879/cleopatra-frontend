import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importujemy hook nawigacji
import { Schedule } from "../Models/Schedule"; // Zaimportuj model Schedule
import '../Styles/EmployeeScheduleStyle.css'; // Dodajemy stylowanie CSS

const EmployeeSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const userId = localStorage.getItem("userId");
  const employeeId = userId ? parseInt(userId, 10) : 0;
  const token = localStorage.getItem("token");

  const navigate = useNavigate(); // Inicjalizujemy hook nawigacji

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleNewSchedule = () => {
    navigate("/new-schedule");
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      if (employeeId) {
        try {
          const response = await axios.get(
            `http://localhost:5227/api/Schedule/${employeeId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSchedule(response.data);
        } catch (error) {
          console.error("Błąd podczas pobierania grafiku:", error);
          setErrorMessage("Nie udało się pobrać grafiku. Spróbuj ponownie.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSchedule();
  }, [employeeId]);

  if (loading) return <div className="loading">Ładowanie grafiku...</div>;
  if (errorMessage) return <div className="error-message">{errorMessage}</div>;
  if (schedule.length === 0) return <div className="no-schedule">Brak zapisanych godzin pracy.</div>;

  const filteredSchedule = selectedDate
    ? schedule.filter(
        (item) =>
          new Date(item.StartDateTime).toLocaleDateString("pl-PL") ===
          new Date(selectedDate).toLocaleDateString("pl-PL")
      )
    : [];

  return (
    <div className="employee-schedule">
      <h2 className="schedule-title">Grafik Pracownika</h2>

      <div className="date-picker">
        <label htmlFor="date-picker">Wybierz datę: </label>
        <input
          type="date"
          id="date-picker"
          value={selectedDate || ""}
          onChange={handleDateChange}
          className="date-input"
        />
        <button onClick={handleNewSchedule} className="new-schedule-button">
          Nowy harmonogram
        </button>
      </div>

      {selectedDate && (
        <h3 className="selected-date-title">
          Grafik na dzień: {new Date(selectedDate).toLocaleDateString("pl-PL")}
        </h3>
      )}

      {selectedDate && filteredSchedule.length === 0 && (
        <p className="no-hours">Brak zapisanych godzin pracy na ten dzień.</p>
      )}

      {selectedDate && filteredSchedule.length > 0 && (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Godzina rozpoczęcia</th>
              <th>Godzina zakończenia</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedule.map((item) => (
              <tr key={item.ScheduleId}>
                <td>{new Date(item.StartDateTime).toLocaleDateString("pl-PL")}</td>
                <td>{new Date(item.StartDateTime).toLocaleTimeString("pl-PL")}</td>
                <td>{new Date(item.EndDateTime).toLocaleTimeString("pl-PL")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeSchedule;

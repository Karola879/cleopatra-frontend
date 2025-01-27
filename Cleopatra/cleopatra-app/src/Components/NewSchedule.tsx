import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Styles/NewScheduleStyle.css'; // Import stylów

const NewSchedule = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [startHour, setStartHour] = useState<string>("10");
  const [endDate, setEndDate] = useState<string>(""); 
  const [endHour, setEndHour] = useState<string>("10");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [existingSchedules, setExistingSchedules] = useState<any[]>([]);

  const userId = localStorage.getItem("userId");
  const employeeId = userId ? parseInt(userId, 10) : 0;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExistingSchedules = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5227/api/Schedule/${employeeId}`
        );
        setExistingSchedules(response.data);
      } catch (error) {
        console.error("Błąd podczas pobierania harmonogramów:", error);
        setErrorMessage("Nie udało się pobrać harmonogramów. Spróbuj ponownie.");
      }
    };

    if (employeeId) {
      fetchExistingSchedules();
    }
  }, [employeeId]);

  const isDateTaken = (date: string): boolean => {
    return existingSchedules.some((schedule) => {
      const start = new Date(schedule.StartDateTime);
      const end = new Date(schedule.EndDateTime);
      const selectedStart = new Date(date);

      return selectedStart >= start && selectedStart < end;
    });
  };

  const getTomorrowDate = (): string => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isSunday = (date: string): boolean => {
    const selectedDate = new Date(date);
    return selectedDate.getDay() === 0;
  };

  const getMinDate = (): string => {
    const tomorrowDate = getTomorrowDate();
    const tomorrowDateObject = new Date(tomorrowDate);

    if (tomorrowDateObject.getDay() === 0) {
      tomorrowDateObject.setDate(tomorrowDateObject.getDate() + 1);
    }

    const year = tomorrowDateObject.getFullYear();
    const month = String(tomorrowDateObject.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrowDateObject.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getValidTimeRange = (date: string): { min: string, max: string } => {
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      return { min: "10:00", max: "20:00" };
    }
    if (dayOfWeek === 6) {
      return { min: "10:00", max: "15:00" };
    }
    return { min: "00:00", max: "00:00" };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!startDate || !endDate || !startHour || !endHour) {
      setErrorMessage("Wszystkie pola są wymagane.");
      return;
    }

    if (isSunday(startDate) || isSunday(endDate)) {
      setErrorMessage("Nie można wybrać niedzieli.");
      return;
    }

    const startDateTime = `${startDate}T${startHour}:00`;
    const endDateTime = `${endDate}T${endHour}:00`;
    if (isDateTaken(startDateTime)) {
      setErrorMessage("Wybrana data i godzina są już zajęte.");
      return;
    }

    const newSchedule = {
      employeeId,
      startTime: startDateTime,
      endTime: endDateTime,
    };

    try {
      const response = await axios.put(
        "http://localhost:5227/api/Schedule/AddSchedule",
        newSchedule,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Nowy harmonogram został pomyślnie zapisany.");
    } catch (error) {
      console.error("Błąd podczas zapisywania grafiku:", error);
      setErrorMessage("Nie udało się zapisać nowego grafiku. Spróbuj ponownie.");
    }
  };

  const generateHourOptions = (min: number, max: number, exclude?: number) => {
    const hours = [];
    for (let i = min; i <= max; i++) {
      if (i === exclude) continue; // Pomijamy godzinę, której nie chcemy
      const hour = String(i).padStart(2, "0");
      hours.push(hour);
    }
    return hours;
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);
    setEndDate(newStartDate); // Automatycznie ustawiamy datę zakończenia na datę rozpoczęcia
  };

  return (
    <div className="new-schedule">
      <h2>Nowy Harmonogram</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Data rozpoczęcia:</label>
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            min={getMinDate()}
          />
        </div>

        <div>
          <label>Godzina rozpoczęcia:</label>
          <select
            value={startHour}
            onChange={(e) => setStartHour(e.target.value)}
          >
            {generateHourOptions(10, 19).map((hour) => (
              <option key={hour} value={hour}>
                {hour}:00
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Data zakończenia:</label>
          <input
            type="date"
            value={endDate}
            disabled
            readOnly
          />
        </div>

        <div>
          <label>Godzina zakończenia:</label>
          <select
            value={endHour}
            onChange={(e) => setEndHour(e.target.value)}
          >
            {generateHourOptions(11, 20).map((hour) => (
              <option key={hour} value={hour}>
                {hour}:00
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Zapisz harmonogram</button>
      </form>
    </div>
  );
};

export default NewSchedule;

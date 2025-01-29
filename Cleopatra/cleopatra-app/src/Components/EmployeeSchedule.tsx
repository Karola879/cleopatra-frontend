import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Schedule } from "../Models/Schedule";
import "../Styles/EmployeeScheduleStyle.css";

const EmployeeSchedule = () => {
  const [schedule, setSchedule] = useState<Schedule[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [reportLoading, setReportLoading] = useState(false); // Dodanie stanu dla ładowania raportu
  const [employeeReportLoading, setEmployeeReportLoading] = useState(false); // Ładowanie raportu pracownika

  const userId = localStorage.getItem("userId");
  const employeeId = userId ? parseInt(userId, 10) : 0;
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleNewSchedule = () => {
    navigate("/new-schedule");
  };

  // Funkcja do pobierania raportu na podstawie daty
  const downloadReportByDate = async () => {
    if (!selectedDate) {
      setErrorMessage("Proszę wybrać datę, aby pobrać raport.");
      return;
    }

    try {
      setReportLoading(true);
      const response = await axios.get(
        `http://localhost:5227/api/reports/date/${selectedDate}`,
        {
          responseType: "arraybuffer", // Ważne dla pobierania pliku binarnego (PDF)
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Tworzymy obiekt URL dla pliku PDF
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Utworzenie linku do pobrania PDF
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `Schedule_Report_${selectedDate}.pdf`;
      link.click();

      // Zwolnienie URL po pobraniu
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Błąd podczas pobierania raportu:", error);
      setErrorMessage("Nie udało się pobrać raportu.");
    } finally {
      setReportLoading(false);
    }
  };

  // Funkcja do pobierania raportu dla pracownika
  const downloadEmployeeReport = async () => {
    if (!employeeId) {
      setErrorMessage("Nie znaleziono identyfikatora pracownika.");
      return;
    }

    try {
      setEmployeeReportLoading(true);
      const response = await axios.get(
        `http://localhost:5227/api/reports/employee/${employeeId}`,
        {
          responseType: "arraybuffer", // Ważne dla pobierania pliku binarnego (PDF)
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Tworzymy obiekt URL dla pliku PDF
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Utworzenie linku do pobrania PDF
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = `Employee_Schedule_${employeeId}.pdf`;
      link.click();

      // Zwolnienie URL po pobraniu
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Błąd podczas pobierania raportu:", error);
      setErrorMessage("Nie udało się pobrać raportu dla pracownika.");
    } finally {
      setEmployeeReportLoading(false);
    }
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
          setErrorMessage("Nie udało się pobrać grafiku.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSchedule();
  }, [employeeId]);

  if (loading) return <div className="loading">Ładowanie grafiku...</div>;

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
      </div>

      {errorMessage || schedule.length === 0 ? (
        <div className="no-schedule-container">
          <p className="no-schedule">Brak zapisanych godzin pracy.</p>
          <button onClick={handleNewSchedule} className="new-schedule-button">
            Nowy harmonogram
          </button>
        </div>
      ) : (
        <>
          <button onClick={handleNewSchedule} className="new-schedule-button">
            Nowy grafik
          </button>

          {/* Przycisk pobierania raportu dla konkretnego pracownika */}
          <button
            onClick={downloadEmployeeReport}
            disabled={employeeReportLoading}
            className="download-report-button"
          >
            {employeeReportLoading ? "Ładowanie raportu..." : "Pobierz raport pracownika"}
          </button>

          {/* Przycisk pobierania raportu na podstawie daty */}
          {selectedDate && (
            <button
              onClick={downloadReportByDate}
              disabled={reportLoading}
              className="download-report-button"
            >
              {reportLoading ? "Ładowanie raportu..." : "Pobierz raport dobowy"}
            </button>
          )}

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
        </>
      )}
    </div>
  );
};

export default EmployeeSchedule;

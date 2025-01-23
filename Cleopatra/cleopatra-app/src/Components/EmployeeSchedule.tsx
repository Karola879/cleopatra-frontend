import React, { useState } from "react";
import { AppointmentData } from "../Data/AppointmentData";
import { CustomerData } from "../Data/CustomerData";
import { ServicesData } from "../Data/ServicesData";

const EmployeeSchedule = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null); // Zmienna do przechowywania wybranej wizyty
  const employeeId = 1; // ID stałego pracownika (na razie na sztywno)

  // Funkcja do obsługi zmiany daty
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setSelectedAppointment(null); // Resetujemy wybraną wizytę po zmianie daty
  };

  // Funkcja filtrująca wizyty dla danego pracownika i wybranej daty
  const filteredAppointments = AppointmentData.filter((appointment) => {
    const appointmentDate = appointment.appointmentDateTime;

    // Konwertujemy datę wizyty na format 'YYYY-MM-DD'
    const appointmentDateStr = appointmentDate instanceof Date && !isNaN(appointmentDate.getTime())
      ? appointmentDate.toISOString().split("T")[0]  // format YYYY-MM-DD
      : null;

    return (
      appointment.employeeId === employeeId &&
      appointmentDateStr === selectedDate // Porównanie tylko dat
    );
  });

  // Sortowanie wizyt według godziny
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    const timeA = a.appointmentDateTime.getTime();
    const timeB = b.appointmentDateTime.getTime();
    return timeA - timeB; // Sortowanie po czasie rosnąco
  });

  // Funkcja do obsługi kliknięcia w wizytę
  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  // Funkcje do obsługi przycisków
  const handleReschedule = () => {
    alert("Przełożono wizytę: " + selectedAppointment.appointmentId);
    // Logika przełożenia wizyty
    // Na przykład zmiana daty wizyty
  };

  const handleCancel = () => {
    alert("Odwołano wizytę: " + selectedAppointment.appointmentId);
    // Logika odwołania wizyty
    // Na przykład zmiana statusu wizyty na 'odwołana'
  };

  const handleConfirm = () => {
    alert("Potwierdzono wizytę: " + selectedAppointment.appointmentId);
    // Logika potwierdzenia wizyty
    // Na przykład zmiana statusu wizyty na 'potwierdzona'
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Harmonogram wizyt</h1>

      {/* Wybór daty */}
      <div>
        <label htmlFor="date-picker">Wybierz datę: </label>
        <input
          type="date"
          id="date-picker"
          value={selectedDate || ""}
          onChange={handleDateChange}
        />
      </div>

      {/* Wyniki */}
      <div style={{ marginTop: "20px" }}>
        {selectedDate && (
          <h2>
            Wizyty na dzień: {new Date(selectedDate).toLocaleDateString("pl-PL")}
          </h2>
        )}
        {sortedAppointments.length > 0 ? (
          <ul>
            {sortedAppointments.map((appointment) => {
              const customer = CustomerData.find(
                (c) => c.customerId === appointment.customerId
              );
              const service = ServicesData.find(
                (s) => s.serviceId === appointment.serviceId
              );
              return (
                <li
                  key={appointment.appointmentId}
                  onClick={() => handleAppointmentClick(appointment)} // Obsługuje kliknięcie na wizytę
                  style={{
                    cursor: "pointer",
                    marginBottom: "10px",
                    padding: "10px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor:
                      selectedAppointment?.appointmentId === appointment.appointmentId
                        ? "#e0f7fa"
                        : "white", // Podświetlanie wybranej wizyty
                  }}
                >
                  <strong>Godzina:</strong>{" "}
                  {new Date(appointment.appointmentDateTime).toLocaleTimeString("pl-PL", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  <br />
                  <strong>Klient:</strong> {customer?.name}
                  <br />
                  <strong>Usługa:</strong> {service?.name}
                  <br />
                  <strong>Status:</strong> {appointment.status}
                  <br />
                  <strong>Notatki:</strong> {appointment.notes}
                </li>
              );
            })}
          </ul>
        ) : (
          <p>Brak wizyt na wybrany dzień.</p>
        )}
      </div>

      {/* Wyświetlenie przycisków po wybraniu wizyty */}
      {selectedAppointment && (
        <div style={{ marginTop: "20px" }}>
          <h3>Akcje na wizytę: {selectedAppointment.appointmentId}</h3>
          <button onClick={handleReschedule}>Przełóż</button>
          <button onClick={handleCancel}>Odwołaj</button>
          <button onClick={handleConfirm}>Potwierdź</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeSchedule;

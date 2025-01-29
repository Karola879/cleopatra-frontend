import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Service } from "../Models/Service";
import { Appointment } from "../Models/Appointment";
import { Employee } from "../Models/Employee";
import { useNavigate } from "react-router-dom";
import '../Styles/AppointmentCustomerStyle.css';

const FutureAppointments = () => {
  const [futureAppointments, setFutureAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const navigate = useNavigate(); // Hook nawigacji

  const userId = localStorage.getItem("userId");
  const customerId = userId ? parseInt(userId, 10) : 0;
  const token = localStorage.getItem("token");

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  const handleReschedule = () => {
    if (selectedAppointment) {
      navigate(`/move-appointment-customer`, {
        state: { appointmentId: selectedAppointment.AppointmentId },
      });
    }
  };

  const handleDelete = async () => {
    if (selectedAppointment) {
      try {
        const response = await axios.delete(
          `http://localhost:5227/api/Appointments/DeleteAppointment/${selectedAppointment.AppointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setFutureAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment.AppointmentId !== selectedAppointment.AppointmentId
            )
          );
          setSelectedAppointment(null);
          alert("Wizyta została pomyślnie usunięta.");
        }
      } catch (error) {
        console.error("Błąd podczas usuwania wizyty:", error);
        setErrorMessage("Nie udało się usunąć wizyty. Spróbuj ponownie.");
      }
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`http://localhost:5227/api/Appointments/history/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFutureAppointments(response.data.FutureAppointments);

        const employeesResponse = await axios.get("http://localhost:5227/api/Employees", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(employeesResponse.data);

        const servicesResponse = await axios.get("http://localhost:5227/api/Services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(servicesResponse.data);
      } catch (err) {
        console.error("Error fetching future appointments:", err);
        setErrorMessage("Nie udało się załadować przyszłych wizyt.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [customerId]);

  if (loading) return <div className="loading">Ładowanie...</div>;
  if (errorMessage) return <div className="error-message">Błąd: {errorMessage}</div>;
  if (futureAppointments.length === 0) return <div className="no-visits">Brak przyszłych wizyt.</div>;

  const getEmployeeName = (EmployeeId: number) => {
    const employee = employees.find((employee) => employee.EmployeeId === EmployeeId);
    return employee ? employee.Name : "Nieznany pracownik";
  };

  const getServiceName = (ServiceId: number) => {
    const service = services.find((service) => service.serviceId === ServiceId);
    return service ? service.name : "Nieznana usługa";
  };

  return (
    <div className="client-appointments">
      <h2 className="appointments-title">Przyszłe wizyty</h2>
      <ul className="appointments-list">
        {futureAppointments.map((appointment) => (
          <li
            key={appointment.AppointmentId}
            onClick={() => handleAppointmentClick(appointment)}
            className={`appointment-item ${
              selectedAppointment?.AppointmentId === appointment.AppointmentId ? "selected" : ""
            }`}
          >
            <strong>Data:</strong> {moment(appointment.AppointmentDateTime).format("YYYY-MM-DD HH:mm")}
            <br />
            <strong>Pracownik:</strong> {getEmployeeName(appointment.EmployeeId)}
            <br />
            <strong>Usługa:</strong> {getServiceName(appointment.ServiceId)}
          </li>
        ))}
      </ul>

      {selectedAppointment && moment(selectedAppointment.AppointmentDateTime).isAfter(moment()) && (
        <div className="action-buttons">
          <button onClick={handleReschedule} className="reschedule-button">Przełóż</button>
          <button onClick={handleDelete} className="delete-button">Odwołaj</button>
        </div>
      )}
    </div>
  );
};

export default FutureAppointments;

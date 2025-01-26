import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Service } from "../Models/Service";
import { Appointment } from "../Models/Appointment";
import { Employee } from "../Models/Employee";
import '../Styles/AppointmentCustomerStyle.css';

const FutureAppointments = () => {
    const [futureAppointments, setFutureAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [services, setServices] = useState<Service[]>([]);

    const userId = localStorage.getItem("userId");
    const customerId = userId ? parseInt(userId, 10) : 0;
    const token = localStorage.getItem("token");
    

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

  if (loading) return <div>Ładowanie...</div>;
  if (errorMessage) return <div>Błąd: {errorMessage}</div>;
  if (futureAppointments.length === 0) return <div className='no-visits'>Brak przyszłych wizyt.</div>;


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
      <h2>Przyszłe wizyty</h2>
      <ul>
        {futureAppointments.map((appointment) => (
            <li>
                <strong>Godzina:</strong>{" "}
                {moment(appointment.AppointmentDateTime).format("YYYY-MM-DD HH:mm")}
                <br />
                <strong>Pracownik:</strong> {getEmployeeName(appointment.EmployeeId)}
                <br />
                <strong>Usługa:</strong> {getServiceName(appointment.ServiceId)}
                <br />
                <strong>Status:</strong> {appointment.Status}
            </li>
        ))}
      </ul>
    </div>
  );
};

export default FutureAppointments;

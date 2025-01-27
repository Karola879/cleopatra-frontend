import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import nawigacji
import { Customer } from "../Models/Customer";
import { Service } from "../Models/Service";
import "../Styles/AppointmentScheduleStyle.css";
import { Appointment } from "../Models/Appointment";
import moment from "moment";

const AppointmentSchedule = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const token = localStorage.getItem("token");
  const employeeId = localStorage.getItem("userId");
  const navigate = useNavigate(); // Hook nawigacji

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
    setSelectedAppointment(null);
  };

  const handleAppointmentClick = (appointment: any) => {
    setSelectedAppointment(appointment);
  };

  const handleReschedule = () => {
    if (selectedAppointment) {
      navigate(`/move-appointment-employee`, {
        state: { appointmentId: selectedAppointment.AppointmentId },
      });
    }
  };

  const handleDelete = async () => {
    if (selectedAppointment) {
      try {
        const response = await axios.delete(
          `http://localhost:5227/api/Appointments/CancelAppointment/${selectedAppointment.AppointmentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Wizyta została pomyślnie odwołana.");
          setAppointments((prevAppointments) =>
            prevAppointments.filter(
              (appointment) => appointment.AppointmentId !== selectedAppointment.AppointmentId
            )
          );
          setSelectedAppointment(null); // Zresetuj zaznaczoną wizytę
        }
      } catch (error) {
        console.error("Błąd podczas usuwania wizyty:", error);
        if (axios.isAxiosError(error) && error.response) {
          const { data, status } = error.response;
          setErrorMessage(`Błąd serwera (${status}): ${data?.message || "Spróbuj ponownie."}`);
        } else {
          setErrorMessage("Wystąpił błąd. Spróbuj ponownie.");
        }
      }
    }
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsResponse = await axios.get(
          `http://localhost:5227/api/Appointments/GetAppointments/${employeeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const appointmentsWithDate = appointmentsResponse.data.map((appointment: any) => {
          if (appointment.AppointmentDateTime) {
            const correctedDateString = appointment.AppointmentDateTime.replace(" ", "T");
            const parsedDate = new Date(correctedDateString);

            return {
              ...appointment,
              AppointmentDateTime: parsedDate,
            };
          } else {
            return appointment;
          }
        });

        setAppointments(appointmentsWithDate);

        const customersResponse = await axios.get("http://localhost:5227/api/Customers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCustomers(customersResponse.data);

        const servicesResponse = await axios.get("http://localhost:5227/api/Services", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(servicesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (axios.isAxiosError(error) && error.response) {
          const { data, status } = error.response;
          const errorDetails = data?.message || JSON.stringify(data);
          setErrorMessage(`Błąd serwera (${status}): ${errorDetails}`);
        } else {
          setErrorMessage("Nie udało się pobrać danych. Spróbuj ponownie.");
        }
      }
    };

    fetchAppointments();
  }, []);

  const getCustomerName = (CustomerId: number) => {
    const customer = customers.find((customer) => customer.CustomerId === CustomerId);
    return customer ? customer.Name : "Nieznany klient";
  };

  const getServiceName = (ServiceId: number) => {
    const service = services.find((service) => service.serviceId === ServiceId);
    return service ? service.name : "Nieznana usługa";
  };

  return (
    <div className="app-schedule">
      <h1>Harmonogram wizyt</h1>

      <div className="date-picker">
        <label htmlFor="date-picker">Wybierz datę: </label>
        <input
          type="date"
          id="date-picker"
          value={selectedDate || ""}
          onChange={handleDateChange}
        />
      </div>

      <div className="appointments">
        {selectedDate && (
          <h2>Wizyty na dzień: {new Date(selectedDate).toLocaleDateString("pl-PL")}</h2>
        )}
        {appointments.length > 0 ? (
          <ul>
            {appointments
              .filter((appointment) => {
                if (!selectedDate) return false;

                const appointmentDate = moment(appointment.AppointmentDateTime).format("YYYY-MM-DD");
                return appointmentDate === selectedDate;
              })
              .map((appointment) => (
                <div className="app-list" key={appointment.AppointmentId}>
                  <li
                    onClick={() => handleAppointmentClick(appointment)}
                    style={{
                      cursor: "pointer",
                      marginBottom: "10px",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      backgroundColor:
                        selectedAppointment?.AppointmentId === appointment.AppointmentId
                          ? "#e0f7fa"
                          : "white",
                    }}
                  >
                    <strong>Godzina:</strong>{" "}
                    {moment(appointment.AppointmentDateTime).format("HH:mm")}
                    <br />
                    <strong>Klient:</strong> {getCustomerName(appointment.CustomerId)}
                    <br />
                    <strong>Usługa:</strong> {getServiceName(appointment.ServiceId)}
                    <br />
                    <strong>Status:</strong> {appointment.Status}
                    <br />
                    <strong>Notatki:</strong> {appointment.Notes}
                  </li>
                </div>
              ))}
          </ul>
        ) : (
          <p>Brak wizyt.</p>
        )}
      </div>

      {selectedAppointment && moment(selectedAppointment.AppointmentDateTime).isAfter(moment()) && (
        <div>
          <button onClick={handleReschedule}>Przełóż</button>
          <button onClick={handleDelete}>Odwołaj</button>
          <button>Potwierdź</button>
        </div>
      )}
    </div>
  );
};

export default AppointmentSchedule;

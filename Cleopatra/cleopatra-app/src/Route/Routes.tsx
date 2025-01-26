import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ServicesList from '../Components/ServicesList';
import Prices from '../Components/PricesList';
import NotFound from '../NotFound';
import NewAppointment from '../Components/NewAppointment';
import Team from '../Components/Team';
import Contact from '../Components/ContactInfo';
import HomePage from '../Components/HomePage';
import Login from '../Login/Login';
import Register from '../Login/Register';
import AppointmentSchedule from '../Components/AppointmentSchedule';
import EmployeeProfile from '../Components/EmployeeProfile'; // Import strony profilu pracownika
import CustomerProfile from '../Components/CustomerProfile'; // Import strony profilu klienta
import MoveAppointment from '../Components/MoveAppointment';
import ProductsList from '../Components/ProductsList';
import PastAppointments from "../Components/PastAppointmentsCustomer";
import FutureAppointments from "../Components/FutureAppointmentsCustomer";


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'services', element: <ServicesList /> },
      { path: 'prices', element: <Prices /> },
      { path: 'newappointment/:serviceId', element: <NewAppointment /> },
      { path: 'team', element: <Team /> },
      { path: 'appointment-schedule', element: <AppointmentSchedule /> },
      { path: 'move-appointment', element: <MoveAppointment /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'products', element: <ProductsList /> },
      { path: 'employee-profile', element: <EmployeeProfile /> }, 
      { path: 'customer-profile', element: <CustomerProfile /> },
      { path: 'future-appointments', element: <FutureAppointments /> },
      { path: 'history', element: <PastAppointments /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

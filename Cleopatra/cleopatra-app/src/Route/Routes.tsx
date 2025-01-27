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
import MoveAppointmentEmployee from '../Components/MoveAppointmentEmployee';
import MoveAppointmentCustomer from '../Components/MoveAppointmentCustomer';
import ProductManagement from '../Components/ProductsManagement';
import PastAppointments from "../Components/PastAppointmentsCustomer";
import FutureAppointments from "../Components/FutureAppointmentsCustomer";
import EmployeeSchedule from '../Components/EmployeeSchedule';
import ServicesManagement from '../Components/ServicesManagement';
import NewService from '../Components/NewService';
import EditService from '../Components/EditService';
import NewProduct from '../Components/NewProduct';
import EditProduct from '../Components/EditProduct';
import NewSchedule from '../Components/NewSchedule';


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
      { path: 'move-appointment-employee', element: <MoveAppointmentEmployee /> },
      { path: 'move-appointment-customer', element: <MoveAppointmentCustomer /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'products-management', element: <ProductManagement /> },
      { path: 'new-product', element: <NewProduct /> },
      { path: 'edit-product', element: <EditProduct /> },
      { path: 'services-management', element: <ServicesManagement /> },
      { path: 'new-service', element: <NewService /> },
      { path: 'edit-service', element: <EditService /> },
      { path: 'employee-profile', element: <EmployeeProfile /> }, 
      { path: 'customer-profile', element: <CustomerProfile /> },
      { path: 'future-appointments', element: <FutureAppointments /> },
      { path: 'history', element: <PastAppointments /> },
      { path: 'employee-schedule', element: <EmployeeSchedule /> },
      { path: 'new-schedule', element: <NewSchedule /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

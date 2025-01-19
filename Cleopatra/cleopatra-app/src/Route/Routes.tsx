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
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

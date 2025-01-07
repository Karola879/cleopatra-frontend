import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ServicesList from '../Components/ServicesList';
import Prices from '../Components/PricesList';
import NotFound from '../NotFound';
import NewAppointment from '../Components/NewAppointment';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'services', element: <ServicesList /> },
      { path: 'prices', element: <Prices /> },
      { path: 'newappointment/:serviceId', element: <NewAppointment /> }, // Dodanie parametru
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='/not-found' /> },
    ],
  },
];

export const router = createBrowserRouter(routes);

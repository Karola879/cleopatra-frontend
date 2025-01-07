import { Navigate, RouteObject, createBrowserRouter } from 'react-router-dom';
import App from '../App'; // Import głównego komponentu aplikacji
import ServicesList from '../Components/ServicesList'; // Import komponentu ServicesList
import Prices from '../Components/Prices'
import NotFound from '../NotFound'; // Import komponentu NotFound

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />, // Komponent główny (App.tsx)
    children: [
      { path: 'services', element: <ServicesList /> }, // Trasa dla /services
      { path: 'prices', element: <Prices />},
      { path: 'not-found', element: <NotFound /> }, // Trasa dla strony NotFound
      { path: '*', element: <Navigate replace to='/not-found' /> }, // Przekierowanie na /not-found w przypadku błędu
    ]
  }
];

// Tworzymy router na podstawie zdefiniowanych tras
export const router = createBrowserRouter(routes);
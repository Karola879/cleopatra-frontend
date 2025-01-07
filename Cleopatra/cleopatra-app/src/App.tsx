import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './SiteElements/Header';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app-container">
      <div>
        <Header />
        <Outlet />
      </div> 
    </div>
  );
}

export default App;

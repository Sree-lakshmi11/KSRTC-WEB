import React, { useState, useEffect } from 'react';
import './App.css';
import TopNav from './components/TopNav';
import Login from './components/Login';
import SideMenu from './components/SideMenu';
import RoutesTable from './components/RoutesTable';
import Routes from './components/Routes';
import Employees from './components/Employees';
import Vehicles from './components/Vehicles';
import ResetPassword from './components/resetpass';
import axios from 'axios';

import { login, logout } from './auth';

function App() {
  const [activePage, setActivePage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  useEffect(() => {
    // Set isLoggedIn state based on authToken
    setIsLoggedIn(!!authToken);
  }, [authToken]);

  const handleMenuClick = (menuItem) => {
    setActivePage(menuItem);
  };

  const handleLogin = async (email, password) => {
    const token = await login(email, password);
    if (token) {
      setIsLoggedIn(true);
      setAuthToken(token);
    }
  };

  const handleLogout = async () => {
    const success = await logout(authToken);
    if (success) {
      setIsLoggedIn(false);
      setAuthToken(null);
      setActivePage(''); // Reset the active page on logout
    }
  };

  // Axios interceptor to attach token to every request
  useEffect(() => {
    const interceptor = axios.interceptors.request.use(config => {
      if (authToken) {
        config.headers['Authorization'] = `Token ${authToken}`;
      }
      return config;
    }, error => {
      return Promise.reject(error);
    });

    // Eject the interceptor when the component unmounts
    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [authToken]);

  return (
    <div className="App">
      {isLoggedIn ? (
        <>
          <TopNav />
          <div className="main-layout">
            <SideMenu onMenuClick={handleMenuClick} onLogout={handleLogout} />
            <div className="content">
              {activePage === 'Schedule' && <RoutesTable />}
              {activePage === 'Depo Routes' && <Routes />}
              {activePage === 'Employees' && <Employees />}
              {activePage === 'Vehicles' && <Vehicles />}
              {activePage === 'Settings' && <ResetPassword />}
            </div>
          </div>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;

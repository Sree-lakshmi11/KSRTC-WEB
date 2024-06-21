import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TopNav from './components/TopNav';
import Login from './components/Login';
import SideMenu from './components/SideMenu';
import RoutesTable from './components/RoutesTable';

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
    try {
      const response = await axios.post('https://getmevimal1442.pythonanywhere.com/api/auth/login/', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setAuthToken(response.data.token); // Store the token
        localStorage.setItem('authToken', response.data.token); // Persist the token
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('https://getmevimal1442.pythonanywhere.com/api/auth/logout/', {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}` // Include the token in the logout request
        }
      });
      console.log('Logout response:', response); 
      if (response.status === 200) {
        setIsLoggedIn(false);
        setAuthToken(null);
        setActivePage(''); // Reset the active page on logout
        localStorage.removeItem('authToken'); // Remove the token from localStorage
      } else {
        alert('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed:', error); // Log the error
      alert('Logout failed: ' + error.message);
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
              {/* Add more conditional renders for other pages if necessary */}
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

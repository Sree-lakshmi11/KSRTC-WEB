import axios from 'axios';

export const login = async (email, password) => {
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
      const token = response.data.token;
      localStorage.setItem('authToken', token); // Persist the token
      return token;
    } else {
      console.error('Login failed: Unexpected status code', response.status);
      alert('Invalid email or password');
      return null;
    }
  } catch (error) {
    console.error('Login failed:', error.message);
    alert('Login failed: ' + error.message);
    return null;
  }
};


export const logout = async (authToken) => {
  try {
    const response = await axios.post(
      'https://getmevimal1442.pythonanywhere.com/api/auth/logout/',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${authToken}`
        }
      }
    );

    if (response.status === 204 || response.data.detail === "Successfully logged out") {
      localStorage.removeItem('authToken');
      // Redirect to the login page
      window.location.href = '/login'; // Replace with your actual login page URL
      return true;
    } else {
      alert('Logout failed');
      return false;
    }
  } catch (error) {
    console.error('Logout failed:', error);

    if (error.response) {
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response.data);

      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        // Redirect to the login page
        window.location.href = '/login'; // Replace with your actual login page URL
        // alert('Session expired, please log in again.');
      } else {
        alert('Logout failed: ' + (error.response.data.detail || error.message));
      }
    } else {
      alert('Logout failed: ' + error.message);
    }
    return false;
  }
};

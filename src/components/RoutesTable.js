import React, { useState } from 'react';
import './RoutesTable.css';

const RoutesTable = () => {
  const initialRoutes = [
    { id: 1, departureTime: '03:40', departurePlace: 'PSL', route: 'NH', arrivalPlace: 'KLKV', arrivalTime: '03:45', km: 3.5, terminalGap: '00:05' },
    { id: 2, departureTime: '03:50', departurePlace: 'KLKV', route: 'NH', arrivalPlace: 'TVM', arrivalTime: '04:55', km: 33.7, terminalGap: '00:10' },
    { id: 3, departureTime: '05:05', departurePlace: 'TVM', route: 'NH-UDA', arrivalPlace: 'KNVLA', arrivalTime: '06:05', km: 32.0, terminalGap: '00:30' },
    { id: 4, departureTime: '06:35', departurePlace: 'KNVLA', route: 'UDA-NH', arrivalPlace: 'MC', arrivalTime: '08:05', km: 38.0, terminalGap: '00:10' },
    { id: 5, departureTime: '08:15', departurePlace: 'MC', route: 'NH', arrivalPlace: 'KLKV', arrivalTime: '09:50', km: 40.0, terminalGap: '00:15' },
    { id: 6, departureTime: '10:00', departurePlace: 'KLKV', route: 'KRKM', arrivalPlace: 'VLRD', arrivalTime: '10:40', km: 17.0, terminalGap: '00:10' },
    { id: 7, departureTime: '10:50', departurePlace: 'VLRD', route: 'KRKM', arrivalPlace: 'KLKV', arrivalTime: '11:30', km: 17.0, terminalGap: '00:05' },
    { id: 8, departureTime: '11:35', departurePlace: 'KLKV', route: 'NH', arrivalPlace: 'PSL', arrivalTime: '11:45', km: 3.5, terminalGap: '00:05' },
  ];

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoutes, setFilteredRoutes] = useState(initialRoutes);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterRoutes(query);
  };

  const filterRoutes = (query) => {
    const filtered = initialRoutes.filter(route => {
      return (
        route.departureTime.toLowerCase().includes(query.toLowerCase()) ||
        route.departurePlace.toLowerCase().includes(query.toLowerCase()) ||
        route.route.toLowerCase().includes(query.toLowerCase()) ||
        route.arrivalPlace.toLowerCase().includes(query.toLowerCase()) ||
        route.arrivalTime.toLowerCase().includes(query.toLowerCase()) ||
        route.km.toString().includes(query.toLowerCase()) ||
        route.terminalGap.toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredRoutes(filtered);
  };

  return (
    <div className="routes-container">
      <div className="search-container">
        <input
          type="text"
          className="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="generate-button">Regenerate</button>
      </div>
      <h2>Trip 1</h2>
      <table className="routes-table">
        <thead>
          <tr>
            <th>Trip No.</th>
            <th>Dep. Time</th>
            <th>Dep. Place</th>
            <th>Route</th>
            <th>Arr. Place</th>
            <th>Arr. Time</th>
            <th>Distance in KM</th>
            <th>Terminal Gap</th>
          </tr>
        </thead>
        <tbody>
          {filteredRoutes.map((route, index) => (
            <tr key={route.id}>
              <td>{index + 1}</td>
              <td>{route.departureTime}</td>
              <td>{route.departurePlace}</td>
              <td>{route.route}</td>
              <td>{route.arrivalPlace}</td>
              <td>{route.arrivalTime}</td>
              <td>{route.km}</td>
              <td>{route.terminalGap}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="summary-container">
        <div>Sign On: 3:25</div>
        <div>Sign Off: 12:00</div>
        <div>Hours of Work: 8:35</div>
        <div>Total KM: 184.7</div>
        <div>Spread Over: 8:35</div>
        <div>OverTime: 0:35</div>
      </div>
    </div>
  );
};

export default RoutesTable;

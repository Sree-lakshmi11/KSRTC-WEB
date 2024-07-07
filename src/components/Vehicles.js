import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSyncAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import './Vehicles.css';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState([]);
    const authToken = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

    // Fetch vehicles from the API
    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const response = await axios.get('https://getmevimal1442.pythonanywhere.com/api/depot/vehicles/', {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                const vehiclesData = response.data.map(vehicle => ({
                    id: vehicle.id,
                    regNo: vehicle.reg_no,
                    serialNo: vehicle.id, // Use the vehicle ID as the serial number
                    type: vehicle.type === 'f' ? 'Fuel' : 'Electric',
                    year: vehicle.year,
                    availability: vehicle.is_available ? 'Fit' : 'Unfit'
                }));
                setVehicles(vehiclesData);
                setFilteredVehicles(vehiclesData);
            } catch (error) {
                console.error("Error fetching vehicles:", error);
            }
        };
        fetchVehicles();
    }, [authToken]);

    // Filter vehicles based on search query
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = vehicles.filter(vehicle =>
            vehicle.regNo.toLowerCase().includes(query.toLowerCase()) ||
            vehicle.type.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredVehicles(filtered);
    };

    const regenerateData = () => {
        // Implement your regenerate data logic here
        console.log('Regenerating data...');
    };

    const addLegToVehicle = () => {
        // Implement your add leg to vehicle logic here
        console.log('Adding leg to vehicle...');
    };

    return (
        <div className="vehicles-container">
            <h2>Vehicles</h2>
            <div className="search-container">
                <input
                    type="text"
                    className="search-vehicle"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="vehicles-table">
                <thead>
                    <tr>
                        <th>Reg No</th>
                        <th>Serial No</th>
                        <th>Type</th>
                        <th>Year</th>
                        <th>Availability</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredVehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td>{vehicle.regNo}</td>
                            <td>{vehicle.serialNo}</td>
                            <td>{vehicle.type}</td>
                            <td>{vehicle.year}</td>
                            <td className={vehicle.availability === 'Unfit' ? 'unfit' : 'fit'}>
                                {vehicle.availability}
                            </td>
                            <td>
                                <button className="action-button">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="bottom-buttons">
                <button className="bottom-button" onClick={regenerateData}>
                    <FontAwesomeIcon icon={faSyncAlt} /> Regenerate
                </button>
                <button className="bottom-button" onClick={addLegToVehicle}>
                    <FontAwesomeIcon icon={faPlus} /> Add Leg
                </button>
            </div>
        </div>
    );
};

export default Vehicles;

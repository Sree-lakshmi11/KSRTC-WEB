import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faSyncAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Routes.css';
import axios from 'axios';

const Routes = () => {
    const [trips, setTrips] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTrips, setFilteredTrips] = useState([]);
    const [showAddLeg, setShowAddLeg] = useState(false);
    const [newLeg, setNewLeg] = useState({
        departure_time: "",
        departure_place: "",
        arrival_place: "",
        arrival_time: "",
        route: "",
        km: "",
        running_time: "",
        status: false
    });

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            const response = await axios.get('https://getmevimal1442.pythonanywhere.com/api/depot/trips/', {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                }
            });
    
            if (response.status === 200) {
                const fetchedTrips = response.data;
                setTrips(fetchedTrips);
                setFilteredTrips(fetchedTrips); // Set filtered trips to fetched trips initially
    
                if (fetchedTrips.length === 0) {
                    // Handle case where there are no trips to display
                    alert('No trips found.');
                }
            } else {
                console.error('Failed to fetch trips. Status:', response.status);
                 
            }
        } catch (error) {
            console.error('Error fetching trips:', error);
             
        }
    };
    
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = trips.filter(trip =>
            trip.departure_place.toLowerCase().includes(query.toLowerCase()) ||
            trip.arrival_place.toLowerCase().includes(query.toLowerCase()) ||
            trip.route.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredTrips(filtered);
    };

    const toggleAddLeg = () => {
        setShowAddLeg(!showAddLeg);
        if (!showAddLeg) {
            setNewLeg({
                departure_time: "",
                departure_place: "",
                arrival_place: "",
                arrival_time: "",
                route: "",
                km: "",
                running_time: "",
                status: false
            });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLeg(prevLeg => ({
            ...prevLeg,
            [name]: value
        }));
    };

    const addLeg = async () => {
        try {
            const response = await axios.post('https://getmevimal1442.pythonanywhere.com/api/depot/trips/', newLeg, {
                headers: {
                    'Authorization': `Token ${localStorage.getItem('authToken')}`
                }
            });
            if (response.status === 201) {
                alert('Leg added successfully!');
                fetchTrips(); // Refresh the trips after adding
                toggleAddLeg(); // Close the add leg row
            } else {
                alert('Failed to add leg.');
            }
        } catch (error) {
            console.error('Error adding leg:', error);
            alert('Failed to add leg. Please try again later.');
        }
    };

    const deleteTrip = async (tripId) => {
    try {
        const response = await axios.delete(`https://getmevimal1442.pythonanywhere.com/api/depot/trips/${tripId}/`, {
            headers: {
                'Authorization': `Token ${localStorage.getItem('authToken')}`
            }
        });
        if (response.status === 204) {
            alert(`Trip ${tripId} deleted successfully: ${response.data.detail}`);
            // fetchTrips(); // Refresh the trips after deletion
        } else {
            alert('Failed to delete trip.');
        }
    } catch (error) {
        console.error('Error deleting trip:', error);
        alert('Failed to delete trip. Please try again later.');
    }
};


    return (
        <div className="routes-container">
            <h2>Routes</h2>
            <div className="search-container">
                <input
                    type="text"
                    className="search"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="routestable">
                <thead>
                    <tr>
                        <th>Sl No.</th>
                        <th>Dep. Time</th>
                        <th>Dep. Place</th>
                        <th>Route</th>
                        <th>Arr. Place</th>
                        <th>Arr. Time</th>
                        <th>Distance in KM</th>
                        <th>Running Time</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTrips.map((trip, index) => (
                        <tr key={trip.id}>
                            <td>{index + 1}</td>
                            <td>{trip.departure_time}</td>
                            <td>{trip.departure_place}</td>
                            <td>{trip.route}</td>
                            <td>{trip.arrival_place}</td>
                            <td>{trip.arrival_time}</td>
                            <td>{trip.km}</td>
                            <td>{trip.running_time}</td>
                            <td>
                                <button className="action-button" onClick={() => deleteTrip(trip.id)}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {showAddLeg && (
                        <tr className="add-leg-row">
                            <td colSpan="9">
                                <input type="text" name="departure_time" placeholder="Departure Time" value={newLeg.departure_time} onChange={handleInputChange} />
                                <input type="text" name="departure_place" placeholder="Departure Place" value={newLeg.departure_place} onChange={handleInputChange} />
                                <input type="text" name="arrival_place" placeholder="Arrival Place" value={newLeg.arrival_place} onChange={handleInputChange} />
                                <input type="text" name="arrival_time" placeholder="Arrival Time" value={newLeg.arrival_time} onChange={handleInputChange} />
                                <input type="text" name="route" placeholder="Route" value={newLeg.route} onChange={handleInputChange} />
                                <input type="text" name="km" placeholder="Distance in KM" value={newLeg.km} onChange={handleInputChange} />
                                <input type="text" name="running_time" placeholder="Running Time" value={newLeg.running_time} onChange={handleInputChange} />
                                <button className="submit-button" onClick={addLeg}>Add Leg</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="bottom-buttons">
                <button className="bottom-button">
                    <FontAwesomeIcon icon={faSyncAlt} /> Regenerate
                </button>
                <button className="bottom-button" onClick={toggleAddLeg}>
                    <FontAwesomeIcon icon={faPlus} /> {showAddLeg ? 'Cancel' : 'Add Leg'}
                </button>
                <button className="bottom-button">
                    <FontAwesomeIcon icon={faEdit} /> Change Data
                </button>
            </div>
        </div>
    );
};

export default Routes;

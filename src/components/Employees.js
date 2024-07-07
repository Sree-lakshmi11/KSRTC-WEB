import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './Employees.css';

const Employees = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const authToken = localStorage.getItem('authToken'); // Assuming the token is stored in localStorage

    // Fetch employees from the API
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('https://getmevimal1442.pythonanywhere.com/api/depot/employee/', {
                    headers: {
                        'Authorization': `Token ${authToken}`
                    }
                });
                setEmployees(response.data);
                setFilteredEmployees(response.data);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchEmployees();
    }, [authToken]);

    // Filter employees based on search query
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        const filtered = employees.filter(employee =>
            employee.pen_number.toLowerCase().includes(query.toLowerCase()) ||
            employee.name.toLowerCase().includes(query.toLowerCase()) ||
            employee.designation.toLowerCase().includes(query.toLowerCase()) ||
            employee.date_of_join.toLowerCase().includes(query.toLowerCase()) ||
            (employee.on_leave ? 'on leave' : 'on duty').toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEmployees(filtered);
    };

    return (
        <div className="routes-container">
            <h2>Employees</h2>
            <div className="search-container-emp">
                <input
                    type="text"
                    className="searchemp"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <table className="employeestable">
                <thead>
                    <tr>
                        <th>Pen No.</th>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>Date of Joining</th>
                        <th>Availability</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map((employee, index) => (
                        <tr key={employee.pen_number}>
                            <td>{employee.pen_number}</td>
                            <td>{employee.name}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.date_of_join}</td>
                            <td>{employee.on_leave ? 'On Leave' : 'On Duty'}</td>
                            <td>
                                <button className="action-button">
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Employees;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus, faUserTie, faClipboard, faCogs, faSignOutAlt, faRoad } from '@fortawesome/free-solid-svg-icons';
import './SideMenu.css';

function SideMenu({ onMenuClick, onLogout }) {
  return (
    <div className="side-menu">
      <ul className="menu-list">
        <li onClick={() => onMenuClick('Schedule')}>
          <FontAwesomeIcon icon={faClipboard} className="menu-icon" />
          <span>Schedule</span>
        </li>
        <li onClick={() => onMenuClick('Employees')}>
          <FontAwesomeIcon icon={faUserTie} className="menu-icon" />
          <span>Employees</span>
        </li>
        <li onClick={() => onMenuClick('Vehicles')}>
          <FontAwesomeIcon icon={faBus} className="menu-icon" />
          <span>Vehicles</span>
        </li>
        <li onClick={() => onMenuClick('Depo Routes')}>
          <FontAwesomeIcon icon={faRoad} className="menu-icon" />
          <span>Depo Routes</span>
        </li>
      </ul>
      <ul className="menu-list-bottom">
        <li onClick={() => onMenuClick('Settings')}>
          <FontAwesomeIcon icon={faCogs} className="menu-icon" />
          <span>Settings</span>
        </li>
        <li onClick={onLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
          <span>Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default SideMenu;

import React from 'react';
import { NavLink } from 'react-router-dom';

const UserDropdown = () => {
  return (
    <div className="absolute top-16 left-0 w-64 bg-gray-900 text-white rounded-lg shadow-lg p-4 z-50">
      {/* Sections */}
      <div className="space-y-4">
        <div>
          <p className="text-gray-400 font-semibold mb-1">ACCOUNT</p>
          <NavLink to="/user-profile" className="block py-1">My Profile</NavLink>
          <NavLink to="/integrations" className="block py-1">Integrations</NavLink>
          <NavLink to="/archived-tasks" className="block py-1">Archived Tasks</NavLink>
        </div>
        <div>
          <p className="text-gray-400 font-semibold mb-1">PREFERENCES</p>
          <NavLink to="/my-day" className="block py-1">My Day</NavLink>
          <NavLink to="/calendars" className="block py-1">Calendars</NavLink>
          <NavLink to="/theme" className="block py-1">Theme</NavLink>
          <NavLink to="/background" className="py-1 flex items-center space-x-1">
            <span>Background</span>
            {/* Example background color circles */}
            <div className="flex space-x-1">
              <div className="w-4 h-4 bg-black rounded-full"></div>
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div className="w-4 h-4 bg-blue-700 rounded-full"></div>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;

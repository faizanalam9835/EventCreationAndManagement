import React from 'react';
import { Calendar, User, LogOut, Bell, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header = ({ onCreateEvent }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600" />
            <h1 className="ml-2 text-xl font-bold text-gray-900">EventHub</h1>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onCreateEvent}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </button>

            <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
              <Bell className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
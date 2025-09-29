import React, { useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';

const LocationStep = ({ data, onUpdate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions] = useState([
    'Central Park, New York, NY',
    'Times Square, New York, NY',
    'Brooklyn Bridge, New York, NY',
    'Madison Square Garden, New York, NY',
    'Statue of Liberty, New York, NY'
  ]);

  const handleLocationSelect = (address) => {
    onUpdate({
      location: {
        address,
        coordinates: {
          lat: 40.7128 + Math.random() * 0.1,
          lng: -74.0060 + Math.random() * 0.1
        }
      }
    });
    setSearchQuery('');
  };

  const handleManualInput = (address) => {
    onUpdate({
      location: {
        ...data.location,
        address
      }
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Event Location</h3>
        <p className="text-sm text-gray-600 mb-6">
          Where will your event take place? You can search for a venue or enter a custom address.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="location-search" className="block text-sm font-medium text-gray-700 mb-2">
            Search for a location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="location-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search for venues, addresses, or landmarks"
            />
          </div>

          {searchQuery && (
            <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {suggestions
                .filter(suggestion => 
                  suggestion.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleLocationSelect(suggestion)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center space-x-3"
                  >
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{suggestion}</span>
                  </button>
                ))}
            </div>
          )}
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">or</span>
          </div>
        </div>

        <div>
          <label htmlFor="manual-address" className="block text-sm font-medium text-gray-700 mb-2">
            Enter address manually
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="manual-address"
              value={data.location.address}
              onChange={(e) => handleManualInput(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="123 Main St, City, State, ZIP"
            />
          </div>
        </div>

        {data.location.address && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Selected Location</h4>
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-indigo-600 mt-0.5" />
              <div>
                <p className="text-sm text-gray-900">{data.location.address}</p>
                {data.location.coordinates && (
                  <p className="text-xs text-gray-500 mt-1">
                    Coordinates: {data.location.coordinates.lat.toFixed(4)}, {data.location.coordinates.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <Navigation className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Interactive Map Integration</h4>
              <p className="text-sm text-blue-700 mt-1">
                In a full implementation, this would include an interactive map where users can click to select locations, 
                view nearby venues, and get real-time location suggestions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationStep;
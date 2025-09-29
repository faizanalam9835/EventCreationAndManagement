import React from 'react';
import { Calendar, Globe, Lock, Users } from 'lucide-react';

const EventDetailsStep = ({ data, onUpdate }) => {
  const handleChange = (field, value) => {
    onUpdate({ [field]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Event Details</h3>
        <p className="text-sm text-gray-600 mb-6">
          Let's start with the basic information about your event.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            id="title"
            value={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your event title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            value={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Describe your event..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Event Type
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              onClick={() => handleChange('type', 'public')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                data.type === 'public'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Globe className={`h-6 w-6 ${data.type === 'public' ? 'text-indigo-600' : 'text-gray-400'}`} />
                <div>
                  <h4 className="font-medium text-gray-900">Public</h4>
                  <p className="text-sm text-gray-500">Anyone can find and join</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleChange('type', 'private')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                data.type === 'private'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Lock className={`h-6 w-6 ${data.type === 'private' ? 'text-indigo-600' : 'text-gray-400'}`} />
                <div>
                  <h4 className="font-medium text-gray-900">Private</h4>
                  <p className="text-sm text-gray-500">Invite only</p>
                </div>
              </div>
            </div>

            <div
              onClick={() => handleChange('type', 'rsvp-only')}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                data.type === 'rsvp-only'
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Users className={`h-6 w-6 ${data.type === 'rsvp-only' ? 'text-indigo-600' : 'text-gray-400'}`} />
                <div>
                  <h4 className="font-medium text-gray-900">RSVP Only</h4>
                  <p className="text-sm text-gray-500">Requires confirmation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsStep;
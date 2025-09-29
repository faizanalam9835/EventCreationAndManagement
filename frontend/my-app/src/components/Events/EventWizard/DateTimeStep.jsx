import React from 'react';
import { Calendar, Clock, Lightbulb } from 'lucide-react';
import { format, addDays, startOfWeek, addWeeks } from 'date-fns';

const DateTimeStep = ({ data, onUpdate }) => {
  const today = new Date();
  const suggestions = [
    { label: 'This Weekend', date: format(addDays(startOfWeek(today), 6), 'yyyy-MM-dd'), time: '19:00' },
    { label: 'Next Friday', date: format(addDays(today, (5 - today.getDay() + 7) % 7 || 7), 'yyyy-MM-dd'), time: '18:00' },
    { label: 'Next Weekend', date: format(addDays(startOfWeek(addWeeks(today, 1)), 6), 'yyyy-MM-dd'), time: '14:00' },
  ];

  const handleDateChange = (date) => {
    onUpdate({ date });
  };

  const handleTimeChange = (time) => {
    onUpdate({ time });
  };

  const handleSuggestionClick = (suggestion) => {
    onUpdate({ 
      date: suggestion.date, 
      time: suggestion.time 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Date & Time</h3>
        <p className="text-sm text-gray-600 mb-6">
          When will your event take place? Choose a date and time that works best for your attendees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="event-date" className="block text-sm font-medium text-gray-700 mb-2">
            Event Date *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="date"
              id="event-date"
              value={data.date}
              onChange={(e) => handleDateChange(e.target.value)}
              min={format(today, 'yyyy-MM-dd')}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div>
          <label htmlFor="event-time" className="block text-sm font-medium text-gray-700 mb-2">
            Event Time *
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="time"
              id="event-time"
              value={data.time}
              onChange={(e) => handleTimeChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <Lightbulb className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-900 mb-2">Smart Suggestions</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Based on popular event times, here are some suggestions:
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition-colors"
                >
                  {suggestion.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {data.date && data.time && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">Selected Date & Time</h4>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">
                {format(new Date(data.date), 'EEEE, MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-800">
                {format(new Date(`2000-01-01T${data.time}`), 'h:mm a')}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex items-start space-x-3">
          <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-900">Advanced Features</h4>
            <p className="text-sm text-blue-700 mt-1">
              In a full implementation, this would include timezone selection, recurring events, 
              availability checking, and integration with popular calendar applications.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeStep;
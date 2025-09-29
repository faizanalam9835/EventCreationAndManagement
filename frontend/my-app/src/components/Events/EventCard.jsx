import React from 'react';
import { Calendar, MapPin, Users, Clock, MoreHorizontal } from 'lucide-react';
import { format } from 'date-fns';

const EventCard = ({ event, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAttendingCount = () => {
    return event.attendees?.filter(a => a.status === 'attending').length || 0;
  };

  const getMaybeCount = () => {
    return event.attendees?.filter(a => a.status === 'maybe').length || 0;
  };

  return (
    <div
      onClick={() => onClick(event)}
      className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
    >
      {/* Event Image */}
      {event.images && event.images.length > 0 ? (
        <div className="h-48 bg-gray-200 overflow-hidden">
          <img
            src={event.images[0].url || `https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800`}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-white opacity-50" />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
              {event.title}
            </h3>
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
            <MoreHorizontal className="h-5 w-5" />
          </button>
        </div>

        {/* Description */}
        {event.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {/* Date & Time */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="h-4 w-4" />
            <span>
              {format(new Date(event.date), 'MMM d, yyyy')}
              {event.time && ` at ${format(new Date(`2000-01-01T${event.time}`), 'h:mm a')}`}
            </span>
          </div>

          {/* Location */}
          {event.location?.address && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{event.location.address}</span>
            </div>
          )}

          {/* Attendees */}
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>
              {getAttendingCount()} attending
              {getMaybeCount() > 0 && `, ${getMaybeCount()} maybe`}
            </span>
          </div>
        </div>

        {/* RSVP Status Indicators */}
        {event.attendees && event.attendees.length > 0 && (
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {event.attendees.slice(0, 3).map((attendee, index) => (
                <div
                  key={attendee._id || index}
                  className="w-6 h-6 bg-gray-300 rounded-full border-2 border-white flex items-center justify-center"
                >
                  <span className="text-xs font-medium text-gray-600">
                    {attendee.name?.charAt(0).toUpperCase() || '?'}
                  </span>
                </div>
              ))}
              {event.attendees.length > 3 && (
                <div className="w-6 h-6 bg-gray-100 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-500">
                    +{event.attendees.length - 3}
                  </span>
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {event.attendees.length} total {event.attendees.length === 1 ? 'invitee' : 'invitees'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
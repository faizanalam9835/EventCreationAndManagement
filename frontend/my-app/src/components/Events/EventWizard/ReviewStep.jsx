import React from 'react';
import { Calendar, MapPin, Clock, Users, Image, Globe, Lock, UserCheck } from 'lucide-react';
import { format } from 'date-fns';

const ReviewStep = ({ data }) => {
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'public':
        return Globe;
      case 'private':
        return Lock;
      case 'rsvp-only':
        return UserCheck;
      default:
        return Globe;
    }
  };

  const getEventTypeLabel = (type) => {
    switch (type) {
      case 'public':
        return 'Public Event';
      case 'private':
        return 'Private Event';
      case 'rsvp-only':
        return 'RSVP Only';
      default:
        return 'Public Event';
    }
  };

  const EventTypeIcon = getEventTypeIcon(data.type);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Review Your Event</h3>
        <p className="text-sm text-gray-600 mb-6">
          Please review all the details before creating your event. You can go back to make changes if needed.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {/* Event Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-white">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{data.title || 'Untitled Event'}</h2>
              <div className="flex items-center space-x-2">
                <EventTypeIcon className="h-4 w-4" />
                <span className="text-sm opacity-90">{getEventTypeLabel(data.type)}</span>
              </div>
            </div>
            {data.images.length > 0 && (
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-white bg-opacity-20">
                <img
                  src={data.images[0].url}
                  alt="Event"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {data.description && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-700">{data.description}</p>
            </div>
          )}

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.date && (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Calendar className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Date</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(data.date), 'EEEE, MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            )}

            {data.time && (
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Time</p>
                  <p className="text-sm text-gray-600">
                    {format(new Date(`2000-01-01T${data.time}`), 'h:mm a')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Location */}
          {data.location.address && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <MapPin className="h-5 w-5 text-indigo-600 mt-0.5" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Location</p>
                <p className="text-sm text-gray-600">{data.location.address}</p>
                {data.location.coordinates && (
                  <p className="text-xs text-gray-500 mt-1">
                    Coordinates: {data.location.coordinates.lat.toFixed(4)}, {data.location.coordinates.lng.toFixed(4)}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Media */}
          {data.images.length > 0 && (
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Image className="h-5 w-5 text-indigo-600" />
                <p className="text-sm font-medium text-gray-900">
                  Media ({data.images.length} {data.images.length === 1 ? 'image' : 'images'})
                </p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {data.images.slice(0, 4).map((image, index) => (
                  <div key={image.id} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.url}
                      alt={`Event media ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {data.images.length > 4 && (
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-gray-500">+{data.images.length - 4} more</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Invitees */}
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <Users className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Invitees</p>
              <p className="text-sm text-gray-600">
                {data.invitees.length === 0 
                  ? 'No invitees added' 
                  : `${data.invitees.length} ${data.invitees.length === 1 ? 'person' : 'people'} invited`
                }
              </p>
            </div>
          </div>

          {data.invitees.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex flex-wrap gap-2">
                {data.invitees.slice(0, 5).map((invitee) => (
                  <span
                    key={invitee.id}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {invitee.name}
                  </span>
                ))}
                {data.invitees.length > 5 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-200 text-gray-700">
                    +{data.invitees.length - 5} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4 text-center">
          <Calendar className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-indigo-900">Event Type</p>
          <p className="text-xs text-indigo-700">{getEventTypeLabel(data.type)}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-green-900">Invitees</p>
          <p className="text-xs text-green-700">{data.invitees.length} people</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 text-center">
          <Image className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-purple-900">Media</p>
          <p className="text-xs text-purple-700">{data.images.length} images</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 text-center">
          <MapPin className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <p className="text-sm font-medium text-orange-900">Location</p>
          <p className="text-xs text-orange-700">{data.location.address ? 'Set' : 'Not set'}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewStep;
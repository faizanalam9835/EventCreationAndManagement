import React, { useState } from 'react';
import { Calendar, Filter, Search, Grid2x2 as Grid, List } from 'lucide-react';
import EventCard from './EventCard';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';

const EventTimeline = ({ events, onEventClick }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const today = startOfDay(new Date());

  const filterEvents = (events) => {
    let filtered = events;

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter(event => event.type === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location?.address?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  const categorizeEvents = (events) => {
    const upcoming = events.filter(event => 
      isAfter(new Date(event.date), today) && event.status === 'upcoming'
    );
    const past = events.filter(event => 
      isBefore(new Date(event.date), today) || event.status === 'completed'
    );
    const ongoing = events.filter(event => event.status === 'ongoing');

    return { upcoming, past, ongoing };
  };

  const filteredEvents = filterEvents(events);
  const { upcoming, past, ongoing } = categorizeEvents(filteredEvents);

  const EventSection = ({ title, events, emptyMessage }) => {
    if (events.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          {title} ({events.length})
        </h3>
        
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard
                key={event._id}
                event={event}
                onClick={onEventClick}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {events.map(event => (
              <div
                key={event._id}
                onClick={() => onEventClick(event)}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{event.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {format(new Date(event.date), 'MMM d, yyyy')}
                      {event.time && ` at ${format(new Date(`2000-01-01T${event.time}`), 'h:mm a')}`}
                    </p>
                    {event.location?.address && (
                      <p className="text-sm text-gray-500 mt-1">{event.location.address}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      event.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                      event.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                      event.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {event.attendees?.filter(a => a.status === 'attending').length || 0} attending
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="relative">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="rsvp-only">RSVP Only</option>
            </select>
            <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Grid className="h-4 w-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Events Sections */}
      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            {searchQuery || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria.'
              : 'Create your first event to get started!'
            }
          </p>
        </div>
      ) : (
        <>
          <EventSection
            title="Ongoing Events"
            events={ongoing}
            emptyMessage="No ongoing events"
          />
          
          <EventSection
            title="Upcoming Events"
            events={upcoming}
            emptyMessage="No upcoming events"
          />
          
          <EventSection
            title="Past Events"
            events={past}
            emptyMessage="No past events"
          />
        </>
      )}
    </div>
  );
};

export default EventTimeline;
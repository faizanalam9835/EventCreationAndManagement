import React, { useState } from 'react';
import { Calendar, Users, TrendingUp, Clock, Plus, Eye } from 'lucide-react';
import EventTimeline from '../Events/EventTimeline';
import EventWizard from '../Events/EventWizard';
import RSVPDashboard from '../Events/RSVPDashboard';
import Header from '../Layout/Header';

const Dashboard = () => {
  const [showEventWizard, setShowEventWizard] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRSVPDashboard, setShowRSVPDashboard] = useState(false);
  const [events, setEvents] = useState([
    {
      _id: '1',
      title: 'Summer Tech Conference 2024',
      description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative workshops.',
      date: '2024-07-15',
      time: '09:00',
      location: {
        address: 'Convention Center, San Francisco, CA',
        coordinates: { lat: 37.7749, lng: -122.4194 }
      },
      organizer: 'current-user',
      attendees: [
        { _id: '1', name: 'John Doe', email: 'john@example.com', status: 'attending' },
        { _id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'maybe' },
        { _id: '3', name: 'Bob Johnson', email: 'bob@example.com', status: 'pending' },
        { _id: '4', name: 'Alice Brown', email: 'alice@example.com', status: 'attending' },
        { _id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', status: 'not-attending' }
      ],
      images: [
        { id: 1, url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800' }
      ],
      type: 'public',
      status: 'upcoming',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      _id: '2',
      title: 'Team Building Workshop',
      description: 'A fun and engaging team building session to strengthen our collaboration.',
      date: '2024-06-20',
      time: '14:00',
      location: {
        address: 'Central Park, New York, NY',
        coordinates: { lat: 40.7829, lng: -73.9654 }
      },
      organizer: 'current-user',
      attendees: [
        { _id: '6', name: 'David Lee', email: 'david@example.com', status: 'attending' },
        { _id: '7', name: 'Emma Davis', email: 'emma@example.com', status: 'attending' },
        { _id: '8', name: 'Frank Miller', email: 'frank@example.com', status: 'maybe' }
      ],
      images: [
        { id: 2, url: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800' }
      ],
      type: 'private',
      status: 'upcoming',
      createdAt: '2024-01-10T15:30:00Z',
      updatedAt: '2024-01-10T15:30:00Z'
    },
    {
      _id: '3',
      title: 'Product Launch Party',
      description: 'Celebrate the launch of our new product with food, drinks, and networking.',
      date: '2024-05-10',
      time: '18:00',
      location: {
        address: 'Rooftop Venue, Los Angeles, CA',
        coordinates: { lat: 34.0522, lng: -118.2437 }
      },
      organizer: 'current-user',
      attendees: [
        { _id: '9', name: 'Grace Taylor', email: 'grace@example.com', status: 'attending' },
        { _id: '10', name: 'Henry Wilson', email: 'henry@example.com', status: 'attending' }
      ],
      images: [],
      type: 'rsvp-only',
      status: 'completed',
      createdAt: '2024-01-05T09:15:00Z',
      updatedAt: '2024-01-05T09:15:00Z'
    }
  ]);

  const handleEventCreated = (newEvent) => {
    setEvents(prev => [newEvent, ...prev]);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowRSVPDashboard(true);
  };

  const getUpcomingEventsCount = () => {
    return events.filter(event => event.status === 'upcoming').length;
  };

  const getTotalAttendeesCount = () => {
    return events.reduce((total, event) => {
      return total + (event.attendees?.filter(a => a.status === 'attending').length || 0);
    }, 0);
  };

  const getResponseRate = () => {
    const totalInvitees = events.reduce((total, event) => total + (event.attendees?.length || 0), 0);
    const totalResponded = events.reduce((total, event) => {
      return total + (event.attendees?.filter(a => a.status !== 'pending').length || 0);
    }, 0);
    
    return totalInvitees > 0 ? Math.round((totalResponded / totalInvitees) * 100) : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateEvent={() => setShowEventWizard(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Manage your events and track RSVPs all in one place.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Events</p>
                <p className="text-2xl font-bold text-gray-900">{events.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-gray-900">{getUpcomingEventsCount()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Attendees</p>
                <p className="text-2xl font-bold text-gray-900">{getTotalAttendeesCount()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Response Rate</p>
                <p className="text-2xl font-bold text-gray-900">{getResponseRate()}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowEventWizard(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create New Event
            </button>
            
            {events.length > 0 && (
              <button
                onClick={() => handleEventClick(events[0])}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Latest RSVP
              </button>
            )}
          </div>
        </div>

        {/* Events Timeline */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Your Events</h2>
          <EventTimeline events={events} onEventClick={handleEventClick} />
        </div>
      </main>

      {/* Modals */}
      {showEventWizard && (
        <EventWizard
          isOpen={showEventWizard}
          onClose={() => setShowEventWizard(false)}
          onEventCreated={handleEventCreated}
        />
      )}

      {showRSVPDashboard && selectedEvent && (
        <RSVPDashboard
          event={selectedEvent}
          onClose={() => {
            setShowRSVPDashboard(false);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
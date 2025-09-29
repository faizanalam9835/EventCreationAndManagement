import React, { useState } from 'react';
import { Users, CheckCircle, Clock, XCircle, HelpCircle, Mail, Bell } from 'lucide-react';

const RSVPDashboard = ({ event, onClose }) => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'attending':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'maybe':
        return <HelpCircle className="h-4 w-4 text-yellow-600" />;
      case 'not-attending':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'attending':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'maybe':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'not-attending':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const attendees = event.attendees || [];
  const attending = attendees.filter(a => a.status === 'attending');
  const maybe = attendees.filter(a => a.status === 'maybe');
  const notAttending = attendees.filter(a => a.status === 'not-attending');
  const pending = attendees.filter(a => a.status === 'pending');

  const sendReminder = (attendee) => {
    // In a real app, this would send an email reminder
    alert(`Reminder sent to ${attendee.name}`);
  };

  const sendBulkReminder = (attendeeList) => {
    // In a real app, this would send bulk reminders
    alert(`Reminders sent to ${attendeeList.length} people`);
  };

  const tabs = [
    { id: 'overview', name: 'Overview', count: attendees.length },
    { id: 'attending', name: 'Attending', count: attending.length },
    { id: 'maybe', name: 'Maybe', count: maybe.length },
    { id: 'not-attending', name: 'Not Attending', count: notAttending.length },
    { id: 'pending', name: 'Pending', count: pending.length },
  ];

  const AttendeeList = ({ attendees, showReminder = false }) => (
    <div className="space-y-3">
      {attendees.map((attendee) => (
        <div key={attendee._id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">
                {attendee.name?.charAt(0).toUpperCase() || '?'}
              </span>
            </div>
            <div>
              <p className="font-medium text-gray-900">{attendee.name}</p>
              <p className="text-sm text-gray-500">{attendee.email}</p>
              {attendee.notes && (
                <p className="text-xs text-gray-400 mt-1">"{attendee.notes}"</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              {getStatusIcon(attendee.status)}
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(attendee.status)}`}>
                {attendee.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </div>
            {showReminder && (
              <button
                onClick={() => sendReminder(attendee)}
                className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                title="Send reminder"
              >
                <Mail className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const OverviewStats = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
        <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-green-900">{attending.length}</p>
        <p className="text-sm text-green-700">Attending</p>
      </div>
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <HelpCircle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-yellow-900">{maybe.length}</p>
        <p className="text-sm text-yellow-700">Maybe</p>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-red-900">{notAttending.length}</p>
        <p className="text-sm text-red-700">Not Attending</p>
      </div>
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
        <Clock className="h-8 w-8 text-gray-600 mx-auto mb-2" />
        <p className="text-2xl font-bold text-gray-900">{pending.length}</p>
        <p className="text-sm text-gray-700">Pending</p>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <div>
            <OverviewStats />
            <div className="space-y-6">
              {attending.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Recently Confirmed</h4>
                  <AttendeeList attendees={attending.slice(0, 3)} />
                </div>
              )}
              {pending.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Pending Responses</h4>
                    <button
                      onClick={() => sendBulkReminder(pending)}
                      className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <Bell className="h-4 w-4 mr-1" />
                      Send Reminders
                    </button>
                  </div>
                  <AttendeeList attendees={pending.slice(0, 3)} showReminder />
                </div>
              )}
            </div>
          </div>
        );
      case 'attending':
        return <AttendeeList attendees={attending} />;
      case 'maybe':
        return <AttendeeList attendees={maybe} showReminder />;
      case 'not-attending':
        return <AttendeeList attendees={notAttending} />;
      case 'pending':
        return <AttendeeList attendees={pending} showReminder />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{event.title}</h2>
              <p className="text-indigo-100 text-sm">RSVP Dashboard</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-indigo-200 transition-colors"
            >
              <XCircle className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {attendees.length === 0 ? (
            <div className="text-center py-12">
              <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invitees yet</h3>
              <p className="text-gray-600">
                Invite people to your event to start tracking RSVPs.
              </p>
            </div>
          ) : (
            renderTabContent()
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Total: {attendees.length} invitees • {attending.length} confirmed
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => sendBulkReminder(pending)}
                disabled={pending.length === 0}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Reminders ({pending.length})
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVPDashboard;
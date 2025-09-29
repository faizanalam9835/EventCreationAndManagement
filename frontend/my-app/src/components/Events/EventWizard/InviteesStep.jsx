import React, { useState } from 'react';
import { Plus, X, Mail, Users, UserPlus } from 'lucide-react';

const InviteesStep = ({ data, onUpdate }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const addInvitee = () => {
    if (email && name) {
      const newInvitee = {
        id: Date.now() + Math.random(),
        name,
        email,
        status: 'pending'
      };
      
      onUpdate({ 
        invitees: [...data.invitees, newInvitee] 
      });
      
      setEmail('');
      setName('');
    }
  };

  const removeInvitee = (inviteeId) => {
    const updatedInvitees = data.invitees.filter(inv => inv.id !== inviteeId);
    onUpdate({ invitees: updatedInvitees });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInvitee();
    }
  };

  const bulkImport = () => {
    // In a real app, this would open a file picker or CSV import dialog
    alert('Bulk import feature would allow CSV upload or contact integration');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Invite People</h3>
        <p className="text-sm text-gray-600 mb-6">
          Add people you'd like to invite to your event. They'll receive an invitation with RSVP options.
        </p>
      </div>

      <div className="space-y-4">
        {/* Add Invitee Form */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Add Invitee</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="invitee-name" className="block text-xs font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="invitee-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="invitee-email" className="block text-xs font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="invitee-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="mt-3 flex space-x-2">
            <button
              onClick={addInvitee}
              disabled={!email || !name}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add
            </button>
            <button
              onClick={bulkImport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <UserPlus className="h-4 w-4 mr-1" />
              Bulk Import
            </button>
          </div>
        </div>

        {/* Invitees List */}
        {data.invitees.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-medium text-gray-900">
                Invitees ({data.invitees.length})
              </h4>
              <div className="flex items-center space-x-2 text-xs text-gray-500">
                <Users className="h-4 w-4" />
                <span>All pending invitations</span>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-200">
              {data.invitees.map((invitee) => (
                <div key={invitee.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{invitee.name}</p>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-gray-400" />
                        <p className="text-xs text-gray-500">{invitee.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                    <button
                      onClick={() => removeInvitee(invitee.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {data.invitees.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-gray-600 mb-2">No invitees added yet</p>
            <p className="text-sm text-gray-500">
              Add people above to start building your guest list
            </p>
          </div>
        )}

        {/* Features Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
          <div className="flex items-start space-x-3">
            <Mail className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900">Invitation Features</h4>
              <ul className="text-sm text-blue-700 mt-1 space-y-1">
                <li>• Automatic email invitations with RSVP links</li>
                <li>• Customizable invitation templates</li>
                <li>• Reminder notifications for non-responders</li>
                <li>• Integration with contact lists and social platforms</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteesStep;
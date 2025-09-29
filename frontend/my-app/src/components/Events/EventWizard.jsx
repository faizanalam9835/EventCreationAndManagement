import React, { useState } from 'react';
import { X, ArrowLeft, ArrowRight, Calendar, MapPin, Users, Image, Clock } from 'lucide-react';
import EventDetailsStep from './EventWizard/EventDetailsStep';
import LocationStep from './EventWizard/LocationStep';
import DateTimeStep from './EventWizard/DateTimeStep';
import MediaStep from './EventWizard/MediaStep';
import InviteesStep from './EventWizard/InviteesStep';
import ReviewStep from './EventWizard/ReviewStep';

const EventWizard = ({ isOpen, onClose, onEventCreated }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    type: 'public',
    location: {
      address: '',
      coordinates: null
    },
    date: '',
    time: '',
    images: [],
    invitees: []
  });

  const steps = [
    { id: 1, name: 'Details', icon: Calendar },
    { id: 2, name: 'Location', icon: MapPin },
    { id: 3, name: 'Date & Time', icon: Clock },
    { id: 4, name: 'Media', icon: Image },
    { id: 5, name: 'Invitees', icon: Users },
    { id: 6, name: 'Review', icon: Calendar }
  ];

  const updateEventData = (data) => {
    setEventData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCreateEvent = () => {
    // Create the event
    const newEvent = {
      ...eventData,
      _id: Date.now().toString(),
      organizer: 'current-user',
      attendees: eventData.invitees.map(invitee => ({
        ...invitee,
        status: 'pending'
      })),
      status: 'upcoming',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onEventCreated(newEvent);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setEventData({
      title: '',
      description: '',
      type: 'public',
      location: { address: '', coordinates: null },
      date: '',
      time: '',
      images: [],
      invitees: []
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <EventDetailsStep data={eventData} onUpdate={updateEventData} />;
      case 2:
        return <LocationStep data={eventData} onUpdate={updateEventData} />;
      case 3:
        return <DateTimeStep data={eventData} onUpdate={updateEventData} />;
      case 4:
        return <MediaStep data={eventData} onUpdate={updateEventData} />;
      case 5:
        return <InviteesStep data={eventData} onUpdate={updateEventData} />;
      case 6:
        return <ReviewStep data={eventData} onUpdate={updateEventData} />;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Event</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isActive 
                      ? 'border-indigo-600 bg-indigo-600 text-white' 
                      : isCompleted 
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-gray-300 text-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-indigo-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <div className="flex space-x-3">
            {currentStep === steps.length ? (
              <button
                onClick={handleCreateEvent}
                className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Event
              </button>
            ) : (
              <button
                onClick={nextStep}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventWizard;
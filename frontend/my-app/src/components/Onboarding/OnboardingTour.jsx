import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Calendar, Users, BarChart3, Settings } from 'lucide-react';

const OnboardingTour = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to EventHub!',
      description: 'Your all-in-one platform for creating and managing events. Let\'s take a quick tour to get you started.',
      icon: Calendar,
      highlight: 'Welcome to the future of event management!'
    },
    {
      title: 'Create Amazing Events',
      description: 'Use our step-by-step wizard to create professional events with ease. Add details, locations, media, and invite guests.',
      icon: Calendar,
      highlight: 'Click "Create Event" to start building your first event'
    },
    {
      title: 'Track RSVPs Effortlessly',
      description: 'Monitor who\'s attending, maybe coming, or can\'t make it. Send automated reminders and manage your guest list.',
      icon: Users,
      highlight: 'Visual dashboards make RSVP tracking simple'
    },
    {
      title: 'Analyze Your Events',
      description: 'Get insights into attendance patterns, response rates, and event performance to improve future events.',
      icon: BarChart3,
      highlight: 'Data-driven insights help you create better events'
    },
    {
      title: 'Customize Your Experience',
      description: 'Personalize invitations, set up automated reminders, and configure your event preferences.',
      icon: Settings,
      highlight: 'Make EventHub work exactly how you want it to'
    }
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTour = () => {
    onComplete();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const Icon = currentStepData.icon;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {currentStepData.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {currentStepData.description}
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
              <p className="text-sm font-medium text-indigo-900">
                💡 {currentStepData.highlight}
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          {currentStep === 1 && (
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Interactive location selection with maps</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Smart date and time suggestions</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Drag-and-drop media uploads</span>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Color-coded status indicators</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Automated reminder system</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Real-time attendance tracking</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <button
            onClick={skipTour}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Skip tour
          </button>

          <div className="flex space-x-3">
            {currentStep > 0 && (
              <button
                onClick={prevStep}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </button>
            )}

            <button
              onClick={nextStep}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              {currentStep < steps.length - 1 && <ArrowRight className="h-4 w-4 ml-2" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingTour;
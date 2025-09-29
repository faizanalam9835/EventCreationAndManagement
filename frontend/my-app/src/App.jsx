import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import Dashboard from './components/Dashboard/Dashboard';
import OnboardingTour from './components/Onboarding/OnboardingTour';
import './index.css';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  React.useEffect(() => {
    // Show onboarding for new users
    if (user && !localStorage.getItem('onboarding-completed')) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding-completed', 'true');
    setShowOnboarding(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return isLogin ? (
      <LoginForm onToggleForm={() => setIsLogin(false)} />
    ) : (
      <RegisterForm onToggleForm={() => setIsLogin(true)} />
    );
  }

  return (
    <>
      <Dashboard />
      <OnboardingTour
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleOnboardingComplete}
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
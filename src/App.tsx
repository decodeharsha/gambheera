import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceGrid } from './components/ServiceGrid';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { ServiceDetails } from './components/ServiceDetails';
import { BookingModal } from './components/BookingModal';
import { MapView } from './components/MapView';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ServiceProvider } from './contexts/ServiceContext';

function AppContent() {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'service' | 'map'>('home');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleServiceSelect = (service: any) => {
    setSelectedService(service);
    setCurrentView('service');
  };

  const handleBookNow = (service: any) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return user ? <Dashboard /> : setCurrentView('home');
      case 'service':
        return selectedService ? (
          <ServiceDetails
            service={selectedService}
            onBack={() => setCurrentView('home')}
            onBook={() => handleBookNow(selectedService)}
          />
        ) : null;
      case 'map':
        return <MapView onServiceSelect={handleServiceSelect} />;
      default:
        return (
          <>
            <Hero onGetStarted={() => setCurrentView('map')} />
            <ServiceGrid 
              onServiceSelect={handleServiceSelect}
              onBookNow={handleBookNow}
            />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onAuthClick={() => setShowAuthModal(true)}
        onDashboardClick={() => setCurrentView('dashboard')}
        onHomeClick={() => setCurrentView('home')}
        onMapClick={() => setCurrentView('map')}
        currentView={currentView}
      />
      
      <main className="relative">
        {renderCurrentView()}
      </main>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {showBookingModal && selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <AppContent />
      </ServiceProvider>
    </AuthProvider>
  );
}

export default App;
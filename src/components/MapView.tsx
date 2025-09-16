import React, { useState } from 'react';
import { useServices } from '../contexts/ServiceContext';
import { ServiceCard } from './ServiceCard';
import { CategoryFilter } from './CategoryFilter';
import { MapPin, Navigation, Search } from 'lucide-react';

interface MapViewProps {
  onServiceSelect: (service: any) => void;
}

export const MapView: React.FC<MapViewProps> = ({ onServiceSelect }) => {
  const { services } = useServices();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category: string) => {
    const icons = {
      hospital: '🏥',
      restaurant: '🍽️',
      hotel: '🏨',
      repair: '🔧',
      fitness: '💪'
    };
    return icons[category as keyof typeof icons] || '📍';
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <MapPin className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Service Map</h1>
          </div>
          <p className="text-gray-600">
            Explore nearby services on the interactive map and discover what's available in your area
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Map Header */}
              <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Interactive Service Map</h2>
                  <button className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full text-sm transition-colors duration-200">
                    <Navigation className="h-4 w-4" />
                    <span>My Location</span>
                  </button>
                </div>
              </div>

              {/* Mock Map */}
              <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200">
                <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                
                {/* Map Markers */}
                {filteredServices.map((service, index) => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                      selectedService?.id === service.id ? 'z-20 ring-4 ring-blue-500' : 'z-10'
                    }`}
                    style={{
                      left: `${20 + (index * 15) % 60}%`,
                      top: `${25 + (index * 20) % 50}%`,
                      backgroundColor: selectedService?.id === service.id ? '#3b82f6' : '#ffffff'
                    }}
                  >
                    <span className="text-lg">{getCategoryIcon(service.category)}</span>
                  </button>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Legend</h4>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>🏥</span><span>Healthcare</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>🍽️</span><span>Restaurants</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>🏨</span><span>Hotels</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>🔧</span><span>Repairs</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-600">
                      <span>💪</span><span>Fitness</span>
                    </div>
                  </div>
                </div>

                {/* Current Location */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
              </div>

              {/* Map Controls */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Showing {filteredServices.length} services in your area</span>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                      Zoom In
                    </button>
                    <button className="px-3 py-1 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
                      Zoom Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Details Sidebar */}
          <div className="space-y-6">
            {selectedService ? (
              <div className="bg-white rounded-xl shadow-lg">
                <ServiceCard
                  service={selectedService}
                  onSelect={() => onServiceSelect(selectedService)}
                  onBookNow={() => {}}
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Service</h3>
                <p className="text-gray-600 text-sm">
                  Click on any marker on the map to view service details and book appointments
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Area Statistics</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Services</span>
                  <span className="font-semibold text-gray-900">{services.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Available Now</span>
                  <span className="font-semibold text-green-600">
                    {services.filter(s => s.availability).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg Rating</span>
                  <span className="font-semibold text-yellow-600">4.7 ⭐</span>
                </div>
              </div>
            </div>

            {/* Nearby Services */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nearest Services</h3>
              <div className="space-y-3">
                {filteredServices.slice(0, 3).map(service => (
                  <button
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getCategoryIcon(service.category)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.distance} • {service.category}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
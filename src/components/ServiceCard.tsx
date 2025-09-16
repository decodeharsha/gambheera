import React from 'react';
import { Star, MapPin, Clock, Phone } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    category: string;
    description: string;
    rating: number;
    reviewCount: number;
    price?: string;
    location: string;
    distance: string;
    image: string;
    availability: boolean;
    phone: string;
    hours: string;
  };
  onSelect: () => void;
  onBookNow: () => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect, onBookNow }) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      hospital: 'bg-red-100 text-red-800',
      restaurant: 'bg-orange-100 text-orange-800',
      hotel: 'bg-purple-100 text-purple-800',
      repair: 'bg-blue-100 text-blue-800',
      fitness: 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Availability Badge */}
        <div className="absolute top-3 left-3">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            service.availability 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {service.availability ? 'Available' : 'Busy'}
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getCategoryColor(service.category)}`}>
            {service.category}
          </div>
        </div>

        {/* Price Badge */}
        {service.price && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-semibold text-gray-900">
              {service.price}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
            {service.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {service.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-sm font-semibold text-gray-900">{service.rating}</span>
          </div>
          <span className="text-sm text-gray-500">
            ({service.reviewCount.toLocaleString()} reviews)
          </span>
        </div>

        {/* Location & Distance */}
        <div className="flex items-center space-x-2 mb-3">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{service.location}</span>
          <span className="text-sm font-medium text-blue-600">{service.distance}</span>
        </div>

        {/* Hours */}
        <div className="flex items-center space-x-2 mb-4">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{service.hours}</span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={onSelect}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200"
          >
            View Details
          </button>
          <button
            onClick={onBookNow}
            disabled={!service.availability}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
              service.availability
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {service.availability ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  );
};
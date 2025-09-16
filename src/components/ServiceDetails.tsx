import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Phone, Clock, Calendar, Heart } from 'lucide-react';

interface ServiceDetailsProps {
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
    features: string[];
    phone: string;
    hours: string;
  };
  onBack: () => void;
  onBook: () => void;
}

export const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack, onBook }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(service.image);

  const additionalImages = [
    service.image,
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=400',
    'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=400'
  ];

  const reviews = [
    {
      id: '1',
      user: 'Sarah Johnson',
      rating: 5,
      comment: 'Excellent service! The staff was very professional and the facilities were top-notch.',
      date: '2 days ago',
      avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '2',
      user: 'Mike Chen',
      rating: 4,
      comment: 'Great experience overall. Quick service and reasonable pricing.',
      date: '1 week ago',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    },
    {
      id: '3',
      user: 'Emily Davis',
      rating: 5,
      comment: 'Highly recommend! Clean, efficient, and friendly service.',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'
    }
  ];

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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Services</span>
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt={service.name}
                  className="w-full h-96 object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex space-x-2">
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    service.availability 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {service.availability ? 'Available Now' : 'Busy'}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-semibold capitalize ${getCategoryColor(service.category)}`}>
                    {service.category}
                  </div>
                </div>

                {/* Favorite Button */}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <Heart className={`h-6 w-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                </button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {additionalImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImage === image ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h1>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="font-semibold text-gray-900">{service.rating}</span>
                        <span className="text-gray-500">({service.reviewCount} reviews)</span>
                      </div>
                      {service.price && (
                        <span className="text-lg font-semibold text-gray-900">{service.price}</span>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 text-lg leading-relaxed">{service.description}</p>
              </div>

              {/* Contact Info */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">{service.location}</p>
                    <p className="text-sm text-blue-600">{service.distance} away</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Phone</p>
                    <p className="text-gray-600">{service.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">Hours</p>
                    <p className="text-gray-600">{service.hours}</p>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 py-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
              
              <div className="space-y-6">
                {reviews.map(review => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start space-x-4">
                      <img
                        src={review.avatar}
                        alt={review.user}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">{review.user}</h4>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Book This Service</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${
                    service.availability ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {service.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                
                {service.price && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Price Range:</span>
                    <span className="font-semibold text-gray-900">{service.price}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-semibold text-gray-900">{service.distance}</span>
                </div>
              </div>

              <button
                onClick={onBook}
                disabled={!service.availability}
                className={`w-full py-3 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                  service.availability
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {service.availability ? 'Book Now' : 'Currently Unavailable'}
              </button>

              <div className="mt-4 space-y-2">
                <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <Phone className="h-4 w-4 inline mr-2" />
                  Call Now
                </button>
                
                <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
                  <MapPin className="h-4 w-4 inline mr-2" />
                  Get Directions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
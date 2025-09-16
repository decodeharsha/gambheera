import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Service {
  id: string;
  name: string;
  category: 'hospital' | 'restaurant' | 'hotel' | 'repair' | 'fitness';
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
}

interface ServiceContextType {
  services: Service[];
  getServicesByCategory: (category: string) => Service[];
  bookService: (serviceId: string, booking: any) => void;
  addReview: (serviceId: string, review: any) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};

const mockServices: Service[] = [
  {
    id: '1',
    name: 'City General Hospital',
    category: 'hospital',
    description: 'Full-service hospital with emergency care, specialized treatments, and modern facilities.',
    rating: 4.8,
    reviewCount: 1240,
    location: '123 Health Ave, Downtown',
    distance: '0.8 km',
    image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: true,
    features: ['Emergency Care', '24/7 Service', 'Parking Available', 'Specialist Doctors'],
    phone: '+1-555-0123',
    hours: '24/7'
  },
  {
    id: '2',
    name: 'The Gourmet Kitchen',
    category: 'restaurant',
    description: 'Fine dining experience with locally sourced ingredients and award-winning chefs.',
    rating: 4.6,
    reviewCount: 892,
    price: '$$$',
    location: '456 Culinary St, Food District',
    distance: '1.2 km',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: true,
    features: ['Fine Dining', 'Outdoor Seating', 'Vegan Options', 'Wine Selection'],
    phone: '+1-555-0124',
    hours: '11:00 AM - 11:00 PM'
  },
  {
    id: '3',
    name: 'Grand Plaza Hotel',
    category: 'hotel',
    description: 'Luxury accommodation in the heart of the city with premium amenities and services.',
    rating: 4.9,
    reviewCount: 2341,
    price: '$$$',
    location: '789 Luxury Blvd, City Center',
    distance: '2.1 km',
    image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: true,
    features: ['Pool & Spa', 'Business Center', 'Room Service', 'Concierge'],
    phone: '+1-555-0125',
    hours: '24/7 Check-in'
  },
  {
    id: '4',
    name: 'TechFix Solutions',
    category: 'repair',
    description: 'Professional repair services for electronics, appliances, and household items.',
    rating: 4.7,
    reviewCount: 456,
    price: '$$',
    location: '321 Repair St, Tech Quarter',
    distance: '1.5 km',
    image: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: true,
    features: ['Same Day Service', 'Warranty Included', 'Free Diagnostics', 'Pickup Available'],
    phone: '+1-555-0126',
    hours: '9:00 AM - 6:00 PM'
  },
  {
    id: '5',
    name: 'FitLife Gym',
    category: 'fitness',
    description: 'State-of-the-art fitness center with personal trainers and group classes.',
    rating: 4.5,
    reviewCount: 1876,
    price: '$$',
    location: '654 Fitness Ave, Sports Complex',
    distance: '0.9 km',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: true,
    features: ['24/7 Access', 'Personal Training', 'Group Classes', 'Pool & Sauna'],
    phone: '+1-555-0127',
    hours: '5:00 AM - 11:00 PM'
  },
  {
    id: '6',
    name: 'Metro Urgent Care',
    category: 'hospital',
    description: 'Quick and efficient urgent care services for non-emergency medical needs.',
    rating: 4.4,
    reviewCount: 567,
    location: '987 Quick Care Ln, Midtown',
    distance: '1.8 km',
    image: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=400',
    availability: true,
    features: ['Walk-ins Welcome', 'X-Ray Services', 'Lab Tests', 'Insurance Accepted'],
    phone: '+1-555-0128',
    hours: '8:00 AM - 9:00 PM'
  }
];

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services] = useState<Service[]>(mockServices);

  const getServicesByCategory = (category: string) => {
    return services.filter(service => service.category === category);
  };

  const bookService = (serviceId: string, booking: any) => {
    console.log('Booking service:', serviceId, booking);
  };

  const addReview = (serviceId: string, review: any) => {
    console.log('Adding review for service:', serviceId, review);
  };

  return (
    <ServiceContext.Provider value={{ services, getServicesByCategory, bookService, addReview }}>
      {children}
    </ServiceContext.Provider>
  );
};
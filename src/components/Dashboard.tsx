import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Calendar, MapPin, Star, Clock, Users, TrendingUp, Bell, Settings } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const isCitizen = user.type === 'citizen';

  const citizenStats = [
    { label: 'Services Booked', value: '24', icon: Calendar, color: 'text-blue-600' },
    { label: 'Reviews Written', value: '8', icon: Star, color: 'text-yellow-600' },
    { label: 'Avg Response Time', value: '3.5min', icon: Clock, color: 'text-green-600' },
    { label: 'Favorite Category', value: 'Health', icon: MapPin, color: 'text-purple-600' }
  ];

  const providerStats = [
    { label: 'Total Bookings', value: '156', icon: Users, color: 'text-blue-600' },
    { label: 'Avg Rating', value: '4.8', icon: Star, color: 'text-yellow-600' },
    { label: 'Monthly Growth', value: '+23%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Services', value: '5', icon: MapPin, color: 'text-purple-600' }
  ];

  const stats = isCitizen ? citizenStats : providerStats;

  const recentActivities = isCitizen ? [
    { title: 'Booked appointment at City General Hospital', time: '2 hours ago', status: 'confirmed' },
    { title: 'Left review for The Gourmet Kitchen', time: '1 day ago', status: 'completed' },
    { title: 'Reserved table at The Gourmet Kitchen', time: '2 days ago', status: 'completed' },
    { title: 'Scheduled repair with TechFix Solutions', time: '3 days ago', status: 'pending' }
  ] : [
    { title: 'New booking received for evening slot', time: '1 hour ago', status: 'new' },
    { title: 'Customer left 5-star review', time: '3 hours ago', status: 'review' },
    { title: 'Updated service availability', time: '1 day ago', status: 'update' },
    { title: 'Completed service for John Doe', time: '2 days ago', status: 'completed' }
  ];

  const tabs = [
    { key: 'overview', label: 'Overview' },
    { key: 'bookings', label: isCitizen ? 'My Bookings' : 'Bookings' },
    { key: 'reviews', label: 'Reviews' },
    { key: 'settings', label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {isCitizen ? 'Manage your bookings and discover new services' : 'Monitor your business and manage bookings'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                      </div>
                      <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                </div>
                <div className="divide-y divide-gray-200">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="p-6 flex items-start space-x-4">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        activity.status === 'confirmed' || activity.status === 'new' ? 'bg-blue-500' :
                        activity.status === 'completed' ? 'bg-green-500' :
                        activity.status === 'pending' ? 'bg-yellow-500' :
                        activity.status === 'review' ? 'bg-purple-500' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-sm text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg shadow">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
                </div>
                <div className="p-6 space-y-4">
                  {isCitizen ? (
                    <>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                        Find New Services
                      </button>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                        View My Bookings
                      </button>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                        Write a Review
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                        Update Service Info
                      </button>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                        Manage Bookings
                      </button>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors duration-200">
                        View Analytics
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {isCitizen ? 'My Bookings' : 'Service Bookings'}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center py-8">
                {isCitizen ? 'No bookings yet. Start exploring services!' : 'No bookings to manage at the moment.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {isCitizen ? 'My Reviews' : 'Service Reviews'}
              </h2>
            </div>
            <div className="p-6">
              <p className="text-gray-500 text-center py-8">
                {isCitizen ? 'No reviews written yet.' : 'No reviews received yet.'}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Account Settings</h2>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={user.email}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <input
                  type="text"
                  value={user.type.charAt(0).toUpperCase() + user.type.slice(1)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};